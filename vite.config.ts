import path, { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    visualizer({ open: false }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: '', // 设置请求地址
        changeOrigin: true, // 是否跨域
        rewrite: path => path.replace(/^\/api/, ''), // 重写地址
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'), // 指定输出路径
    chunkSizeWarningLimit: 1500,
    sourcemap: false, // 是否生成 source map
    emptyOutDir: true, // Vite 会在构建时清空该目录
    // 打包时清楚console和debugger
    terserOptions: {
      compress: {
        keep_infinity: true, // 保留 Infinity
        drop_console: true, // 删除 console
        drop_debugger: true, // 删除 debugger
      },
    },
    rollupOptions: {
      output: {
        compact: true, // 压缩代码，删除换行符等
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 静态文件输出的文件夹名称
        chunkFileNames: 'js/[name]-[hash].js', // chunk包输出的文件夹名称
        entryFileNames: 'js/[name]-[hash].js', // 入口文件输出的文件夹名称
      },
    },
  },
})
