<template>
   <div class="form_div">
      <el-form style='width: 60%;' ref="login_form_ref" :model="login_form" :rules="login_rules">
         <el-form-item prop="username">
            <el-input v-model="login_form.username" />
         </el-form-item>
         <el-form-item style="margin:30px 0px 3dvh 0px" prop="password">
            <el-input v-model="login_form.password" />
         </el-form-item>
         <el-form-item size='large' style="float: right;">
            <el-button type="primary" @click="clickSbumit()">登录</el-button>
            <el-button>重置</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus'
import { submitForm } from '../../utils/submitForm'
import { request } from '../../utils/server'
import { login_rules } from './form_rules'
import router from '../../router'


const login_form_ref = ref()

const login_form = reactive({
   username: 'admin',
   password: '123456',
})


const clickSbumit = async () => {
   try {
      await submitForm(login_form_ref)
      const data = await request({
         method: 'post',
         url: `login`,
         data: toRaw(login_form)
      }, '登录成功')

      window.sessionStorage.setItem('token', data.token)

      router.push('/home')
   }catch(error){
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }
}



</script>

<style scoped>
.form_div {
   width: 100%;
   height: 180px;

   position: absolute;
   top: 110px;
   left: 0;

   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
}
</style>