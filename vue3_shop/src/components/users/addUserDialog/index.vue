<script setup>
import { ref, reactive,toRaw } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { add_rules } from './form_rules'
import { request } from '../../../utils/server'
import { submitForm } from '../../../utils/submitForm'


const add_user_form_ref = ref()

const add_form = reactive({
   username: '',
   password: '',
   email: '',
   mobile: '',
})

const emit = defineEmits(['close_add_dialog_event', 'update_user_list_event'])


const clickSubmit = async () => {
   try {
      await submitForm(add_user_form_ref)
      await request({
         method: 'post',
         url: `/users/`,
         data: toRaw(add_form)
      }, '用户信息修改成功')
      emit('close_add_dialog_event')
      emit('update_user_list_event')
   } catch {

   }

}


</script>

<template>
   <el-form ref="add_user_form_ref" :model="add_form" :rules="add_rules" label-width="60px" label-position="right">
      <el-form-item prop="username" label="帐号">
         <el-input v-model="add_form.username" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="password" label="密码" type="password">
         <el-input v-model="add_form.password" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="email" label="邮箱">
         <el-input v-model="add_form.email" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="mobile" label="电话">
         <el-input v-model="add_form.mobile" />
      </el-form-item>
      <div class="btn-div">
         <el-button @click="emit('close_add_dialog_event')">取消</el-button>
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