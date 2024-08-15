import { request } from '@/utils/server'
import { toRaw } from 'vue'

export async function getRoleList() {
   return await request({
      method: 'get',
      url: 'roles'
   })
}