<script setup>
import {
   ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElTableColumn, ElPagination
   , ElInput, ElButton, ElConfigProvider, ElSwitch, ElTooltip, ElDialog
} from 'element-plus';

import {
   Edit, Delete, Setting
} from '@element-plus/icons-vue'

// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { onBeforeMount, reactive, ref, toRaw } from 'vue';

import { getUsersList, changeUserState } from './request'

import EditUserDialog from './editUserDialog/index.vue'

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

function handleUserStateChange(scope_userInfo) {
   changeUserState(toRaw(scope_userInfo))
   updateListData()
}

//#region user info in dialog 
const dialogUserInfo = reactive({
   id:'',
   username:'',
   email:'',
   mobile:''
})

const updateDialogUserInfo = (scope_userInfo) => {
   dialogUserInfo.id = scope_userInfo.id
   dialogUserInfo.username = scope_userInfo.username
   dialogUserInfo.email = scope_userInfo.email
   dialogUserInfo.mobile = scope_userInfo.mobile
}
//#endregion


//#region edit user dialog
const editUserDialogVisible = ref(false)

const showEditUserDialog = (scope_userInfo) => {
   updateDialogUserInfo(scope_userInfo)

   editUserDialogVisible.value = true
}

const closeEditUserDialog = () => {
   editUserDialogVisible.value = false;
   updateListData(usersListData, queryInfo)
   updateDialogUserInfo({})
}
//#endregion

</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>

   <el-Card>
      <div class="container">
         <!-- <div class="input-btn-container">
            <el-input v-model="searchForm" placeholder="请输入搜索内容" style="max-width: 600px">
               <template #append>
                  <el-button :icon="Search" />
               </template>
</el-input>
<el-button type="primary">添加用户</el-button>
</div> -->

         <el-table :data="usersListData.users" border style="width: 100%" stripe>
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
                  <el-button type="primary" :icon="Edit" @click="showEditUserDialog(scope.row)"></el-button>
                  <el-tooltip class="box-item" effect="dark" content="分配权限" placement="top">
                     <el-button type="warning" :icon="Setting"></el-button>
                  </el-tooltip>
                  <el-button type="danger" :icon="Delete" @click=""></el-button>
               </template>

            </el-table-column>
         </el-table>

         <el-config-provider :locale='zhCn'>
            <el-pagination v-model:current-page="queryInfo.pagenum" v-model:page-size="queryInfo.pagesize"
               :page-sizes="[2, 3, 4, 5]" layout="total, sizes, prev, pager, next, jumper" :total="usersListData.total"
               @size-change="handlePaginationChange()" @current-change="handlePaginationChange()" />
         </el-config-provider>

      </div>

   </el-Card>

   <el-dialog v-model="editUserDialogVisible" title="修改用户数据" :close-on-click-modal="false">
      <EditUserDialog :userInfo="dialogUserInfo" @cancel_dialog_visible_event="closeEditUserDialog"
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

         display: flex;
         flex-direction: row;
         justify-content: space-between;
         align-items: center;

         .el-input {
            width: 250px;
            height: 35px;

            .el-button {}
         }
      }

      .el-table {
         margin: 0 0 20px 0;
      }
   }

}
</style>
