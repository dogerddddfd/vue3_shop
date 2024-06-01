<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard } from 'element-plus';
</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <div class="container">
         <p style="text-align: center;font-size: 30px;">欢迎！</p>
         <p>下面哥们不会写了</p><br>
         <p>github : <a href="https://github.com/dogerddddfd/vue3_shop">github.com/dogerddddfd/vue3_shop</a></p><br>
         <p>项目来源 : <a href="https://www.bilibili.com/video/BV1x64y1S7S7/">黑马程序员</a></p>
      </div>
   </el-Card>
</template>

<style scoped>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.container {
   width: 100%;
   height: 300px;
}
</style>
