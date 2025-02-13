<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElButton, ElTable, ElTableColumn, ElTag, ElRow, ElDialog, } from 'element-plus';
import {
   Edit, Delete, Setting, CaretRight
} from '@element-plus/icons-vue'

import { request } from '@/utils/server'
import { onBeforeMount, reactive, ref } from 'vue';
import AddRoleDialog from './addRoleDialog/index.vue'
import EditRoleDialog from './editRoleDialog/index.vue'
import SetRightDialog from './setRightDialog/index.vue'
import { openDeleteRoleDialog, openCancelRightOfRoleDialog } from './deleteRoleDialog/index.js'

let roleList = reactive({ data: [] })

//更新数据
async function updateListData() {
   roleList.data = await request({
      method: 'get',
      url: 'roles'
   })
}

onBeforeMount(async () => {
   updateListData()
})


const dialogInfo = reactive({
   id: '',
   roleName: '',
   roleDesc: '',
   children: []
})

const updateDialogInfo = (scopeInfo) => {
   dialogInfo.id = scopeInfo.id
   dialogInfo.roleName = scopeInfo.roleName
   dialogInfo.roleDesc = scopeInfo.roleDesc
   dialogInfo.children = scopeInfo.children
}


//#region 添加职位
const addRoleDialogVisible = ref(false)

const handleAddRoleDialogOpen = () => {
   addRoleDialogVisible.value = true
}
//#endregion


//#region 修改用户对话框

const editRoleDialogVisible = ref(false)

const handleEditRoleDialogOpen = (scopeInfo) => {
   updateDialogInfo(scopeInfo)
   editRoleDialogVisible.value = true
}

//#endregion

//#region 修改权限对话框

const setRightDialogVisible = ref(false)

const handleSetRightDialogOpen = (scopeInfo) => {
   updateDialogInfo(scopeInfo)
   setRightDialogVisible.value = true
}

//#endregion


//#region 删除职位对话框


const handleDeleteRoleDialogOpen = async (scopeInfo) => {

   await openDeleteRoleDialog(scopeInfo)

   closeDialog()
   updateListData()
}

//#endregion

//#region 删除权限对话框


const handleCancelRightOfRoleDialogOpen = async (roleId, rightId) => {

   await openCancelRightOfRoleDialog(roleId, rightId)

   closeDialog()
   updateListData()
}

//#endregion



const closeDialog = () => {
   addRoleDialogVisible.value = false;
   editRoleDialogVisible.value = false;
   setRightDialogVisible.value = false;
   updateDialogInfo({})
   // updateListData()
}



</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>职位列表</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         <div class="input-btn-container"><!-- 顶部按钮-->
            <el-button type="primary" @click="handleAddRoleDialogOpen">添加职位</el-button>
         </div>

         <el-table :data="roleList.data" border style="width: 100%" stripe><!-- 列表 -->
            <el-table-column type="expand">
               <template #default="scope">
                  <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id">
                     <!-- 一级权限 -->
                     <div :span="10">
                        <el-tag closable @close="handleCancelRightOfRoleDialogOpen(scope.row.id, item1.id)">{{
                           item1.authName }}</el-tag>
                        <i class="el-icon">
                           <CaretRight />
                        </i>
                     </div>
                     <!-- 二三级权限 -->
                     <div :span="19">
                        <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="['no-bdtop-bot']">
                           <div :span="6">
                              <el-tag type="success" closable
                                 @close="handleCancelRightOfRoleDialogOpen(scope.row.id, item2.id)">{{
                                    item2.authName }}</el-tag>
                              <i class="el-icon">
                                 <CaretRight />
                              </i>
                           </div>
                           <div :span="18">
                              <el-tag v-for="(item3, i3) in item2.children" :key="item3.id" type="warning" closable
                                 @close="handleCancelRightOfRoleDialogOpen(scope.row.id, item3.id)">{{ item3.authName
                                 }}</el-tag>
                           </div>
                        </el-row>
                     </div>
                  </el-row>
               </template>
            </el-table-column>

            <el-table-column type="index" width="50" />
            <el-table-column prop="roleName" label="职位名称" width="150" />
            <el-table-column prop="roleDesc" label="职位描述" width="300" />
            <el-table-column label="操作">
               <template #default="scope">
                  <el-button type="primary" :icon="Edit" @click="handleEditRoleDialogOpen(scope.row)">编辑</el-button>
                  <el-button type="warning" :icon="Setting"
                     @click="handleSetRightDialogOpen(scope.row)">分配权限</el-button>
                  <el-button type="danger" :icon="Delete" @click="handleDeleteRoleDialogOpen(scope.row)">删除</el-button>
               </template>

            </el-table-column>
         </el-table>


         <el-dialog v-model="addRoleDialogVisible" title="添加职位" :close-on-click-modal="false"
            destroy-on-close><!-- add -->
            <AddRoleDialog @close_dialog_event="closeDialog" @update_role_list_event="updateListData" />
         </el-dialog>

         <el-dialog v-model="editRoleDialogVisible" title="编辑" :close-on-click-modal="false"
            destroy-on-close><!-- add -->
            <EditRoleDialog :dialogInfo="dialogInfo" @close_dialog_event="closeDialog"
               @update_role_list_event="updateListData" />
         </el-dialog>

         <el-dialog v-model="setRightDialogVisible" title="分配权限" :close-on-click-modal="false"
            destroy-on-close><!-- add -->
            <SetRightDialog :dialogInfo="dialogInfo" @close_dialog_event="closeDialog"
               @update_role_list_event="updateListData" />
         </el-dialog>

      </div>
   </el-Card>
</template>

<style lang='less'>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.el-card {
   min-width: 1250px;

   .container {

      .input-btn-container {
         width: 100%;

         margin: 5px 0 20px 0;

         .el-input {
            width: 250px;
            height: 35px;

            margin: 0 50px 0 0;

         }
      }

      .el-table {
         margin: 0 0 20px 0;

         .el-row {
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;

            &:first-child {
               margin-top: -5px;
            }

            .no-bdtop-bot {
               border-top: none !important;
            }

            .no-bdtop-bot:last-child {
               border-bottom: none !important;
            }

            div {
               min-width: 150px;
            }
         }
      }
   }
}

.el-tag {
   margin: 7px;
}

.el-dialog {
   max-width: 500px;
}
</style>
