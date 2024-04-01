import type { App } from 'vue'
import { createApp, nextTick } from 'vue'
import IndexSearch from './IndexSearch.vue'

type TIndexSearch = InstanceType<typeof IndexSearch>

let instMapStore = new Map<
    'indexSearch', { app: App<Element>, inst: TIndexSearch }
>()

export const $indexSearch = {
    create() {
        const app = createApp(IndexSearch)
        const mountEl = document.createElement('div')
        document.body.appendChild(mountEl)
        const inst = app.mount(mountEl) as TIndexSearch
        const state = { app, inst }
        instMapStore.set('indexSearch', state)
        return state;
    },
    unmount() {
        const state = instMapStore.get('indexSearch')
        if (!state) return;
        state.app.unmount()
        document.body.removeChild(state.app._container!)
        instMapStore.delete('indexSearch')
    },
}
