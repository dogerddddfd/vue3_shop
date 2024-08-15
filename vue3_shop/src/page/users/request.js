import { request } from '@/utils/server'
import { toRaw } from 'vue'

export async function getUsersList(queryInfo) {
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
   })
}


export async function deleteUser(userInfo) {
   await request({
      method: 'delete',
      url: `users/${userInfo.id}}`,
   })
}