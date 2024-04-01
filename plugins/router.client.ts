import { useCodeTracking } from '@/composables/use-code-tracking/useCodeTracking'
import { systemName } from '@/src/system.config.json'

export default defineNuxtPlugin(nuxtApp => {
    const router = useRouter()
    const { trackPageView, trackPath } = useCodeTracking()

    router.beforeEach(to => {
        trackPath(to.fullPath)
    })

    router.afterEach(to => {
        if (!document.title) {
            const { path, name } = to
            let documentTitle = systemName
            path !== '/' && (documentTitle = `${name?.toString()} - ${documentTitle}`);
            document.title = documentTitle
        }
        trackPageView()
    })
})
