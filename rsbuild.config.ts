import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginSass } from '@rsbuild/plugin-sass'
const path = require('path')
export default defineConfig({
  plugins: [pluginVue(), pluginSass()],
  html: {
    template: './index.html'
  },
  // 设置mode

  source: {
    entry: {
      index: './src/main.ts'
    },
    define: {
      'process.env.VUE_APP_BASE_API': JSON.stringify(
        process.env.VUE_APP_BASE_API
      )
    },
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  server: {
    proxy: {
      '/api': 'http://10.0.0.93:3000'
    }
  },

  environments: {
    web: {
      source: {
        define: {
          'import.meta.env.SSR': JSON.stringify(false)
        }
      }
    },
    node: {
      source: {
        define: {
          'import.meta.env.SSR': JSON.stringify(true)
        }
      },
      output: {
        target: 'node'
      }
    }
  }
})
