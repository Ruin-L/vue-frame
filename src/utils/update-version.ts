/**
 * 更新版本信息脚本
 * 在构建过程中自动更新 version.json 文件
 */
import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 版本信息
const now = new Date()
const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
  2,
  '0'
)}-${String(now.getDate()).padStart(2, '0')}`
const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
  2,
  '0'
)}:${String(now.getSeconds()).padStart(2, '0')}`

interface VersionInfo {
  version: string
  buildTime: string
  environment: string
}

// 不再需要检查构建序号，直接使用时间戳作为版本号
try {
  if (fs.existsSync(path.resolve(__dirname, '../../public/version.json'))) {
    const currentVersionInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../public/version.json'), 'utf8'))
    console.log(`当前版本: ${currentVersionInfo.version}, 更新为时间格式版本`)
  }
} catch (error) {
  console.error('读取当前版本信息失败', error)
}

// 设置版本格式为 YYYY-MM-DD HH:MM:SS
const versionFormat = `${dateStr} ${timeStr}`

const versionInfo: VersionInfo = {
  version: versionFormat,
  buildTime: now.toISOString(),
  environment: process.env.NODE_ENV || 'production'
}

// 版本文件路径
// 确保路径正确解析到 pc-front/public/version.json
const versionFilePath = path.resolve(__dirname, '../../public/version.json')

// 写入版本信息
fs.writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2), 'utf8')

console.log(`版本信息已更新: ${JSON.stringify(versionInfo)}`)
console.log(`当前版本时间戳: ${versionFormat}`)
