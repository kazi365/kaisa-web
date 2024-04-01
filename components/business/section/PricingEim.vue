<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { IEImPlan } from '@/src/types/order'
import page_seo from "@/assets/json/page_seo.json";

const runtimeConfig = useRuntimeConfig()

useHead({
    meta: [
        { name: 'keywords', content: page_seo.pricing_eim.keywords },
    ],
    title: page_seo.pricing_eim.title,
})

const eimPlansData = [
    {
        planType: 'FREE',
        records: [],
    },
    {
        planType: 'PRO',
        records: [
            { devices: 3000, price: 2999 },
            { devices: 5000, price: 3749 },
            { devices: 10000, price: 4999 },
            { devices: 50000, price: 14999 },
            { devices: 100000, price: 21999 },
        ],
    },
]

const pricingFormData = reactive({
    devices: 3000,
})
const cpu_devicesOptions = computed(() => {
    const downlaods = eimPlansData.map(plan => plan.records.map(record => record.devices))
        .reduce((pv, cv) => pv.concat(cv), [])
    return Array.from(new Set(downlaods));
})
const isPlanPro = (plan: IEImPlan) => plan.planType === 'PRO'
const getFinalPrice = (plan: IEImPlan) => {
    const priceByDownloads = plan.records.find(record => record.devices === pricingFormData.devices)?.price
    if (!priceByDownloads) return;
    return priceByDownloads;
}
const buyPlan = (plan: IEImPlan) => {
    window.open(runtimeConfig.public.NUXT_EIM_SIGNUP_URL)
}
const getPlanInfoConfigs = (plan: IEImPlan) => {
    if (!isPlanPro(plan)) {
        return [
            'Limited MNO/MVNOs',
            'eSIM Fleet Management Platform with Basic Features',
            'Free Samples',
            'Open Source SDK',
            'Community Support and Self-Service',
        ];
    } else {
        return [
            'Open integration to Global/Local MNO/MVNOs',
            'Bootstrap Connectivity',
            'Unlimited eSIM download and switch',
            'Open APIs',
            '99.9% SLA',
            'Commercial Support with Customer Success Manager',
        ];
    }
}
</script>

<template>
    <section id="pricing-eim" class="pricing-eim">
        <div class="container px-4 mx-auto">
            <div class="section-content">
                <div class="search-form">
                </div>
                <div class="plans">
                    <div
                        v-for="plan in eimPlansData"
                        :key="plan.planType"
                        class="plan-item"
                    >
                        <p class="text-xl">{{ plan.planType }}</p>
                        <div class="relative">
                            <p class="text-2xl font-bold">
                                $
                                <span>{{ plan.records.length ? getFinalPrice(plan)?.toLocaleString() : 0 }}</span>
                                / Year
                            </p>
                            <div v-if="plan.records.length" class="plan-downloads">
                                <select v-model="pricingFormData.devices">
                                    <option
                                        v-for="item in cpu_devicesOptions"
                                        :key="item"
                                        :value="item"
                                    >{{ item.toLocaleString() }}</option>
                                </select>
                                <span>eSIM devices per year</span>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary w-full mt-4" @click="buyPlan(plan)">
                            {{ !isPlanPro(plan) ? 'Get free trial' : 'Buy now' }}
                        </button>
                        <ul class="plan-infos">
                            <li
                                v-for="(info, index) in getPlanInfoConfigs(plan)"
                                :key="index"
                            >
                                <p v-html="info" class="rt-color-text"></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.pricing-eim {
    padding-top: 2rem;
    padding-bottom: 2rem;
    .section-content {}
    .search-form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem 2rem;
    }
    .plans {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 2rem 5%;
        margin-top: 2rem;
    }
    .plan-item {
        flex-basis: min(20rem, 100%);
        padding-right: 1rem;
        padding-left: 1rem;
        border-radius: 0.25rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 0.25s ease;
        .plan-downloads {
            position: absolute;
            top: calc(100% + 0.5rem);
            left: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            transform: translateX(-50%);
        }
        .plan-infos {
            line-height: 1.5;
            text-align: left;
            font-size: 0.875rem;
            color: var(--color-theme);
        }
        .def-info-item + .def-info-item {
            margin-top: 0.5rem;
        }
        &:hover {
            box-shadow: 0 0.125rem 0.25rem 0.125rem rgba(0, 0, 0, 0.1);
            transform: translateY(-0.5rem);
        }
    }
}
</style>
