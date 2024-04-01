<script setup lang="ts">
import { $contactDialog } from '@/components/business/login-dialog/index'

const router = useRouter()

const sectionData = {
    title: '',
}

const nuSimGridsData = [
    {
        title: 'BG95M3LATEA-nuSIM',
        price: 56,
        pic: (await import('~/assets/imgs/hardware/bg93.jpg')).default,
        handler: () => buy(),
    },
    {
        title: 'nuSIM development set (UMTS&LTEEVB-KIT +BG95M3LATEA-nuSIM)',
        price: 200,
        pic: (await import('~/assets/imgs/hardware/boards.jpg')).default,
        handler: () => buy(),
    },
    {
        title: 'eSIM Chip',
        price: 2,
        pic: (await import('~/assets/imgs/hardware/chip.jpg')).default,
        handler: () => buy(),
    },
    {
        title: 'eSIM card reader',
        price: 42,
        pic: (await import('~/assets/imgs/hardware/reader.jpg')).default,
        handler: () => buy(),
    },
    {
        title: 'MFF2 ZIF M2M SIM card eUICC to FPC adapter',
        price: 120,
        pic: (await import('~/assets/imgs/hardware/adapter.jpg')).default,
        handler: () => buy(),
    },
]
// const eSimGridsData = [
//     {
//         title: 'eSIM Chip',
//         price: 2,
//         pic: (await import('~/assets/imgs/solutions/sc_gxdc.png')).default,
//         handler: () => buy(),
//     },
//     {
//         title: 'eSIM card reader',
//         price: 15,
//         pic: (await import('~/assets/imgs/solutions/sc_gxdc.png')).default,
//         handler: () => {},
//     },
//     {
//         title: 'Quectel development boards',
//         price: 15,
//         pic: (await import('~/assets/imgs/solutions/sc_gxdc.png')).default,
//         handler: () => {},
//     },
// ]

const buy = () => {
    $contactDialog.create()
}
</script>

<template>
    <section class="develop-hardware">
        <div class="container px-4 mx-auto">
            <!-- <h2 class="section-title">{{ sectionData.title }}</h2> -->
            <div class="section-content">
                <div>
                    <!-- <h2 class="mt-0 mb-8 text-center font-light">nuSIM Hardware</h2> -->
                    <div class="nusim-grids">
                        <div
                            v-for="(item, index) in nuSimGridsData"
                            :key="index"
                            class="grid-item"
                        >
                            <img class="w-full" :src="item.pic" alt="" />
                            <div class="px-4 text-center">
                                <p class="grid-title">{{ item.title }}</p>
                                <p class="font-light rt-color-text-light">
                                    $
                                    {{ item.price }}
                                    / pcs
                                </p>
                                <p>
                                    <button
                                        class="btn btn-outline-primary px-8 rounded-3xl"
                                        @click="item.handler"
                                    >Buy</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div>
                    <h2 class="my-8 text-center font-light">eSIM Hardware</h2>
                    <div class="esim-grids">
                        <div
                            v-for="(item, index) in eSimGridsData"
                            :key="index"
                            class="grid-item"
                        >
                            <img class="w-full" :src="item.pic" alt="" />
                            <div class="px-4 text-center">
                                <h3 class="grid-title">{{ item.title }}</h3>
                                <p class="font-light rt-color-text-light">
                                    $
                                    {{ item.price }}
                                    / pcs
                                </p>
                                <p>
                                    <button
                                        class="btn btn-outline-primary px-8 rounded-3xl"
                                        @click="item.handler"
                                    >Buy</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.develop-hardware {
    padding-top: 2rem;
    padding-bottom: 2rem;
    .section-title {
        margin-top: 0;
        margin-bottom: 2rem;
        text-align: center;
        font-weight: 500;
    }
    .section-content {}
    .nusim-grids,
    .esim-grids {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem 1%;
        max-width: $--container-lg;
        margin-right: auto;
        margin-left: auto;
        .grid-item:last-child {
            img {
                border: 1px solid #eeeeee;
            }
        }
    }
    .grid-item {
        flex-basis: calc((1 / 3 * 100%) - 1%);
        position: relative;
        border-radius: 0.25rem;
        line-height: 1.5;
        word-break: break-word;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.25s ease;
        .grid-title {
            font-weight: 500;
        }
        &:hover {
            transform: translateY(-0.5rem);
        }
    }
}

@media (max-width: $--container-sm) {
    .develop-hardware {
        .grid-item {
            flex-basis: min(20rem, 100%);
        }
    }
}
</style>
