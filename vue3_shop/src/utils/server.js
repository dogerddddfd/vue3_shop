import axios from 'axios'
import { ElMessage } from "element-plus"


export const api = axios.create(
   {
      baseURL: '/api',
      timeout: 50000
   }
)

api.interceptors.request.use((config) => {
   config.headers.Authorization = window.sessionStorage.getItem('token')
   return config
})


export async function request(form, successMsg = '') {
   try {
      console.log(form)
      const { data: res } = await api(form
      )
      if (!(res.meta.status >= 200 && res.meta.status < 300))
         throw new Error(res.meta.msg)
      if (successMsg) {
         ElMessage({
            showClose: true,
            message: successMsg,
            center: true,
            type: 'success',
         })
      }
      return res.data
   } catch (error) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
      throw (error)
   }
}

