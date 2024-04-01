<script lang="ts" setup>
const { push } = useRouter()

const data = [
    {
        name: 'Hongwu Lu',
        position: 'CTO',
        avatar: (await import('~/assets/imgs/customer/joytel.png')).default,
        content: 'Simlessly is not only a RSP (SM-DP+) Platform provider, but it is also a reliable partner. They back their customers to achieve a successful business plan and are always present to help their customers to remove all barriers on their way to deploying eSIM seamlessly.',
        path: '/resource/joytel',
    },
    {
        name: 'Terry',
        position: 'Technical Director',
        avatar: (await import('~/assets/imgs/customer/tsim.png')).default,
        content: 'We have experienced a remarkable journey with Simlessly and their RSP-as-a-Service. Our partnership has been nothing short of extraordinary, as we have found a true win-win collaboration. Together, we have achieved outstanding growth and success, constantly propelling each other forward. The impeccable support and innovative solutions provided by Simlesly have undoubtedly played a significant role in our shared accomplishments. We look forward to continuing this fruitful partnership and reaching even greater heights together.',
        path: '/resource/tsim',
    },
]

const toResource = (card: typeof data[number]) => {
    push(card.path)
}
</script>

<template>
    <section class="rsp-testimonials">
        <div class="container py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">Testimonials</h2>
            <ul class="flex flex-wrap justify-center gap-4 pl-0 my-0">
                <li
                    v-for="(item, index) in data"
                    :key="index"
                    class="grid-card-item"
                    @click="toResource(item)"
                >
                    <p class="card-content">{{ item.content }}</p>
                    <div class="flex items-center">
                        <img class="card-avatar" alt="" :src="item.avatar" />
                        <div>
                            <div class="card-name">{{ item.name }}</div>
                            <span class="card-position">{{ item.position }}</span>
                        </div>
                    </div>
                    <a class="mt-4 text-sm">
                        <span class="align-middle">Read More</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.rsp-testimonials {
    .grid-card-item {
        flex-basis: calc((1 / 3 * 100%) - 1rem);
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        border-radius: 0.25rem;
        line-height: 1.5;
        background-color: var(--color-bg-dark);
        box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform var(--transi-d);
        .card-content {
            flex: 1;
            min-height: 0;
            margin-block-start: 0;
            font-size: 0.875rem;
            color: var(--color-text-light);
        }
        .card-avatar {
            max-height: 3rem;
            margin-right: 1rem;
        }
        .card-name {
            font-size: 1.125rem;
            font-weight: bold;
        }
        .card-position {
            font-size: 0.875rem;
            color: var(--color-text-light);
        }
        .i-mdi-arrow-right {
            transition: margin var(--transi-d);
        }
        &:hover {
            transform: translateY(-0.5rem);
            .i-mdi-arrow-right {
                margin-left: 1rem;
            }
        }
    }

    @media screen and (max-width: $--container-md) {
        .grid-card-item {
            flex-basis: calc((1 / 2 * 100%) - 1rem);
        }
    }

    @media screen and (max-width: $--container-sm) {
        .grid-card-item {
            flex-basis: 100%;
        }
    }
}
</style>
