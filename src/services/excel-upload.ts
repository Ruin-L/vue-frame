import Axios from '../utils/request/base-service' // 导入配置好的axios文件
import type { AxiosProgressEvent } from 'axios'

// 封装axios请求函数，并用export导出
export function uploadExcel(
  file: FormData,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  return Axios({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: file,
    responseType: 'blob',
    onUploadProgress
  })
}

export function checkHealth() {
  return Axios({
    url: '/health',
    method: 'get',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    },
    params: {
      _t: Date.now()
    }
  })
}

export function checkDataSourceStatus() {
  return Axios({
    url: '/data-source-status',
    method: 'get',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    },
    params: {
      _t: Date.now()
    }
  })
}

export function testConnection() {
  return Axios({
    url: '/test',
    method: 'get',
    params: {
      _t: Date.now()
    }
  })
}

export function getProcessingProgress() {
  return Axios({
    url: '/progress',
    method: 'get',
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    },
    params: {
      _t: Date.now()
    }
  })
}