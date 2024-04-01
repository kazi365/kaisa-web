import { defineConfig, presetIcons, presetUno } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            collections: {
                app: FileSystemIconLoader('./assets/icons'),
                mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
            },
            extraProperties: {
                'display': 'inline-block',
                'vertical-align': 'middle',
            },
        }),
    ],
})
