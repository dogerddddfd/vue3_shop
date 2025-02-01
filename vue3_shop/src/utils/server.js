import axios from 'axios'


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


/**
 * 
 * @param {*} form 请求表单
 * @returns 
 */
export async function request(form) {

   // console.log(form)
   const { data: res } = await api(form)
   if (!(res.meta.status >= 200 && res.meta.status < 300))
      throw new Error(res.meta.msg)
   return res.data

}

