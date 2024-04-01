<script setup lang="ts">
const infos = [
    {
        title: 'Single eSIM SKU for Global network',
        desc: 'Streamlined with a single eSIM SKU for global network access and management easily.',
    },
    {
        title: 'Multi CSP networks and Remote Switch',
        desc: 'To avoid being tied with one MVNO or MNO, we provide a remote platform to switch networks seamlessly.',
    },
    {
        title: 'IoT eSIM management and API support',
        desc: 'eSIM management includes profile downloading, enabling, disabling and switching, etc. This supports access to the existing IoT system through APIs.',
    },
]
</script>

<template>
    <section class="csps">
        <div class="container py-20 px-4 mx-auto">
            <h2 class="mt-0 text-3xl">Multiple Options for Global & Local CSPs</h2>
            <div v-enterAnimation="{ duration: 1 }" class="flex flex-wrap items-center gap-y-4 invisible">
                <ul class="basis-4\/7 <md:basis-full grid-infos">
                    <li v-for="(item, index) in infos" :key="index" class="content-info-item">
                        <div class="i-app-list_correct info-list-style" />
                        <div class="overflow-hidden">
                            <h3 class="info-title">{{ item.title }}</h3>
                            <p class="info-desc">{{ item.desc }}</p>
                        </div>
                    </li>
                </ul>
                <div class="basis-3\/7 <md:basis-full text-center">
                    <img class="grid-pic" alt="" src="@/assets/imgs/production/section.png" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.csps {
    background-color: var(--color-bg-dark);
    overflow: hidden;
    .animating {
        .grid-infos {
            animation: 1s ease 0s enter-left;
        }
        .grid-pic {
            animation: 1s ease 0s enter-right;
        }
    }
    .grid-infos {
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
            margin-bottom: 0.5rem;
            font-size: 1.375rem;
            font-weight: 500;
        }
        .info-desc {
            margin: 0;
            font-size: 1.125rem;
        }
    }
    .content-info-item + .content-info-item {
        margin-top: 2rem;
    }
    .grid-pic {
        width: 100%;
        max-width: 26rem;
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
</style>
