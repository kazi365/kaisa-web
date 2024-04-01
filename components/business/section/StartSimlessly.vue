<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { push } = useRouter()

const props = defineProps<{
    link?: 'rsp' | 'eim'
}>()

const sectionData = {
    title: 'Get started with Simlessly',
}

const getFree = () => {
    window.open(runtimeConfig.public.NUXT_RSP_SIGNUP_URL)
}
const toPricing = () => {
    if (props.link === 'eim') {
        push('/pricing?tab=eim')
    } else {
        push('/pricing')
    }
}

const toMeeting = () => {
    window.open(runtimeConfig.public.NUXT_HUBSPOT_MEETING_BRUCE_URL)
}
</script>

<template>
    <section class="start-simlessly">
        <div class="container py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">{{ sectionData.title }}</h2>
            <div class="mt-10 flex flex-wrap justify-center gap-4">
                <button class="btn btn-primary btn-start" @click="getFree">
                    <span class="align-middle">Start Trial!</span>
                    <div class="i-mdi-arrow-right ml-2" />
                </button>
                <button class="btn btn-primary btn-pricing" @click="toPricing">
                    <span class="align-middle">See Pricing!</span>
                    <div class="i-mdi-arrow-right ml-2" />
                </button>
                <button class="btn btn-primary" @click="toMeeting">
                    <span class="align-middle">Book a Meeting!</span>
                    <div class="i-mdi-arrow-right ml-2" />
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

.start-simlessly {
    color: #ffffff;
    background-image: url("~/assets/imgs/bg/foot_box.jpg");
    background-position: center;
    background-size: cover;
    .btn-start,
    .btn-pricing {
        --bs-btn-border-color: transparent;
        --bs-btn-color: var(--color-theme);
        --bs-btn-bg: #ffffff;
    }
}
</style>
