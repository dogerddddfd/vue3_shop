import api from '../../server'
import router from '../../router'
import { ElMessage } from 'element-plus'
import { toRaw } from '@vue/reactivity'


async function submitForm(login_form_ref, login_form) {
   await login_form_ref.validate(async (valid, fields) => {
      try {
         if (!valid) throw new Error('表单填写错误')
         const { data: res } = await api.post('login',
            toRaw(login_form)
         )
         if (!(res.meta.status >= 200 && res.meta.status < 300))
            throw new Error(res.meta.msg)
         window.sessionStorage.setItem('token', res.data.token)

         router.push('/home')
         ElMessage({
            showClose: true,
            message: '登陆成功',
            center: true,
            type: 'success',
         })
      } catch (error) {
         ElMessage({
            showClose: true,
            message: error.message,
            center: true,
            type: 'error',
         })
      }
   })
}

export default submitForm