import { reactive } from 'vue'


export const formRules = reactive({
   roleName: [
      {
         required: true,
         message: '请输入角色名称',
         trigger: 'blur',
      },
   ],
   roleDesc: [
      {
         required: true,
         message: '请输入角色描述',
         trigger: 'blur',
      },
   ],
})


