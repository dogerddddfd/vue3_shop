<script setup>
import { ElMessage, ElBreadcrumb, ElBreadcrumbItem, ElCard, ElCascader, ElAlert, ElTabs, ElTabPane, ElCol, ElButton, ElTable, ElTableColumn, } from 'element-plus';
import { onBeforeMount, ref } from 'vue';
import { request } from '@/utils/server';
import { computed } from 'vue';


onBeforeMount(() => {
   updateCateList()
})

const catelist = ref([]);
const selectedCateKeys = ref([]);
const activeName = ref("many");


const updateCateList = async () => {
   // 获取商品分类列表
   try {
      const res = await request({
         method: 'get',
         url: 'categories'
      });

      catelist.value = res;
      console.log(res);
   } catch (error) {
      ElMessage.error('获取商品分类列表失败！');
      console.error(error);
   }
}


function handleChange() {
   if (this.selectedCateKeys.length !== 3) {
      this.$message.error('只允许为第三级分类设置相关参数')
      this.selectedCateKeys = []
      this.manyTableData = []
      this.onlyTableData = []
      return
   }

   // 发起请求
   getParamsData()
}

const cateId = computed(() => {
   if (selectedCateKeys.value.length === 3) return selectedCateKeys.value[2];
   return null;
});


async function getParamsData() {
   const res = await request({
      method: 'get',
      url: `categories/${cateId.value}/attributes`,
      params: {
         sel: activeName.value
      }

   });

   console.log(res);
}
</script>

<template>
   <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>welcome</el-breadcrumb-item>
   </el-breadcrumb>
   <el-Card>
      <!-- 头部提示区 -->
      <el-alert show-icon title="注意：只允许为第三级分类设置相关参数" type="warning" />
      <!-- 选择分类区 -->
      <el-row>
         <el-col>
            <span>选择商品分类：</span>
            <el-cascader v-model="selectedCateKeys" :options="catelist" :props="{
               expandTrigger: 'hover',
               value: 'cat_id',
               label: 'cat_name',
               children: 'children',
            }" @change="handleChange()">
            </el-cascader>
         </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleTabClick">
         <!-- 动态参数面板 -->
         <el-tab-pane label="动态参数" name="many">
            <!-- 添加参数按钮 -->
            <el-button class="add-params-btn" type="primary" size="mini" :disabled="isBtnDisabled" @click="showAddDialog">添加参数
            </el-button>
            <!-- 参数表 -->
            <el-table :data="manyTableData" border stripe>
               <!-- 展开行 -->
               <el-table-column type="expand">
                  <template slot-scope="scope">
                     <!-- 渲染tag -->
                     <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index" closable
                        @close="handleClose(index, scope.row)">{{ item }}</el-tag>
                     <!-- 添加tag -->
                     <el-input class="input-new-tag" v-if="scope.row.inputVisible" v-model="scope.row.inputValue"
                        ref="saveTagInput" size="small" @keyup.enter.native="handleInputEnter(scope.row)"
                        @blur="handleInputBlur(scope.row)">
                     </el-input>
                     <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New
                        Tag</el-button>
                  </template>
               </el-table-column>
               <!-- 索引 -->
               <el-table-column type="index"></el-table-column>
               <el-table-column label="参数名称" prop="attr_name"></el-table-column>
               <el-table-column label="操作">
                  <template slot-scope="scope">
                     <el-button type="primary" icon="el-icon-edit" size="mini"
                        @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                     <el-button type="danger" icon="el-icon-delete" size="mini"
                        @click="removeParamsById(scope.row.attr_id)">删除</el-button>
                  </template>
               </el-table-column>
            </el-table>
         </el-tab-pane>
      </el-tabs>
   </el-Card>
</template>

<style>
.el-breadcrumb {
   margin: 0 0 20px 0;
}
.add-params-btn{
   margin: 0 0 15px 0;
}
.el-card {
   .el-alert {
      margin-bottom: 0 0 0 20px;
   }
}
</style>
