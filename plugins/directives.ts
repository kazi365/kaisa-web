import { install } from '@/src/directives/index'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(install)
})
