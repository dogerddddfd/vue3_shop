<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElCol, ElButton, ElTable, ElTableColumn, ElPagination, ElMessage, ElTag } from 'element-plus';
import { request } from '@/utils/server';

const queryInfo = reactive({
   query: '',
   pagenum: 1,
   pagesize: 5,
});

const total = ref(0);
const categoriesList = ref([]);


onBeforeMount(() => {
   updateListData();
});

const updateListData = async () => {
   try {
      const res = await request({
         method: 'get',
         url: 'categories',
         params: queryInfo,
      });
      categoriesList.value = res.result;
      total.value = res.total;
   } catch (error) {
      ElMessage.error('获取商品列表失败！');
      console.error(error);
   }
};

const handleSizeChange = (newSize) => {
   queryInfo.value.pagesize = newSize;
   updateListData();
};

const handleCurrentChange = (newPage) => {
   queryInfo.value.pagenum = newPage;
   updateListData();
};
</script>


<template>
   <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>商品管理</el-breadcrumb-item>
         <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 卡片区 -->
      <el-card>
         <!-- 添加分类 -->
         <el-col :span="1" :gutter="20" style="margin-bottom: 10px"> <!-- Changed gutter:20 to :gutter="20" -->
            <el-button type="primary" @click="">
               添加分类
            </el-button>
         </el-col>

         <div>
            <el-table :data="categoriesList" style="width: 100%; margin-bottom: 20px" row-key="cat_id" border>
               <el-table-column type="index" label="#">{{ }}</el-table-column>
               <el-table-column prop="cat_name" label="分类名称" sortable />
               <el-table-column prop="cat_deleted" label="是否有效" sortable>
                  <template #default="scope">
                     <el-tag :type="scope.row.cat_deleted === false ? 'success' : 'error'" disable-transitions>{{
                        scope.row.cat_deleted === false ? '有效' : '已删除' }}</el-tag>
                  </template>
               </el-table-column>
               <el-table-column prop="cat_level" label="分类级别" sortable>
                  <template #default="scope">
                     <el-tag :type="['success','primary','warning'][scope.row.cat_level]" disable-transitions>{{
                        ['一级','二级','三级'][scope.row.cat_level] }}</el-tag>
                  </template>
               </el-table-column>
               <el-table-column label="操作">
               <template #default="scope">
                  <el-button type="primary" size="" icon="Edit" @click="showEditDialog" disabled></el-button>
                  <el-button type="danger" size="" icon="Delete"
                     @click="handleDeleteGoodDialogOpen(scope.row.goods_id)"></el-button>
               </template>
            </el-table-column>
            </el-table>

         </div>

         <!-- 分页 -->
         <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
         </el-pagination>
      </el-card>

   </div>
</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}
</style>
