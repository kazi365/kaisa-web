<script setup lang="ts">
const gridsData = [
    {
        icon: 'space',
        title: 'More Compact Design',
        content: 'Reducing footprints enables manufacturers to create smaller and more compact IoT devices.',
    },
    {
        icon: 'environment',
        title: 'Environmental Sustainability',
        content: 'The elimination of physical SlM production reduces plastic waste and negates the logistics involved.',
    },
    {
        icon: 'tco',
        title: 'Less TCO',
        content: 'Save up to 13% on the total cost of connectivity ownership when using iSIM in IoT.',
    },
    {
        icon: 'battery',
        title: 'Long Battery Life',
        content: '90% lower power consumption compared to any other SIM form factor.',
    },
    {
        icon: 'secure',
        title: 'More Secure',
        content: 'SIM integration reduces the risk of theft and creates a barrier to unauthorized access.',
    },
]
</script>

<template>
    <section class="benefits">
        <div class="container xl:max-w-screen-xl py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">Your benefits</h2>
            <div class="flex flex-wrap justify-center gap-4">
                <div
                    v-for="(item, index) in gridsData"
                    :key="index"
                    class="grid-item"
                >
                    <nuxt-icon class="grid-icon" :name="item.icon" />
                    <p class="grid-title">{{ item.title }}</p>
                    <p class="grid-desc">{{ item.content }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.benefits {
    background-color: var(--color-bg-dark);
    .grid-item {
        flex-basis: calc((1 / 3 * 100%) - 1rem);
        position: relative;
        padding: 1.5rem;
        border-radius: 0.25rem;
        line-height: 1.5;
        background-color: var(--color-bg);
        box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition:
            background-color var(--transi-d),
            transform var(--transi-d);
        .grid-icon {
            font-size: 3rem;
            color: var(--color-theme);
        }
        .grid-title {
            margin-top: 0;
            font-size: 1.375rem;
            font-weight: bold;
        }
        .grid-desc {
            margin-bottom: 0;
        }
        &:hover {
            color: #ffffff;
            background-color: var(--color-theme);
            transform: translateY(-0.5rem);
            .grid-icon {
                color: #ffffff;
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
