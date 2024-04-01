<script setup lang="ts">
import IntroductionRsp from './IntroductionRsp.vue'
import IntroductionEim from './IntroductionEim.vue'
import IntroductionIsim from './IntroductionIsim.vue'
import { $contactDialog } from '@/components/business/login-dialog/index'

const runtimeConfig = useRuntimeConfig()
const { push } = useRouter()

const toISIm = () => {
    push('/products/isim')
}
const toRsp = () => {
    push('/products/rsp')
}
const toEIm = () => {
    push('/products/eim')
}

const doFreeTrial = () => {
    window.open(runtimeConfig.public.NUXT_RSP_SIGNUP_URL)
}

const doTalk = () => {
    $contactDialog.create()
}
</script>

<template> 
    <section class="product-introduction">
        <IntroductionRsp>
            <template #content-append>
                <div class="mt-10 <sm:text-center flex gap-x-6 gap-y-4">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="toRsp"
                    >
                        <span class="align-middle">Learn More</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                    <button
                        class="btn btn-outline-primary card-btn-sub"
                        type="button"
                        @click="doFreeTrial"
                    >
                        <span class="align-middle">Start Free Trial!</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                </div>
            </template>
        </IntroductionRsp>
        <IntroductionEim>
            <template #content-append>
                <div class="mt-10 <sm:text-center flex gap-x-6 gap-y-4">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="toEIm"
                    >
                        <span class="align-middle">Learn More</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                    <button
                        class="btn btn-outline-primary card-btn-sub"
                        type="button"
                        @click="doTalk"
                    >
                        <span class="align-middle">Let's Talk!</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                </div>
            </template>
        </IntroductionEim>
        <IntroductionIsim>
            <template #content-append>
                <div class="mt-10 <sm:text-center flex gap-x-6 gap-y-4">
                    <button
                        class="btn btn-primary"
                        type="button"
                        @click="toISIm"
                    >
                        <span class="align-middle">Learn More</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                    <button
                        class="btn btn-outline-primary card-btn-sub"
                        type="button"
                        @click="doTalk"
                    >
                        <span class="align-middle">Let's Talk!</span>
                        <div class="i-mdi-arrow-right ml-2" />
                    </button>
                </div>
            </template>
        </IntroductionIsim>
    </section>
</template>

<style lang="scss" scoped>
.product-introduction {
    overflow: hidden;
    .card-btn-sub {
        --bs-btn-bg: #ffffff;
        border-radius: 0;
    }
}
</style>
