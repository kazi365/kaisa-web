<script setup lang="ts">
const infos = [
    { content: 'Pioneering innovation aligned with SGP.31' },
    { content: 'APIs to seamlessly fetch QR codes from MNO/MVNOs' },
    { content: 'Complete support with open source IPA, eSIM hardware, Docs and APIs' },
]
</script>

<template>
    <div class="introduction-eim">
        <div v-enterAnimation="{ duration: 1 }" class="relative z-1 container py-20 px-4 mx-auto invisible">
            <h2 class="mt-0 text-3xl">eIM</h2>
            <div class="grid md:grid-cols-2 items-center gap-y-4">
                <div class="card-content">
                    <p class="text-xl">Future-proof eSIM IoT Remote Management SaaS</p>
                    <ul class="pl-0 list-none">
                        <li v-for="(item, index) in infos" :key="index" class="mb-4 info-item">
                            <div class="i-app-list_correct info-list-style" />
                            <p class="info-content">{{ item.content }}</p>
                        </li>
                    </ul>
                    <slot name="content-append"></slot>
                </div>
                <div class="grid place-items-center">
                    <img class="card-pic" alt="" src="@/assets/imgs/production/eIm.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.introduction-eim {
    position: relative;
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
            color: var(--color-theme);
        }
        .info-content {
            overflow: hidden;
        }
    }
    .card-pic {
        width: 100%;
        max-width: 25rem;
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
