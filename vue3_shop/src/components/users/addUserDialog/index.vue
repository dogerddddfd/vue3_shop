<script setup>
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem,ElInput } from 'element-plus';
import {edit_rules} from './form_rules'

const edit_user_form_ref = ref()



const edit_form = reactive({
   username:'',
   password:'',
   email:'',
   mobile:'',
})


</script>

<template>
   <el-form style='width: 60%;' ref="edit_user_form_ref" :model="edit_form" :rules="edit_rules">
      <el-form-item prop="username">
         <span>帐号</span>
         <el-input v-model="edit_form.username" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="password">
         <span>密码</span>
         <el-input v-model="edit_form.password" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="password">
         <span>邮箱</span>
         <el-input v-model="edit_form.email" />
      </el-form-item>
      <el-form-item style="margin:30px 0px 3dvh 0px" prop="password">
         <span>电话号码</span>
         <el-input v-model="edit_form.mobile" />
      </el-form-item>
   </el-form>

</template>