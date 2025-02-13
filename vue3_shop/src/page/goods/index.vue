<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, ElBreadcrumb, ElBreadcrumbItem, ElCard, ElRow, ElCol, ElInput, ElButton, ElTable, ElTableColumn, ElPagination, ElDialog, ElForm, ElFormItem } from 'element-plus';
import {
   Edit, Delete, Setting, CaretRight, Search
} from '@element-plus/icons-vue'
import { request } from '@/utils/server';
import { openDeleteGoodDialog } from './deleteGoodsDialog';


onBeforeMount(() => {
   updateListData();
});


const router = useRouter();

const queryInfo = reactive({
   query: '',
   pagenum: 1,
   pagesize: 10,
});

const total = ref(0);
const goodsList = ref([]);

const updateListData = async () => {
   try {
      const res = await request({
         method: 'get',
         url: 'goods',
         params: queryInfo,
      });

      goodsList.value = res.goods;
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


const goAddPage = () => {
   router.push('/goods/add');
};

//#region 删除商品对话框


const handleDeleteGoodDialogOpen = async (scopeInfo) => {

   await openDeleteGoodDialog(scopeInfo)

   updateListData()

}
//#endregion

</script>

<template>
   <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
         <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>商品管理</el-breadcrumb-item>
         <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区 -->
      <el-card>
         <!-- 添加与搜索区域 -->
         <el-row :gutter="20" class="search-container">
            <!-- 搜索 -->
            <el-col :span="8">
               <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getGoodsList">
                  <template #append>
                     <el-button :icon="Search" @click="getGoodsList"></el-button>
                  </template>
               </el-input>
            </el-col>

            <!-- 添加 -->
            <el-col :span="4">
               <el-button type="primary" @click="goAddPage" style="margin-left: 30px">添加商品</el-button>
            </el-col>
         </el-row>
         <!-- 主体区 -->
         <!-- 表格区 -->
         <el-table border stripe :data="goodsList">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" min-width="400px"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格(元)" min-width="70px"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" min-width="50px"></el-table-column>
            <el-table-column prop="add_time" label="创建时间">
               <template #default="scope">
                  {{ new Date(scope.row.add_time * 1000).toLocaleString() }}
               </template>
            </el-table-column>
            <el-table-column label="操作">
               <template #default="scope">
                  <!-- <el-button type="primary" size="mini" icon="Edit" @click="showEditDialog" disabled></el-button> -->
                  <el-button type="danger" size="mini" icon="Delete"
                     @click="handleDeleteGoodDialogOpen(scope.row.goods_id)"></el-button>
               </template>
            </el-table-column>
         </el-table>
         <!-- 页码区 -->
         <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum" :page-sizes="[10, 25, 50, 100, 200]" :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" class="pagination">
         </el-pagination>
      </el-card>

   </div>
</template>

<style lang='less'>
.el-breadcrumb {
   margin: 0 0 20px 0;
}

.el-card {
   min-width: 1250px;

   .search-container {
      margin: 5px 0 20px 0;

      display: flex;
      align-items: center;

   }

   .pagination {
      margin: 20px 0 0 0;
   }
}
</style>
