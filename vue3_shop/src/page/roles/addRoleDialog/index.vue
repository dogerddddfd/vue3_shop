<script setup>
import { ref, reactive, toRaw } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { formRules } from './form_rules'
import { request } from '@/utils/server'
import { submitForm } from '@/utils/submitForm'


const FormRef = ref()

const addForm = reactive({
   roleName: '',
   roleDesc: '',
})

const emit = defineEmits(['close_dialog_event', 'update_role_list_event'])


const clickSubmit = async () => {
   try {
      await submitForm(FormRef)
      await request({
         method: 'post',
         url: `/roles/`,
         data: toRaw(addForm)
      })
      ElMessage({
         showClose: true,
         message: '添加角色成功',
         center: true,
         type: 'success',
      })
      emit('close_dialog_event')
      emit('update_role_list_event')
   } catch (error) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }

}


</script>

<template>
   <el-form ref="FormRef" :model="addForm" :rules="formRules" label-width="80px" label-position="right">
      <el-form-item label="角色名称" prop="roleName">
         <el-input v-model="addForm.roleName" ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
         <el-input v-model="addForm.roleDesc"></el-input>
      </el-form-item>
      <div class="btn-div">
         <el-button @click="emit('close_dialog_event')">取消</el-button>
         <el-button type="primary" @click="clickSubmit">确定</el-button>
      </div>

   </el-form>
</template>


<style lang="less" scoped>
.el-form {

   margin: 10px 0 10px 0;
   padding: 0 30px 0 10px;

   .btn-div {
      width: 100%;

      display: flex;
      justify-content: right;
   }
}
</style>