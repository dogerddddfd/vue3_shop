import api from '../../../server.js'
import { ElMessage } from 'element-plus'


async function getMenuList() {
   try {
      const { data: res } = await api.get('/menus')
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

export default getMenuList