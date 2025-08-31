// import { fileURLToPath, URL } from 'url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import tailwindcss from '@tailwindcss/vite'
// import { configDefaults } from 'vitest/config'
//
// export default defineConfig({
//     plugins: [
//         vue(),
//         tailwindcss(),
//     ],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url))
//         }
//     },
//     test: {
//         environment: 'jsdom',
//         globals: true,
//         exclude: [...configDefaults.exclude, 'e2e/*'],
//         root: fileURLToPath(new URL('./', import.meta.url)),
//     }
// })


// vite.config.ts
// import { fileURLToPath, URL } from 'node:url'
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import tailwindcss from '@tailwindcss/vite'
// import { configDefaults } from 'vitest/config'
//
// export default defineConfig({
//     plugins: [
//         vue(),
//         tailwindcss(),
//     ],
//     css: {
//         preprocessorOptions: {
//             less: {
//                 modifyVars: {
//                     'primary-color': '#0077b6',
//                     'link-color': '#03045e',
//                     'success-color': '#a7c957',
//                     'warning-color': '#f4a261',
//                     'error-color': '#c1121f',
//                     'heading-color': 'rgba(0, 0, 0, 0.85)',
//                     'text-color': 'rgba(0, 0, 0, 0.65)',
//                     'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
//                     'border-color-base': '#d9d9d9',
//                     'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
//                 },
//                 javascriptEnabled: true,
//             },
//         },
//     },
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url))
//         }
//     },
//     test: {
//         environment: 'jsdom',
//         globals: true,
//         exclude: [...configDefaults.exclude, 'e2e/*'],
//         root: fileURLToPath(new URL('./', import.meta.url)),
//     }
// })


import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#0077b6',
                    'link-color': '#03045e',
                    'success-color': '#a7c957',
                    'warning-color': '#f4a261',
                    'error-color': '#c1121f',
                    'heading-color': 'rgba(0, 0, 0, 0.85)',
                    'text-color': 'rgba(0, 0, 0, 0.65)',
                    'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
                    'border-color-base': '#d9d9d9',
                    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
                },
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    test: {
        environment: 'jsdom',
        globals: true,
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
    }
})
