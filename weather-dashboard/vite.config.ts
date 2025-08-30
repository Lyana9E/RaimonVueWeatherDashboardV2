// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import tailwindcss from '@tailwindcss/vite'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//       vue(),
//     tailwindcss(),
//   ],
// })



import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

// این فایل پیکربندی برای Vite و Vitest است.
// این پیکربندی Vitest را به استفاده از محیط JSDOM مجبور می‌کند که
// برای تست کامپوننت‌های Vue.js ضروری است.
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // اضافه کردن پیکربندی Vitest
    test: {
        // استفاده از JSDOM برای شبیه‌سازی محیط مرورگر
        environment: 'jsdom',
        // فعال کردن APIهای سراسری مانند `describe`, `it`, `expect`
        globals: true,
        // الگوهای فایل‌هایی که باید از تست خارج شوند
        exclude: [...configDefaults.exclude, 'e2e/*'],
        // مسیر ریشه برای اجرای تست‌ها
        root: fileURLToPath(new URL('./', import.meta.url)),
    }
})
