import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import importToCDN from 'vite-plugin-cdn-import'// import by CDN (only import needed)
import * as fs from 'fs'

const TRUE = 'true' // 常量

export default ({ mode, command }) => {
  const ENV = loadEnv(mode, process.cwd()) // load (dev || prod) .env
  // load global scss
  const scssResources = []  
  fs.readdirSync(`src/assets/scss`).map(file => {
    if (fs.statSync(`src/assets/scss/${file}`).isFile()) {
      scssResources.push(`@import 'src/assets/scss/${file}';`)
    }
  })
  // vite config
  return defineConfig({
    base: './',
    plugins: [
      vue(),
      importToCDN({
        modules: [
          {
            path: 'https://unpkg.com/element-plus',
            css: 'https://unpkg.com/element-plus/dist/index.css',
            name: 'element-plus',
            var: 'ElementPlus'
          }
        ],
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, resolve('src'))
      }
    },
    server: {
      open: true,
      proxy: {
        '/proxy': {
          target: ENV.VITE_BASE_URL,
          changeOrigin: command === 'serve' && ENV.VITE_OPEN_PROXY == TRUE, // is cross proxy,
          rewrite: (path) => path.replace(/\/proxy/, '')
        }
      }
    },
    build: {
      outDir: mode === 'production' ? 'dist' : `dist-${mode}`,
      sourcemap: ENV.VITE_BUILD_SOURCEMAP == TRUE,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: ENV.VITE_BUILD_DROP_CONSOLE == TRUE, // disable console in prod.env
          drop_debugger: ENV.VITE_BUILD_DROP_DEBUGGER == TRUE, // disable debug in prod.env
        }
      }
    },
    css: {
      // preload scss
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join('')
        }
      }
    }
  })
}
