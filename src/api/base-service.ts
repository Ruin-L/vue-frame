import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// 获取浏览器中的url地址和端口号并拼接
/* import { config } from 'public/config.js'
const getBaseUrl = () => {
  let baseUrlData = ''
  if (process.env.NODE_ENV === 'development') {
    baseUrlData = config.baseUrl
  } else if (process.env.NODE_ENV === 'production') {
    baseUrlData = 'http://10.0.0.88:3000/api'
  }
  return baseUrlData
} */
// 创建一个新的axios实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么
    // 例如，添加token到请求头
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    console.log(process.env.NODE_ENV, '变量')

    const data = response.data
    console.log('接口返回', data)
    // 判断接口返回的 Message 字段是否为 Success
    if (!data?.Message.includes('Success')) {
      // 如果不是 Success，则将请求视为失败
      ElMessageBox.alert(JSON.stringify(data), '错误', {
        confirmButtonText: '确定',
        type: 'error',
        dangerouslyUseHTMLString: false
      })
      return Promise.reject({
        response: {
          status: 200,
          data: data,
          message: JSON.stringify(data) || '请求失败'
        }
      })
    }
    // 如果是 Success，则返回数据
    return data
  },
  (error: any) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内

      console.error('请求错误:', error.response.status, error.response.data)
    } else if (error.request) {
      // 请求已经发出，但没有收到响应

      console.error('网络错误:', error.request)
    } else {
      // 在设置请求时发生了一些事情，触发了一个错误
      console.error('错误:', error.message)
    }

    console.error('报错', error)

    ElMessageBox.alert(
      `接口：【${error.config.url}】报错
      ${error.message}
      ${JSON.stringify(error?.response?.data)}
      `,
      '报错',
      {
        confirmButtonText: '确定',
        type: 'error',
        dangerouslyUseHTMLString: false
      }
    )
    return Promise.reject(error)
  }
)

export default instance
