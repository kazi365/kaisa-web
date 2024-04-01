<script setup lang="ts">
const infos = [
    { title: 'GSMA certified iSIM OS' },
    { title: 'Bootstrap Connectivity' },
    { title: 'Remote provisioning of EID and Certificate' },
]
</script>

<template>
    <section class="isim-capabilities">
        <div class="container py-20 px-4 mx-auto">
            <h2 class="mt-0 text-3xl">View our iSIM capabilities</h2>
            <div v-enterAnimation="{ duration: 1 }" class="flex flex-wrap items-center gap-y-4 invisible">
                <ul class="basis-4\/7 <md:basis-full grid-infos">
                    <li v-for="(item, index) in infos" :key="index" class="content-info-item">
                        <div class="i-app-list_correct info-list-style" />
                        <div class="overflow-hidden">
                            <p class="info-title">{{ item.title }}</p>
                        </div>
                    </li>
                </ul>
                <div class="basis-3\/7 <md:basis-full text-center">
                    <img class="grid-pic" alt="" src="@/assets/imgs/production/capabilities.png" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.isim-capabilities {
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
</style>
