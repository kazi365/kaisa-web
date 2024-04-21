// https://quasar.dev/start/vite-plugin#introduction

import type { App } from 'vue'
import { Dialog, Notify, Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import 'quasar/src/css/index.sass'
import './quasar-reset.scss'

export function install(app: App) {
    app.use(Quasar, { plugins: { Dialog, Notify } })
}
