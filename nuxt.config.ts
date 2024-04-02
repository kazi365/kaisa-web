import { loadEnv } from 'vite'
import { resolve } from 'path'

const command = process.env.npm_lifecycle_script ?? ''
const envMode = /(?<=--dotenv\s\.env\.)(\w+)/.exec(command)?.[0] ?? process.env.NODE_ENV
const envVars = loadEnv(envMode!, process.cwd(), 'NUXT_')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        '@web-piece/cookier': 'web-piece/packages/cookier/lib',
        '~bootstrap': resolve(process.cwd(), 'node_modules/bootstrap'),
        '~types': resolve(process.cwd(), 'src/types'),
        '~utils': resolve(process.cwd(), 'src/utils'),
    },
    app: {
        baseURL: envVars.NUXT_APP_BASE_PATH || '/',
        head: {
            script: [
                {
                    async: true,
                    defer: true,
                    id: 'hs-script-loader',
                    src: '//js.hs-scripts.com/43559250.js',
                    type: 'text/javascript',
                },
            ],
        },
        rootId: '__simlessly',
    },
    appConfig: {},
    css: ['assets/css/index.scss'],
    modules: [
        '@nuxtjs/algolia',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        'nuxt-quasar-ui',
        'nuxt-icons',
    ],
    nitro: {
        output: {
            publicDir: '../dist',
        },
    },
    runtimeConfig: {
        public: envVars,
    },
    sourcemap: false,
    quasar: {
        plugins: ['Notify'],
    },
})
