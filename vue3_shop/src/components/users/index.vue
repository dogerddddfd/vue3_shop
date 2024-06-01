<script setup>
import {
   ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElTableColumn, ElPagination
   , ElInput, ElButton, ElConfigProvider
} from 'element-plus';

// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { defineAsyncComponent } from 'vue';



import { getUsersList } from './request'


const tableData = [
   {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
   },
   {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
   },
]

const queryInfo = {
   query: '',
   pagesize: 4,
   pagenum: 1
}
let usersList = getUsersList(queryInfo)

</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         <div class="input-btn-container">
            <el-input v-model="searchForm" placeholder="请输入搜索内容" style="max-width: 600px">
               <template #append>
                  <el-button :icon="Search" />
               </template>
            </el-input>
            <el-button type="primary">添加用户</el-button>
         </div>

         <Suspense>
            <el-config-provider :locale='zhCn'>
               <el-table :data="tableData" border style="width: 100%">
                  <el-table-column prop="date" label="Date" width="180" />
                  <el-table-column prop="name" label="Name" width="180" />
                  <el-table-column prop="address" label="Address" />
               </el-table>
            </el-config-provider>

         <el-pagination v-model:current-page="queryInfo.pagenum" v-model:page-size="queryInfo.pagesize"
            :page-sizes="[2, 3, 4, 5]" :small="small" layout="total, sizes, prev, pager, next, jumper" :total="400"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
         </Suspense>

      </div>

   </el-Card>
</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.el-card {
   min-width: 600px;

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
