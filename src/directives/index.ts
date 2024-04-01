import type { App, Directive } from 'vue'
import { enterAnimation } from './enter-animation/index'

export function install(app: App, options?: any) {
    const directives: Record<string, Directive> = {
        enterAnimation
    }
    for (const k of Object.keys(directives)) {
        app.directive(k ,directives[k])
    }
}
