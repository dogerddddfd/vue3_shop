<script setup>
import {
   ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElTableColumn, ElPagination
   , ElInput, ElButton, ElConfigProvider, ElSwitch, ElTooltip, ElDialog,
} from 'element-plus';

import {
   Edit, Delete, Setting, Search
} from '@element-plus/icons-vue'

// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onBeforeMount, reactive, ref, toRaw } from 'vue';

import { getUsersList, changeUserState } from './request'

import AddUserDialog from './addUserDialog/index.vue'
import EditUserDialog from './editUserDialog/index.vue'
import EditRoleDialog from './editRoleDialog/index.vue'
import { openDeleteUserDialog } from './deleteUserDialog/index'

const queryInfo = reactive({
   query: '',
   pagesize: 2,
   pagenum: 1
})

let usersListData = reactive({})

onBeforeMount(async () => {
   updateListData()
})


async function updateListData() {
   const data = await getUsersList(queryInfo)
   usersListData.users = data.users
   usersListData.total = data.total
   queryInfo.pagenum = data.pagenum
}

function handlePaginationChange() {
   updateListData()
}

function handleSearchBtnClick() {
   console.log(queryInfo)
   updateListData()
}

function handleUserStateChange(scope_userInfo) {
   changeUserState(toRaw(scope_userInfo))
   updateListData()
}

//#region user info in dialog 
const dialogUserInfo = reactive({
   id: '',
   username: '',
   email: '',
   mobile: '',
   role_name:''
})

const updateDialogUserInfo = (scope_userInfo) => {
   dialogUserInfo.id = scope_userInfo.id
   dialogUserInfo.username = scope_userInfo.username
   dialogUserInfo.email = scope_userInfo.email
   dialogUserInfo.mobile = scope_userInfo.mobile
   dialogUserInfo.role_name = scope_userInfo.role_name
}
//#endregion


//#region edit user dialog
const editUserDialogVisible = ref(false)

const handleEditUserDialogOpen = (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)
   queryInfo.query = ''
   editUserDialogVisible.value = true
}

const handleEditUserDialogClose = () => {
   editUserDialogVisible.value = false;
   updateListData()
   updateDialogUserInfo({})
}
//#endregion

//#region delete user dialog
const handleDeleteUserDialogOpen = async (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)

   await openDeleteUserDialog(dialogUserInfo)

   updateDialogUserInfo({})
   updateListData()
}


//#endregion

//#region add user dialog
const addUserDialogVisible = ref(false)

const handleaddUserDialogOpen = (scope_userInfo) => {
   addUserDialogVisible.value = true
   queryInfo.query = ''
}

const handleaddUserDialogClose = () => {
   addUserDialogVisible.value = false;
   updateListData()
}
//#endregion


//#region edit role dialog
const editRoleDialogVisible = ref(false)

const handleEditRoleDialogOpen = (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)
   editRoleDialogVisible.value = true
   queryInfo.query = ''
}

const handleEditRoleDialogClose = () => {
   editRoleDialogVisible.value = false;
   updateListData()
}
//#endregion
</script>




<template>
   <el-breadcrumb separator=">"><!-- 面包屑 --> 
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>

   <el-Card>
      <div class="container">
         <div class="input-btn-container"><!-- 顶部按钮-->
            <el-input v-model="queryInfo.query" placeholder="请输入搜索内容" style="max-width: 600px" clearable>
               <template #append>
                  <el-button :icon="Search" @click="handleSearchBtnClick" />
               </template>
            </el-input>
            <el-button type="primary" @click="handleaddUserDialogOpen">添加用户</el-button>
         </div>
         <el-config-provider :locale='zhCn'>
            <el-table :data="usersListData.users" border style="width: 100%" stripe><!-- 列表 -->
               <el-table-column type="index" width="50" />
               <el-table-column prop="username" label="姓名" width="120" />
               <el-table-column prop="email" label="邮箱" width="180" />
               <el-table-column prop="mobile" label="电话" width="150" />
               <el-table-column prop="role_name" label="权限" width="150" />
               <el-table-column prop="mg_state" label="状态" width="80">
                  <template #default="scope">
                     <el-switch v-model="scope.row.mg_state" @change="handleUserStateChange(scope.row)" />
                  </template>
               </el-table-column>
               <el-table-column label="操作">
                  <template #default="scope">
                     <el-button type="primary" :icon="Edit" @click="handleEditUserDialogOpen(scope.row)"></el-button>
                     <el-tooltip class="box-item" effect="dark" content="分配权限" placement="top">
                        <el-button type="warning" :icon="Setting"
                           @click="handleEditRoleDialogOpen(scope.row)"></el-button>
                     </el-tooltip>
                     <el-button type="danger" :icon="Delete" @click="handleDeleteUserDialogOpen(scope.row)"></el-button>
                  </template>

               </el-table-column>
            </el-table>

            <!--分页-->
            <el-pagination v-model:current-page="queryInfo.pagenum" v-model:page-size="queryInfo.pagesize"
               :page-sizes="[2, 3, 4, 5]" layout="total, sizes, prev, pager, next, jumper" :total="usersListData.total"
               @size-change="handlePaginationChange()" @current-change="handlePaginationChange()" />
         </el-config-provider>
      </div>
   </el-Card>

   <el-dialog v-model="editUserDialogVisible" title="修改用户数据" :close-on-click-modal="false"><!-- edit -->
      <EditUserDialog :userInfo="dialogUserInfo" @close_edit_dialog_event="handleEditUserDialogClose"
         @update_user_list_event="updateListData" />
   </el-dialog>

   <el-dialog v-model="addUserDialogVisible" title="添加用户" :close-on-click-modal="false"><!-- add -->
      <AddUserDialog @close_add_dialog_event="handleaddUserDialogClose" @update_user_list_event="updateListData" />
   </el-dialog>

   <el-dialog v-model="editRoleDialogVisible" title="编辑权限" :close-on-click-modal="false" destroy-on-close><!-- add -->
      <EditRoleDialog :userInfo="dialogUserInfo" @close_edit_role_dialog_event="handleEditRoleDialogClose"
         @update_user_list_event="updateListData" />
   </el-dialog>

</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.el-card {
   min-width: 1000px;

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
      }
   }

}
.el-dialog{
   max-width: 500px;
}
</style>
