import { api, request } from '../../utils/server'
import { toRaw } from 'vue'
import { ElMessage } from 'element-plus'

export async function getUsersList(queryInfo) {
   console.log(queryInfo)
   return await request({
      method: 'get',
      url: './users',
      params: queryInfo
   })
}

export async function changeUserState(userInfo) {
   await request({
      method: 'put',
      url: `users/${toRaw(userInfo.id)}/state/${toRaw(userInfo.mg_state)}`,
   },'用户状态修改成功')
}

/*
- 请求路径：users/:id
- 请求方法：delete
*/
export async function deleteUser(userInfo) {
   await request({
      method: 'delete',
      url: `users/${userInfo.id}}`,
   },'已删除用户')
}