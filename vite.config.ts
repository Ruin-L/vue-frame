import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'
// ESM 中获取 __dirname 的替代方案
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // 是否本地localhost调试pwa
      },

      workbox: {
        // 设置需要缓存的文件类型
        globPatterns: ['**/*.{js,css,html,svg,jpg,ico}']
      },
      manifest: {
        name: 'Excel处理工具',
        short_name: '处理工具',
        theme_color: '#fff', // 浏览器状态栏主题
        start_url: './',
        display: 'standalone',
        background_color: '#fff',
        icons: [
          {
            src: 'logo.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 6677,
    open: true,
    proxy: {
      '/api': {
        target: 'http://10.2.0.32:5000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
        bypass: (req, res, options) => {
          const proxyURL = options.target + options.rewrite(req.url)
          // console.log('proxyURL', proxyURL)
          req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
          res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
        }
      }
    }
  }
})
