<script setup lang="ts">
const infos = [
    { content: 'Zero or low CapEx' },
    { content: 'Flexible On-demand business model' },
    { content: 'Complete iSIM enablement infrastructure for an end-to-end solution' },
]
</script>

<template>
    <div class="introduction-isim">
        <div v-enterAnimation="{ duration: 1 }" class="relative z-1 container py-20 px-4 mx-auto invisible">
            <h2 class="mt-0 text-3xl">iSIM</h2>
            <div class="grid md:grid-cols-2 items-center gap-y-4">
                <div class="card-content">
                    <p class="text-xl">Launch the ultimate SIM solution while scaling profits and not costs</p>
                    <ul class="pl-0 list-none">
                        <li v-for="(item, index) in infos" :key="index" class="mb-4 info-item">
                            <div class="i-app-list_correct info-list-style" />
                            <p class="info-content">{{ item.content }}</p>
                        </li>
                    </ul>
                    <slot name="content-append"></slot>
                </div>
                <div class="grid place-items-center">
                    <div class="i-app-introduction-isim card-pic" style="width: 28.5rem; height: 11.5rem;" />
                    <!-- <img class="card-pic" alt="" src="@/assets/imgs/production/iSim.png" /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.introduction-isim {
    position: relative;
    color: #ffffff;
    background: linear-gradient(to bottom, $--color-theme, rgba($--color-theme, 0.4));
    .animating {
        .card-content {
            animation: 1s ease 0s enter-left;
        }
        .card-pic {
            animation: 1s ease 0s enter-right;
        }
    }
    .info-item {
        font-size: 1.125rem;
        .info-list-style {
            float: left;
            width: 1.15em;
            height: 1.15em;
            margin-right: 1rem;
        }
        .info-content {
            overflow: hidden;
        }
    }
    .card-pic {
        max-width: 100%;
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
