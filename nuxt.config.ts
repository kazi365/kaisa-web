import { loadEnv } from 'vite'
import { resolve } from 'path'

const command = process.env.npm_lifecycle_script ?? ''
const envMode = /(?<=--dotenv\s\.env\.)(\w+)/.exec(command)?.[0] ?? process.env.NODE_ENV
const envVars = loadEnv(envMode!, process.cwd(), 'NUXT_')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        '~bootstrap': resolve(process.cwd(), 'node_modules/bootstrap'),
        '~types': resolve(process.cwd(), 'src/types'),
        '~utils': resolve(process.cwd(), 'src/utils'),
    },
    app: {
        baseURL: envVars.NUXT_APP_BASE_PATH || '/',
    },
    appConfig: {},
    css: ['assets/css/index.scss'],
    modules: [
        '@unocss/nuxt',
        '@vueuse/nuxt',
        'nuxt-icons',
        'nuxt-quasar-ui',
        '@pinia/nuxt',
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
        extras: {
            fontIcons: ['material-icons', 'material-icons-outlined'],
        },
    },
})
