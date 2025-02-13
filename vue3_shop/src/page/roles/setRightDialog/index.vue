<script setup>
import { ref, reactive, toRaw, onBeforeMount } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage, ElTree } from 'element-plus';
import { request } from '@/utils/server'


const treeRef = ref()

const props = defineProps({
   dialogInfo: Object
})

const roleID = ref(props.dialogInfo.id)

const defKeys = reactive([])

let rightTree = undefined

function getLeafKeys(children, defKeys) {
   // console.log(children)
   children.forEach(item => {
      if (!item.children || item.children.length === 0) {
         defKeys.push(item.id + "")
      } else {
         getLeafKeys(item.children, defKeys)
      }
   })
}

onBeforeMount(async () => {
   const data = await request({
      method: 'get',
      url: `rights/tree`
   })
   rightTree = reactive(data)
   getLeafKeys(toRaw(props.dialogInfo.children), defKeys)
   if (defKeys.length === 0) {
      defKeys.push("")
   }
})



const emit = defineEmits(['close_dialog_event', 'update_role_list_event'])


const clickSubmit = async () => {
   const keys = [
      ...treeRef.value.getCheckedKeys(),
      ...treeRef.value.getHalfCheckedKeys(),
   ]
   const idStr = keys.join(',')

   try {
      await request({
         method: 'post',
         url: `/roles/${roleID.value}/rights`,
         data: {
            rids: idStr
         }
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
   <el-form ref="formRef" label-width="80px" label-position="right">
      <el-tree :data="rightTree" :props="{
         label: 'authName',
         children: 'children',
      }" show-checkbox node-key="id" default-expand-all :default-checked-keys="[...defKeys]" ref="treeRef">

      </el-tree>
      <div class="btn-div">
         <el-button type="primary" @click="clickSubmit">提交</el-button>
         <el-button @click="$emit('close_dialog_event')">取消</el-button>
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
