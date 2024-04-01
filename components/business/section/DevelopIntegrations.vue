<script setup lang="ts">
import page_seo from "@/assets/json/page_seo.json";

const runtimeConfig = useRuntimeConfig()
const router = useRouter()

useHead({
    meta: [
        { name: 'keywords', content: page_seo.developer.keywords },
    ],
    title: page_seo.developer.title,
})

const nuSimGridsData = [
    {
        title: 'Hardware',
        desc: 'Include the nuSIM  module.',
        disable: false,
        handleLabel: 'Buy hardware',
        handler: () => toHardware(),
    },
    {
        title: 'Open source SDK',
        desc: 'This open source software/library can help manufacturers and profile provisioning vendors to integrate SDK into IoT firmware rapidly.',
        disable: true,
        handleLabel: 'Coming soon...',
        handler: () => {},
    },
]
const eSimGridsData = [
    {
        title: 'Hardware',
        desc: 'eSIM card reader and eSIM development boards.',
        disable: false,
        handleLabel: 'Buy hardware',
        handler: () => toHardware(),
    },
    {
        title: 'Open source SDK',
        desc: 'This open source software/library can help manufacturers and profile provisioning vendors to integrate SDK into IoT firmware rapidly.',
        disable: true,
        handleLabel: 'Coming soon...',
        handler: () => {},
    },
    {
        title: 'API Docs',
        desc: 'Developer friendly eSIM APIs for your secondary IoT development scenarios.',
        handleLabel: 'Visit API docs',
        handler: () => {
            window.open(runtimeConfig.public.NUXT_SIMLESSLY_DOC_URL)
        },
    },
]

const toHardware = () => {
    router.push({ path: '/developer/hardware' })
}
</script>

<template>
    <section class="develop-integrations">
        <div class="container px-4 mx-auto">
            <!-- <h2 class="section-title">{{ sectionData.title }}</h2> -->
            <div class="section-content">
                <div>
                    <h2 class="mt-0 mb-8 text-center font-light">nuSIM</h2>
                    <div class="nusim-grids">
                        <div
                            v-for="(item, index) in nuSimGridsData"
                            :key="index"
                            class="grid-item"
                        >
                            <h3 class="grid-title">{{ item.title }}</h3>
                            <p class="grid-desc">{{ item.desc }}</p>
                            <p class="mt-0">
                                <button
                                    v-if="!item.disable"
                                    class="btn btn-outline-primary rounded-3xl"
                                    @click="item.handler"
                                >{{ item.handleLabel }}</button>
                                <span v-else class="rt-color-theme">Coming soon…</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="my-8 text-center font-light">eSIM</h2>
                    <div class="esim-grids">
                        <div
                            v-for="(item, index) in eSimGridsData"
                            :key="index"
                            class="grid-item"
                        >
                            <h3 class="grid-title">{{ item.title }}</h3>
                            <p class="grid-desc">{{ item.desc }}</p>
                            <p class="mt-0">
                                <button
                                    v-if="!item.disable"
                                    class="btn btn-outline-primary rounded-3xl"
                                    @click="item.handler"
                                >{{ item.handleLabel }}</button>
                                <span v-else class="rt-color-theme">Coming soon…</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.develop-integrations {
    padding-top: 2rem;
    padding-bottom: 2rem;
    .section-title {
        margin-top: 0;
        margin-bottom: 2rem;
        text-align: center;
    }
    // .section-content {}
    .nusim-grids,
    .esim-grids {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem 2%;
        margin-right: auto;
        margin-left: auto;
    }
    .grid-item {
        flex-basis: 30%;
        position: relative;
        display: grid;
        grid-template-rows: auto 1fr auto;
        padding: 1rem;
        border-radius: 0.25rem;
        line-height: 1.5;
        word-break: break-word;
        background-image: url("~/assets/imgs/solutions/sol_bg.png");
        background-position: right bottom;
        background-size: cover;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.25s ease;
        .grid-title {
            margin-top: 0;
            font-size: 1.5em;
        }
        .grid-desc {
            margin-top: 0;
            font-size: 0.875rem;
            color: var(--color-text-light);
        }
        &:hover {
            transform: translateY(-0.5rem);
        }
    }
}

@media (max-width: $--container-sm) {
    .develop-integrations {
        .grid-item {
            flex-basis: 100%;
        }
    }
}
</style>
