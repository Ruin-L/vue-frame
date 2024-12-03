import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'
import { pluginSass } from '@rsbuild/plugin-sass'
export default defineConfig({
  plugins: [pluginVue(), pluginSass()],
  html: {
    template: './index.html'
  },
  source: {
    entry: {
      index: './src/main.ts'
    },
    alias: {
      '@': './src'
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
