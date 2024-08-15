<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElButton, ElTable, ElTableColumn, ElTag, ElRow, ElDialog } from 'element-plus';
import {
   Edit, Delete, Setting, CaretRight
} from '@element-plus/icons-vue'

import { onBeforeMount, reactive, ref } from 'vue';
import { getRoleList } from './request';
import AddRoleDialog from './addRoleDialog/index.vue'
import EditRoleDialog from './editRoleDialog/index.vue'

let roleList = reactive({ data: [] })

//更新数据
async function updateListData() {
   roleList.data = await getRoleList()
}

onBeforeMount(async () => {
   updateListData()
})

//#region 添加角色
const addRoleDialogVisible = ref(false)

const handleAddRoleDialogOpen = () => {
   addRoleDialogVisible.value = true
}
//#endregion


//#region 修改用户对话框
const dialogRoleInfo = reactive({
   id:'',
   roleName: '',
   roleDesc: ''
})

const updateDialogRoleInfo = (scopeInfo) => {
   dialogRoleInfo.id = scopeInfo.id
   dialogRoleInfo.roleName = scopeInfo.roleName
   dialogRoleInfo.roleDesc = scopeInfo.roleDesc
}

const editRoleDialogVisible = ref(false)

const handleEditRoleDialogOpen = (scopeInfo) => {
   updateDialogRoleInfo(scopeInfo)
   editRoleDialogVisible.value = true
}

//#endregion

const closeDialog = () => {
   addRoleDialogVisible.value = false;
   editRoleDialogVisible.value = false;
   updateListData()
}



</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         <div class="input-btn-container"><!-- 顶部按钮-->
            <el-button type="primary" @click="handleAddRoleDialogOpen">添加角色</el-button>
         </div>

         <el-table :data="roleList.data" border style="width: 100%" stripe><!-- 列表 -->
            <el-table-column type="expand">
               <template #default="scope">
                  <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id">
                     <!-- 一级权限 -->
                     <el-col :span="10">
                        <el-tag closable @close="remveRightByid(scope.row, item1.id)">{{ item1.authName }}</el-tag>
                        <i class="el-icon">
                           <CaretRight />
                        </i>
                     </el-col>
                     <!-- 二三级权限 -->
                     <el-col :span="19">
                        <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="['no-bdtop-bot']">
                           <el-col :span="6">
                              <el-tag type="success" closable @close="remveRightByid(scope.row, item2.id)">{{
                                 item2.authName }}</el-tag>
                              <i class="el-icon">
                                 <CaretRight />
                              </i>
                           </el-col>
                           <el-col :span="18">
                              <el-tag v-for="(item3, i3) in item2.children" :key="item3.id" type="warning" closable
                                 @close="remveRightByid(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                           </el-col>
                        </el-row>
                     </el-col>
                  </el-row>
               </template>
            </el-table-column>

            <el-table-column type="index" width="50" />
            <el-table-column prop="roleName" label="角色名称" width="150" />
            <el-table-column prop="roleDesc" label="角色描述" width="300" />
            <el-table-column label="操作">
               <template #default="scope">
                  <el-button type="primary" :icon="Edit" @click="handleEditRoleDialogOpen(scope.row)">编辑</el-button>
                  <el-button type="warning" :icon="Setting"
                     @click="handleEditRoleDialogOpen(scope.row)">分配权限</el-button>
                  <el-button type="danger" :icon="Delete" @click="handleDeleteRoleDialogOpen(scope.row)">删除</el-button>
               </template>

            </el-table-column>
         </el-table>


         <el-dialog v-model="addRoleDialogVisible" title="添加角色" :close-on-click-modal="false"
            destroy-on-close><!-- add -->
            <AddRoleDialog @close_dialog_event="closeDialog" @update_role_list_event="updateListData" />
         </el-dialog>

         <el-dialog v-model="editRoleDialogVisible" title="编辑权限" :close-on-click-modal="false"
            destroy-on-close><!-- add -->
            <EditRoleDialog :roleInfo="dialogRoleInfo" @close_dialog_event="closeDialog"
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

            el-col {
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
