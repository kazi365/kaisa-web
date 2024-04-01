<script setup lang="ts">
const trustersData = [
    (await import('~/assets/imgs/brand/apple.jpg')).default,
    (await import('~/assets/imgs/brand/qualcomm.jpg')).default,
    (await import('~/assets/imgs/brand/quectel.jpg')).default,
    (await import('~/assets/imgs/brand/deutsche_telekom.jpg')).default,
    (await import('~/assets/imgs/brand/joytel.jpg')).default,
    (await import('~/assets/imgs/brand/mediatek.jpg')).default,
    (await import('~/assets/imgs/brand/oppo.jpg')).default,
    (await import('~/assets/imgs/brand/segway_ninebot.jpg')).default,
    (await import('~/assets/imgs/brand/myfirst.jpg')).default,
]
const listData = [...trustersData, ...trustersData]
</script>

<template>
    <section class="truster">
        <div class="container px-4 mx-auto">
            <h2 class="mt-0 text-3xl">Trusted By</h2>
            <div class="trusters__outer">
                <div class="flex gap-x-4 select-none trusters">
                    <img
                        v-for="item in listData"
                        :key="item"
                        class="truster-item"
                        alt=""
                        draggable="false"
                        :src="item"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.truster {
    .trusters__outer {
        position: relative;
        overflow-x: hidden;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            display: block;
            width: 10rem;
            height: 100%;
            background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0));
        }
        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            display: block;
            width: 10rem;
            height: 100%;
            background: linear-gradient(to left, #ffffff, rgba(255, 255, 255, 0));
        }
    }
    .trusters {
        animation: scroll-loop 27s linear infinite;
    }
    .truster-item {
        width: 10rem;
    }

    @keyframes scroll-loop {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(calc(-1 * (10rem * 9 + 1rem * 9)));
        }
    }
}
</style>
