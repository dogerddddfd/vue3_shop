<script setup>
import { ref, reactive, toRaw, onBeforeMount } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { formRules } from './form_rules'
import { request } from '@/utils/server'
import { submitForm } from '@/utils/submitForm'


const formRef = ref()

const props = defineProps({
   roleInfo: Object
})

const roleID = ref(props.roleInfo.id)

let rightTree = undefined

onBeforeMount(async () => {
   const data = await request({
      method: 'get',
      url: `rights/tree`
   })
   rightTree = reactive(data)
   console.log(rightTree)
})

const emit = defineEmits(['close_dialog_event', 'update_role_list_event'])


const clickSubmit = async () => {
   try {
      await submitForm(formRef)
      await request({
         method: 'put',
         url: `/roles/${roleID.value}`,
         data: toRaw(editForm)
      })
      ElMessage({
         showClose: true,
         message: '修改职位成功',
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
   <el-form ref="formRef" :model="editForm" :rules="formRules" label-width="80px" label-position="right">
      <el-tree :data="rightTree" :props="{
         label: 'authName',
         children: 'children',
      }" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef">
      </el-tree>

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
