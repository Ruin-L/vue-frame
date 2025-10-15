/**
 * 版本检测服务
 * 定期检查应用版本并提示用户更新
 */

import { NotifyPlugin } from 'tdesign-vue-next'
import { h } from 'vue'

interface VersionInfo {
  version: string
  buildTime: string
  environment: string
}

let currentVersion: string | null = null
let checkInterval: number | null = null
let isUpdateNotificationShown = false

/**
 * 获取当前版本信息
 */
export const fetchVersionInfo = async (): Promise<VersionInfo> => {
  try {
    // 确保使用正确的路径访问version.json
    const response = await fetch(`/version.json?t=${new Date().getTime()}`)
    if (!response.ok) {
      throw new Error('无法获取版本信息')
    }
    return await response.json()
  } catch (error) {
    console.error('获取版本信息失败:', error)
    return {
      version: '0.0.0',
      buildTime: new Date().toISOString(),
      environment: 'unknown'
    }
  }
}

/**
 * 检查版本更新
 */
export const checkVersion = async (): Promise<boolean> => {
  try {
    const versionInfo = await fetchVersionInfo()

    // 首次加载，保存当前版本
    if (!currentVersion) {
      currentVersion = versionInfo.version
      return false
    }

    // 版本不一致，需要更新
    if (currentVersion !== versionInfo.version) {
      return true
    }

    return false
  } catch (error) {
    console.error('检查版本更新失败:', error)
    return false
  }
}

/**
 * 显示更新提示
 */
export const showUpdateNotification = () => {
  // 如果已经显示了更新提示，则不再重复显示
  if (isUpdateNotificationShown) {
    return
  }

  // 标记已显示更新提示
  isUpdateNotificationShown = true

  const notify = NotifyPlugin.warning({
    title: '有新的版本需要更新',
    content: '点击后将刷新页面获取最新版本！',
    footer: h('div', { class: 't-notification__detail' }, [
      h(
        't-button',
        {
          class: 't-notification__detail-item',
          theme: 'default',
          variant: 'text',
          onClick: () => window.location.reload()
        },
        '立即刷新'
      ),
      h(
        't-button',
        {
          class: 't-notification__detail-item',
          theme: 'primary',
          variant: 'text',
          onClick: () => {
            isUpdateNotificationShown = false
            NotifyPlugin.close(notify)
          }
        },
        '稍后提醒我'
      )
    ]),
    duration: 0
  })
}

/**
 * 启动版本检测服务
 * @param intervalTime 检测间隔时间(毫秒)，默认5分钟
 */
export const startVersionCheck = (intervalTime = 1000) => {
  // 重置通知标志
  isUpdateNotificationShown = false

  // 初始化获取当前版本
  fetchVersionInfo().then(info => {
    currentVersion = info.version
    console.log('当前应用版本:', currentVersion)
  })

  // 清除可能存在的旧定时器
  if (checkInterval) {
    window.clearInterval(checkInterval)
  }

  // 设置定期检查
  checkInterval = window.setInterval(async () => {
    const needUpdate = await checkVersion()
    if (needUpdate) {
      showUpdateNotification()
    }
  }, intervalTime)

  return () => {
    if (checkInterval) {
      window.clearInterval(checkInterval)
      checkInterval = null
    }
  }
}

/**
 * 停止版本检测服务
 */
export const stopVersionCheck = () => {
  if (checkInterval) {
    window.clearInterval(checkInterval)
    checkInterval = null
  }
  // 重置通知标志
  isUpdateNotificationShown = false
}
