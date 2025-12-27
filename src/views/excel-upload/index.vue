<template>
  <div class="excel-upload-container">
    <t-card title="Excel 地址信息补充" class="upload-card">
      <!-- 服务状态检查 -->
      <div class="status-section">
        <t-space>
          <t-tag variant="outline" :theme="serviceStatus === 'ok' ? 'success' : 'danger'">
            服务器状态:
            {{ serviceStatus === 'ok' ? '正常' : serviceStatus === 'error' ? '异常' : '检查中' }}
          </t-tag>
          <t-tag :theme="dataSourceStatus.both_exist ? 'success' : 'danger'" variant="outline">
            数据源: {{ dataSourceStatus.both_exist ? '完整' : '缺失' }}
          </t-tag>
        </t-space>
      </div>
      <t-divider />
      <!-- 文件上传区域 -->
      <div class="upload-section" @click="openFileSelect($event)">
        <t-upload
          v-model="fileList"
          :before-upload="beforeUpload"
          accept=".xlsx,.xls"
          ref="uploadRef"
          :cancelUploadButton="null"
          :max="2"
          upload-all-files-in-one-request
          :disabled="uploading"
          :request-method="customUpload"
          :showUploadProgress="false"
          :auto-upload="false"
          theme="file-flow"
          multiple
          placeholder="最多支持2个Excel文件"
        >
        </t-upload>

        <!-- 上传进度 -->

        <div v-if="uploading" class="upload-progress">
          <p class="progress-text">{{ uploadStatus }}</p>
          <t-progress :percentage="uploadProgress" />
        </div>
      </div>

      <t-divider />

      <!-- 说明信息 -->
      <div class="info-section">
        <t-alert theme="info" message="使用说明" :close="false">
          <template #default>
            <li>1、上传需要处理的Excel文件（包含身份证号列）</li>
            <li>2、系统将自动根据数据源补充乡镇街道和村社区信息</li>
            <li>3、处理完成后会自动下载结果文件</li>
          </template>
        </t-alert>
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next'
import {
  uploadExcel,
  checkHealth,
  checkDataSourceStatus,
  getProcessingProgress
} from '@/services/excel-upload'

// 响应式数据
const fileList = ref([])
const uploadRef = ref(null)
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref('')
const serviceStatus = ref('checking')
const dataSourceStatus = reactive({
  urban_rural_exists: false,
  worker_exists: false,
  both_exist: false
})
const processingProgress = reactive({
  status: 'idle',
  current_step: '',
  progress: 0,
  total_files: 0,
  processed_files: 0,
  current_file: '',
  error_message: ''
})
const progressTimer = ref<NodeJS.Timeout | null>(null)

// 文件上传前检查
const beforeUpload = (file: File) => {
  // 检查文件类型
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ]

  if (!allowedTypes.includes(file.type)) {
    MessagePlugin.error('只支持Excel文件格式（.xlsx, .xls）')
    return false
  }

  // 检查文件大小（50MB）
  /* const maxSize = 50 * 1024 * 1024
  if (file.size > maxSize) {
    MessagePlugin.error('文件大小不能超过50MB')
    return false
  }
 */
  return true
}

// 获取处理进度
const fetchProcessingProgress = async () => {
  try {
    const response = await getProcessingProgress()
    if (response.data.success && response.data.data) {
      Object.assign(processingProgress, response.data.data)

      // 更新进度显示
      if (processingProgress.status !== 'idle') {
        uploadProgress.value = processingProgress.progress
        // 直接从接口获取状态文本，增加更友好的状态显示
        const step = processingProgress.current_step || '处理中...'

        // 根据不同的处理状态提供更详细的提示
        uploadStatus.value = `🚀 ${step}`
      }

      // 如果处理完成或出错，停止轮询
      if (processingProgress.status === 'completed' || processingProgress.status === 'error') {
        if (progressTimer.value) {
          clearInterval(progressTimer.value)
          progressTimer.value = null
        }

        if (processingProgress.status === 'error') {
          throw new Error(processingProgress.error_message || '处理失败')
        }
      }
    }
    console.log('进度显示', uploadProgress.value)
  } catch (error) {
    console.error('获取进度失败:', error)
    if (progressTimer.value) {
      clearInterval(progressTimer.value)
      progressTimer.value = null
    }
  }
}

// 开始进度轮询
const startProgressPolling = () => {
  // 重置进度状态
  Object.assign(processingProgress, {
    status: 'idle',
    current_step: '',
    progress: 0,
    total_files: 0,
    processed_files: 0,
    current_file: '',
    error_message: ''
  })

  // 立即获取一次进度
  fetchProcessingProgress()

  // 开始轮询
  progressTimer.value = setInterval(() => {
    fetchProcessingProgress()
  }, 2000) // 每1秒查询一次
}

// 停止进度轮询
const stopProgressPolling = () => {
  if (progressTimer.value) {
    clearInterval(progressTimer.value)
    progressTimer.value = null
  }
}

// 自定义上传方法
const customUpload = async (options: any) => {
  const files = options.map((item: any) => item.raw)
  console.log('文件', files)

  // 开始进度轮询
  startProgressPolling()

  try {
    uploading.value = true
    // 创建FormData并添加文件
    const formData = new FormData()
    // 逐个添加文件到 FormData，添加索引避免覆盖
    files.forEach((file: File, index: number) => {
      formData.append(`file_${index}`, file)
    })

    // 调用上传API，传递formData
    const response = await uploadExcel(formData)

    // 停止轮询，因为后端处理已完成
    stopProgressPolling()

    uploadStatus.value = '处理完成！'
    uploadProgress.value = 100
    // 处理响应，下载文件
    if (response.data instanceof Blob) {
      // 生成带时间戳的文件名
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const fileName = `已添加地址信息_${year}-${month}-${day} ${hours}:${minutes}:${seconds}.zip`

      // 创建下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()

      // 清理
      link.remove()
      window.URL.revokeObjectURL(url)

      MessagePlugin.success('文件处理完成，已自动下载结果')

      // 显示成功对话框
      const tipDialog = DialogPlugin({
        header: '处理完成',
        theme: 'success',
        body: 'Excel文件处理完成，已自动下载处理结果文件。',
        confirmBtn: '确定',
        cancelBtn: null,
        onConfirm: () => {
          fileList.value = []
          uploadProgress.value = 0
          uploading.value = false
          tipDialog.destroy()
        },
        onClose: () => {
          fileList.value = []
          uploadProgress.value = 0
          uploading.value = false
          tipDialog.destroy()
        }
      })
    }
  } catch (error: any) {
    console.error('处理失败:', error)

    // 如果响应是blob但包含错误信息，尝试读取
    if (error.response && error.response.data instanceof Blob) {
      try {
        const errorText = await error.response.data.text()
        const errorData = JSON.parse(errorText)
        console.error('服务器错误详情:', errorData)
        MessagePlugin.error(errorData.error || '处理失败，请重试')
      } catch (parseError) {
        console.error('解析错误响应失败:', parseError)
        MessagePlugin.error('处理失败，请重试')
      }
    } else {
      MessagePlugin.error(error.message || '处理失败，请重试')
    }

    stopProgressPolling()
    uploading.value = false
    uploadProgress.value = 0
    uploadStatus.value = '处理失败'
    fileList.value = []
  }
}

// 检查服务状态
const checkServiceStatus = async () => {
  try {
    const response = await checkHealth()
    console.log('健康检查响应:', response.data)
    if (response.data.success && response.data.data.status === 'ok') {
      serviceStatus.value = 'ok'
    }
  } catch (error) {
    serviceStatus.value = 'error'
    console.error('服务状态检查失败:', error)
  }
}

// 检查数据源状态
const checkDataSourceStatusLocal = async () => {
  try {
    const response = await checkDataSourceStatus()
    console.log('数据源状态响应:', response.data)
    if (response.data.success && response.data.data) {
      Object.assign(dataSourceStatus, response.data.data)
    }
  } catch (error) {
    console.error('数据源状态检查失败:', error)
  }
}
const openFileSelect = (event: Event) => {
  const target = event.target as HTMLElement
  if (
    target &&
    uploadRef.value &&
    ['t-upload__flow-empty', 't-upload__flow-card-area'].includes(target.className)
  ) {
    ;(uploadRef.value as any).triggerUpload()
  }
}
// 组件挂载时检查状态
onMounted(() => {
  checkServiceStatus()
  checkDataSourceStatusLocal()
})

// 组件卸载时清理定时器
onUnmounted(() => {
  stopProgressPolling()
})
</script>

<style lang="scss" scoped>
.excel-upload-container {
  padding: 24px;
  max-width: 800px;

  margin: 0 auto;
  :deep(.t-upload__flow-table) {
    th {
      &:nth-child(2) {
        display: none;
      }
      &:nth-child(3) {
        display: none;
      }
    }
    td {
      &:nth-child(3) {
        display: none;
      }
      &:nth-child(2) {
        display: none;
      }
    }
  }
}
:deep(.t-card__title) {
  font-size: 20px;
}
:deep(.t-alert__content) {
  // margin-left: 0 !important;
}
.upload-card {
  margin-bottom: 50px;
  .status-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .upload-section {
    margin: 24px 0;
    cursor: pointer;
    :deep(.t-upload__flow-empty) {
      color: var(--td-brand-color);
    }
    :deep(.t-upload__flow) {
      width: 100% !important;
      min-width: 100px !important;
      max-width: none !important;
    }
    :deep(.t-upload__flow-card-area) {
      border: 1px dashed var(--td-brand-color) !important;
      cursor: pointer;

      transition: all 0.3s ease;
      &:hover {
        background-color: var(--td-bg-color-container-hover);
        border-color: var(--td-brand-color-hover) !important;
      }
    }
    .drag-content {
      text-align: center;
      // padding: 40px 20px;

      .t-icon {
        color: var(--td-brand-color);
        margin-bottom: 16px;
      }

      .upload-tips {
        color: var(--td-text-color-secondary);
        font-size: 12px;
        margin-top: 8px;
      }
    }

    .upload-progress {
      .progress-text {
        text-align: center;

        color: var(--td-text-color-secondary);
      }
    }
  }

  .info-section {
    margin-top: 24px;

    ol {
      margin: 8px 0 0 0;
      padding-left: 20px;

      li {
        margin-bottom: 4px;
        line-height: 1.5;
      }
    }
  }
}

@media (max-width: 768px) {
  .excel-upload-container {
    padding: 16px;
  }
}
</style>
