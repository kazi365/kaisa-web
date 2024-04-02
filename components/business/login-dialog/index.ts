import { createApp, nextTick } from 'vue'
import type { App } from 'vue'
import LoginDialog from './LoginDialog.vue'

const dialogMapStore = new Map<
    string, { app: App<Element>, instRef: InstanceType<typeof LoginDialog> }
>()

export const $loginDialog = {
    create() {
        const app = createApp(LoginDialog)
        const mountEl = document.createElement('div')
        document.body.appendChild(mountEl)
        const instRef = app.mount(mountEl) as InstanceType<typeof LoginDialog>
        dialogMapStore.set('login', { app, instRef })
        nextTick(() => {
            instRef.open()
        })
        return instRef;
    },
    unmount() {
        const dialog = dialogMapStore.get('login')
        if (!dialog) return;
        dialog.app.unmount()
        document.body.removeChild(dialog.app._container!)
        dialogMapStore.delete('login')
    },
}
