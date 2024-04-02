<script setup lang="ts">
const props = defineProps<{
    gridsData?: { pic: any, title: string, content: string }[]
}>()

const gridsData = props.gridsData
</script>

<template>
    <section class="use-cases">
        <div class="container xl:max-w-screen-xl py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">Use Cases</h2>
            <div class="mt-12 grid-cards">
                <div
                        v-for="(item, index) in gridsData"
                        :key="index"
                        class="grid-item"
                        :style="{ 'background-image': `url(${item.pic})` }"
                >
                    <div class="grid-mask" />
                    <div class="relative">
                        <p class="grid-title">{{ item.title }}</p>
                        <p>{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.use-cases {
    background-color: var(--color-bg-dark);
    .grid-cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem 1rem;
    }
    .grid-item {
        flex-basis: calc((1 / 3 * 100%) - 1rem);
        position: relative;
        padding: 1.5rem;
        border-radius: 0.25rem;
        line-height: 1.5;
        word-break: break-word;
        color: #ffffff;
        background-position: right bottom;
        background-size: cover;
        box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.25s ease;
        .grid-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            transition: background-color var(--transi-d);
        }
        .grid-title {
            text-align: center;
            font-size: 1.375rem;
            font-weight: bold;
        }
        &:hover {
            transform: translateY(-0.5rem);
            .grid-mask {
                background-color: rgba($--color-theme, 0.75);
            }
        }
    }

    @media screen and (max-width: $--container-md) {
        .grid-item {
            flex-basis: calc((1 / 2 * 100%) - 1rem);
        }
    }

    @media screen and (max-width: $--container-sm) {
        .grid-item {
            flex-basis: 100%;
        }
    }
}
</style>
