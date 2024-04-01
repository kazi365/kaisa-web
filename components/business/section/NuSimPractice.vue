<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const sectionData = {
    title: 'nuSIM: The best practice of iSIM  for Low-cost IoT',
    subTitle: 'Check out the first commercial-ready nuSIM module: BG95M3-nuSIM',
    pic: (await import('~/assets/imgs/production/partner.png')).default,
    infoTitle: 'What we offer',
    infos: [
        { title: 'NuSIM OS' },
        { title: 'Open source LA (Loader Application) and community support' },
        { title: 'Integration with nuSIM supported MNO' },
    ],
}

const toNuSim = () => {
    window.open(runtimeConfig.public.NUXT_NUSIM_URL)
}
</script>

<template>
    <section class="nusim">
        <div class="container py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">nuSIM: The best practice of iSIM  for Low-cost IoT</h2>
            <p class="text-center">
                <NuxtLink to="/developer/hardware">Check out the first commercial-ready nuSIM module: BG95M3-nuSIM</NuxtLink>
            </p>
            <div v-enterAnimation="{ duration: 1 }" class="flex flex-wrap items-center gap-y-4 invisible">
                <div class="basis-4\/7 <md:basis-full grid-content">
                    <p class="mt-0 text-2xl font-medium">{{ sectionData.infoTitle }}</p>
                    <ul class="content-infos">
                        <li
                            v-for="(item, index) in sectionData.infos"
                            :key="index"
                            class="content-info-item"
                        >
                            <div class="i-app-list_correct info-list-style" />
                            <div class="overflow-hidden">
                                <p class="info-title">{{ item.title }}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="mt-8 learn-more__outer">
                        <button class="btn btn-outline-primary" @click="toNuSim">
                            <span class="align-middle">Learn more about nuSIM</span>
                            <div class="i-mdi-arrow-right ml-2" />
                        </button>
                    </div>
                </div>
                <div class="basis-3\/7 <md:basis-full text-center">
                    <img class="grid-pic" :src="sectionData.pic" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.nusim {
    background-image: url("~/assets/imgs/production/client_bg.png");
    background-position: center;
    background-size: cover;
    overflow: hidden;
    .animating {
        .grid-content {
            animation: 1s ease 0s enter-left;
        }
        .grid-pic {
            animation: 1s ease 0s enter-right;
        }
    }
    .content-infos {
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        line-height: 1.5;
        list-style: none;
    }
    .content-info-item {
        .info-list-style {
            float: left;
            margin-top: 0.25em;
            margin-right: 1rem;
            margin-bottom: 0.25em;
            font-size: 1.375rem;
            color: var(--color-theme);
        }
        .info-title {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 1.375rem;
            font-weight: 500;
        }
    }
    .content-info-item + .content-info-item {
        margin-top: 2rem;
    }
    .grid-pic {
        width: 100%;
        max-width: 31.5rem;
    }

    @keyframes enter-left {
        from {
            opacity: 0;
            transform: translateX(-100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes enter-right {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
}

@media (max-width: $--container-sm) {
    .nusim {
        .section-content .col {
            flex-basis: 100% !important;
        }
        .learn-more__outer {
            text-align: center;
        }
    }
}
</style>
