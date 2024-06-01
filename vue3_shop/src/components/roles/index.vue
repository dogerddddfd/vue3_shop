<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';
</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>welcome</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         roles
      </div>
   </el-Card>
</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

</style>
