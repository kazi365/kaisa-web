import type { App } from 'vue'
import { createApp } from 'vue'
import { systemName } from '@/src/system.config.json'
import CookiesPolicy from './CookiesPolicy.vue'
import PreferencesSetting from './PreferencesSetting.vue'

type TCookiesPolicy = InstanceType<typeof CookiesPolicy>
type TPreferencesSetting = InstanceType<typeof PreferencesSetting>

const instMapStore = new Map<
    'cookiesPolicy' | 'preferencesSetting', { app: App<Element>, inst: TCookiesPolicy | TPreferencesSetting }
>()

export const COOKIES_CONSENT_KEY = `${systemName}_privacy_consent`

export const $privacyConsent = {
    createCookiesPolicy() {
        this.unmountCookiesPolicy()
        const app = createApp(CookiesPolicy)
        const router = useRouter()
        app.use(router)
        const mountEl = document.createElement('div')
        document.body.appendChild(mountEl)
        const inst = app.mount(mountEl) as TCookiesPolicy
        const state = { app, inst }
        instMapStore.set('cookiesPolicy', state)
        return state;
    },
    unmountCookiesPolicy() {
        const state = instMapStore.get('cookiesPolicy')
        if (!state) return;
        state.app.unmount()
        document.body.removeChild(state.app._container!)
        instMapStore.delete('cookiesPolicy')
    },
    createPreferencesSetting() {
        this.unmountPreferencesSetting()
        const app = createApp(PreferencesSetting)
        const router = useRouter()
        app.use(router)
        const mountEl = document.createElement('div')
        document.body.appendChild(mountEl)
        const inst = app.mount(mountEl) as TPreferencesSetting
        const state = { app, inst }
        instMapStore.set('preferencesSetting', state)
        return state;
    },
    unmountPreferencesSetting() {
        const state = instMapStore.get('preferencesSetting')
        if (!state) return;
        state.app.unmount()
        document.body.removeChild(state.app._container!)
        instMapStore.delete('preferencesSetting')
    },
}
