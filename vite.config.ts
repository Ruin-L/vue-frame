import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// ESM 中获取 __dirname 的替代方案
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        // 7566
        // target: 'http://192.168.39.120:7566',
        target: 'http://127.0.0.1:8066',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
        bypass: (req, res, options) => {
          // @ts-ignore
          const proxyURL = options.target + options.rewrite(req.url)
          // console.log('proxyURL', proxyURL)
          req.headers['x-req-proxyURL'] = proxyURL // 设置未生效
          // @ts-ignore
          res.setHeader('x-req-proxyURL', proxyURL) // 设置响应头可以看到
        }
      }
    }
  }
})
