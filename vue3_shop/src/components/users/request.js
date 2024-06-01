import api from '../../server'
import { ElMessage } from 'element-plus'

export async function getUsersList(queryInfo) {
   try {
      const { data: res } = await api.get('./users', {
         params:queryInfo
      })
      if (!(res.meta.status >= 200 && res.meta.status < 300))
         throw new Error(res.meta.msg)
      return res.data
   } catch (error) {
      ElMessage({
         showClose: true,
         message: error.message,
         center: true,
         type: 'error',
      })
   }


}