import { ElMessage, ElMessageBox } from 'element-plus'
import { request } from '@/utils/server'

export async function openDeleteGoodDialog(goodId) {
   await ElMessageBox.confirm(
      '确定要永久删除该商品?',
      '警告',
      {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning',
      }
   ).then(() => {
      request({
         method:'delete',
         url:`/goods/${goodId}`
      })
      ElMessage({
         type: 'success',
         message: '已删除',
      })
   }).catch(() => {
      ElMessage({
         type: 'info',
         message: '已取消',
      })
   })
}
