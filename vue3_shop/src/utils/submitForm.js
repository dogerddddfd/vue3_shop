import { ElMessage } from "element-plus"


export async function submitForm(ref) {
   await ref.value.validate(async (valid, fields) => {
      try {
         if (!valid) throw new Error('表单填写错误')
         return
      } catch (error) {
         ElMessage({
            showClose: true,
            message: error.message,
            center: true,
            type: 'error',
         })

         throw (error)
      }
   })
}