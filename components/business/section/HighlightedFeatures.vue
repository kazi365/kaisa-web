<script setup lang="ts">
const props = defineProps<{
    gridsData?: { title: string, content: string }[]
}>()

const title = 'Our Highlighted Features'
const titleId = title.replace(/\s+/g, '-')
const gridsData = props.gridsData
</script>

<template>
    <section class="highlighted-features">
        <div class="container xl:max-w-screen-xl py-20 px-4 mx-auto">
            <h2 :id="titleId" class="mt-0 text-center text-3xl">{{ title }}</h2>
            <div class="flex flex-wrap justify-center gap-4">
                <div
                    v-for="(item, index) in gridsData"
                    :key="index"
                    class="grid-item"
                >
                    <p class="grid-title">{{ item.title }}</p>
                    <p class="grid-desc">{{ item.content }}</p>
                    <img class="grid-ball" src="~/assets/imgs/box_ball.png" alt="" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.highlighted-features {
    .grid-item {
        flex-basis: calc((1 / 3 * 100%) - 1rem);
        position: relative;
        padding: 1.5rem;
        border-radius: 0.25rem;
        line-height: 1.5;
        word-break: break-word;
        box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition:
            background-color var(--transi-d),
            transform var(--transi-d);
        .grid-title {
            margin-top: 0;
            font-size: 1.375rem;
            font-weight: bold;
        }
        .grid-desc {
            margin-bottom: 0;
        }
        .grid-ball {
            position: absolute;
            right: 0;
            bottom: 0;
            max-width: 50%;
            max-height: 50%;
        }
        &:hover {
            color: #ffffff;
            background-color: var(--color-theme);
            transform: translateY(-0.5rem);
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
