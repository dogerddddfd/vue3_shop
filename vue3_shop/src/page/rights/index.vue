<script setup>
import {ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElTableColumn, ElTag} from "element-plus"
import { ref, onBeforeMount } from 'vue';
import { request } from '@/utils/server';
const rightList = ref([]);


onBeforeMount(async () => {
   rightList.value = await request({
      method: 'get',
      url: `rights/list`
   });
});
</script>




<template>
   <div>
      <el-breadcrumb separator=">">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>权限管理</el-breadcrumb-item>
         <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
         <el-table border stripe :data="rightList">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <el-table-column label="权限等级" prop="level">
               <template v-slot="scope">
                  <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                  <el-tag v-if="scope.row.level === '1'" type="success">二级</el-tag>
                  <el-tag v-if="scope.row.level === '2'" type="warning">三级</el-tag>
               </template>
            </el-table-column>
         </el-table>
      </el-card>
   </div>
</template>

<style lang="less" scoped>
.el-card{
   margin-top: 20px;
}
</style>