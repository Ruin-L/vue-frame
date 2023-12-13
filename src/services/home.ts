import Axios from '@/api/base-service' // 导入配置好的axios文件
// 封装axios请求函数，并用export导出
// get请求
const getInfo = (params: unknown) => {
  return Axios({
    url: '/api/horoscope',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded' //设置请求头请求格式form
    },
    params
  })
}

// post请求
const getItem = (data: unknown) => {
  return Axios({
    url: '/api/getItem',
    method: 'post',
    headers: {
      'Content-Type': 'application/json' //设置请求头请求格式为json
    },
    data
  })
}

const HomeApi = {
  getInfo,
  getItem
}
export default HomeApi
