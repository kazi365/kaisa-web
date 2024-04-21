import { createApp, nextTick } from 'vue'
import type { App } from 'vue'
import RegisterDialog from './RegisterDialog.vue'

const dialogMapStore = new Map<
    string, { app: App<Element>, instRef: InstanceType<typeof RegisterDialog> }
>()

export const $registerDialog = {
    create() {
        const app = createApp(RegisterDialog)
        const mountEl = document.createElement('div')
        document.body.appendChild(mountEl)
        const instRef = app.mount(mountEl) as InstanceType<typeof RegisterDialog>
        dialogMapStore.set('register', { app, instRef })
        nextTick(() => {
            instRef.open()
        })
        return instRef;
    },
    unmount() {
        const dialog = dialogMapStore.get('register')
        if (!dialog) return;
        dialog.app.unmount()
        document.body.removeChild(dialog.app._container!)
        dialogMapStore.delete('register')
    },
}
