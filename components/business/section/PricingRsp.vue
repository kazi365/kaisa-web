<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { getRspPlans } from '@/src/api/order'
import type { IPlan } from '@/src/types/order'
import RtSelect from '@/components/rt-select/RtSelect.vue'
import page_seo from "@/assets/json/page_seo.json";

useHead({
    meta: [
        { name: 'keywords', content: page_seo.pricing_rsp.keywords },
    ],
    title: page_seo.pricing_rsp.title,
})


const runtimeConfig = useRuntimeConfig()

const rspPlansData = ref<IPlan[]>([])
const getRspPlansData = async () => {
    try {
        const data = await getRspPlans()
        rspPlansData.value = data.value?.obj.plans || []
    } catch (error) {
        // 
    }
}
onMounted(() => {
    nextTick(() => {
        getRspPlansData()
    })
})

const pricingFormData = reactive({
    billingType: 'MONTHLY',
    downloadTimes: 100,
})
const cpu_downloadsOptions = computed(() => {
    const downlaods = rspPlansData.value.map(plan => plan.records.map(record => record.downloadTimes))
        .reduce((pv, cv) => pv.concat(cv), [])
    return Array.from(new Set(downlaods)).map(item => ({
        value: item, label: item.toLocaleString()
    }));
})

const isPlanBasic = (plan: IPlan) => plan.planType === 'BASIC'
const isPlanPro = (plan: IPlan) => plan.planType === 'PRO'
const isPlanPremium = (plan: IPlan) => plan.planType === 'PREMIUM'
const isPlanPopular = (plan: IPlan) => ['PRO'].includes(plan.planType)
const getFinalPrice = (plan: IPlan) => {
    const priceByDownloads = plan.records.find(record => record.downloadTimes === pricingFormData.downloadTimes)?.price
    if (!priceByDownloads) return;
    if (pricingFormData.billingType === 'ANNUALLY') {
        return Math.floor(priceByDownloads * 12 * 0.9);
    }
    return priceByDownloads;
}
const buyPlan = (plan: IPlan) => {
    if (!getFinalPrice(plan)) return;
    window.open(runtimeConfig.public.NUXT_RSP_SIGNUP_URL)
}
const getPlanInfoConfigs = (plan: IPlan) => {
    const infos = [
        {
            label: 'Profile Configuration',
            htmlValue: `${plan.configType}`,
        },
        {
            label: 'Profile Redownload',
            htmlValue: `Up to <span class="rt-color-yellow">${plan.maxRedownload}</span> times per month`,
        },
        {
            htmlValue: `<span class="rt-color-yellow" >${plan.maxOplmn}</span> PLMN Network included`,
        },
        {
            htmlValue: -1 < plan.maxMember
                ? plan.maxMember === 1 ? `<span class="rt-color-yellow">Single </span> Account` : `Up to <span class="rt-color-yellow">${plan.maxMember}</span> Accounts`
                : `<span class="rt-color-yellow">Unlimited </span> Accounts`,
        },
    ]
    if (plan.planType === 'PRO') {
        infos.push({
            htmlValue: 'Standard API',
        })
    }
    if (plan.planType === 'PREMIUM') {
        infos.push({
            htmlValue: 'Advanced API',
        })
    }
    return infos;
}
</script>

<template>
    <section id="pricing-rsp" class="pricing-rsp">
        <div class="container px-4 mx-auto">
            <div class="section-content">
                <div class="def-alert !px-8 mb-8" type="positive">
                    <a
                        class="float-right font-semibold underline"
                        :href="runtimeConfig.public.NUXT_RSP_SIGNUP_URL"
                        target="_blank"
                    >Start Now</a>
                    <div class="text-center overflow-hidden">Forever free to add 1 profile. No credit card required. Sign up, generate eSIM AC within seconds.</div>
                </div>
                <div class="search-form">
                    <div class="form-billing-type">
                        <label
                            class="billing-type-item"
                            :class="{ 'billing-type--active': pricingFormData.billingType === 'MONTHLY' }"
                        >
                            <input
                                class="hidden"
                                v-model="pricingFormData.billingType"
                                type="radio"
                                value="MONTHLY"
                            />
                            <span class="billing-type-radio" />
                            <span class="align-middle">Billed monthly</span>
                        </label>
                        <label
                            class="billing-type-item"
                            :class="{ 'billing-type--active': pricingFormData.billingType === 'ANNUALLY' }"
                        >
                            <input
                                class="hidden"
                                v-model="pricingFormData.billingType"
                                type="radio"
                                value="ANNUALLY"
                            />
                            <span class="billing-type-radio" />
                            <span class="align-middle">Billed annually</span>
                            <span class="ml-2 font-sm rt-color-yellow">10% off</span>
                        </label>
                    </div>
                    <div class="form-downloads">
                        <span>How many downloads do you have monthly ?</span>
                        <RtSelect
                            class="shrink-0"
                            v-model="pricingFormData.downloadTimes"
                            :options="cpu_downloadsOptions"
                        />
                    </div>
                </div>
                <div class="plans">
                    <div
                        v-for="plan in rspPlansData"
                        :key="plan.planType"
                        class="plan-item"
                        :class="'plan--' + plan.planType.toLowerCase()"
                    >
                        <span v-if="isPlanPopular(plan)" class="plan-popular">Popular</span>
                        <p class="plan-type">{{ plan.planType }}</p>
                        <template v-if="isPlanBasic(plan)">
                            <p class="plan-desc">Easy Access to Basic Features</p>
                        </template>
                        <template v-if="isPlanPro(plan)">
                            <p class="plan-desc">Advanced Features and Open APIs</p>
                        </template>
                        <template v-if="isPlanPremium(plan)">
                            <p class="plan-desc">Enhanced Security and Other Customization</p>
                        </template>
                        <p :class="{ 'invisible': !getFinalPrice(plan) }">
                            <strong>
                                <span class="text-2xl">
                                    $ {{ getFinalPrice(plan) ? getFinalPrice(plan)?.toLocaleString() : '--' }}
                                </span>
                                /
                                <span>{{ pricingFormData.billingType === 'MONTHLY' ? 'Mo' : 'Year' }}</span>
                            </strong>
                        </p>
                        <p class="mb-0">{{ pricingFormData.downloadTimes.toLocaleString() }} downloads per month</p>
                        <p class="mt-1 mb-4 text-sm rt-color-text-lighter">
                            <template v-if="isPlanBasic(plan)">$0.8 per extra download</template>
                            <template v-if="isPlanPro(plan)">$0.6 per extra download</template>
                            <template v-if="isPlanPremium(plan)">$0.6 per extra download</template>
                        </p>
                        <button
                            class="btn btn-buy"
                            :class="{
                                'btn-outline-primary': !isPlanPro(plan),
                                'btn-primary': isPlanPro(plan),
                            }"
                            :disabled="!getFinalPrice(plan)"
                            @click="buyPlan(plan)"
                        >
                            {{ getFinalPrice(plan) ? 'Start a 15-day Trial' : 'Limit exceeded' }}
                        </button>
                        <ul class="plan-infos">
                            <li
                                v-for="(info, index) in getPlanInfoConfigs(plan)"
                                :key="index"
                                class="def-info-item"
                            >
                                <div class="i-app-list_correct info-list-style" />
                                <div class="overflow-hidden">
                                    <label v-if="info.label" class="info-label">{{ info.label }}</label>
                                    <div v-html="info.htmlValue"></div>
                                </div>
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
.yes {
  color: #0d6efd;
  font-size: 24px;
}

.pricing-rsp {
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
    .form-billing-type {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem 1rem;
    }
    .billing-type-item {
        cursor: pointer;
        .billing-type-radio {
            position: relative;
            display: inline-block;
            width: 1.25rem;
            height: 1.25rem;
            border: 1px solid #cccccc;
            border-radius: 50%;
            margin-right: 0.5rem;
            vertical-align: middle;
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: var(--color-theme);
                transform: scale(0);
                transition: transform 0.25s ease;
            }
        }
        &.billing-type--active {
            .billing-type-radio {
                border-color: var(--color-theme);
                &::after {
                    transform: scale(0.75);
                }
            }
        }
    }
    .form-downloads {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
    }
    .plans {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem 2rem;
        margin-top: 2rem;
    }
    .plan-item {
        position: relative;
        flex-basis: min(24rem, 100%);
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 0.25s ease;
        overflow: hidden;
        .plan-popular {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-bottom-right-radius: 0.5rem;
            font-weight: bold;
            color: #ffffff;
            background-color: var(--color-red);
        }
        .plan-type {
            margin-bottom: 0;
            font-size: 1.5rem;
            font-weight: bold;
        }
        .plan-desc {
            position: relative;
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            margin-bottom: 0;
            font-size: 0.875rem;
            background-color: var(--color-bg-dark);
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                display: inline-block;
                border-right: 0.5rem solid transparent;
                border-bottom: 0.5rem solid var(--color-bg-dark);
                border-left: 0.5rem solid transparent;
                transform: translate(-50%, -100%);
            }
        }
        .btn-buy {
            width: 75%;
            height: 3rem;
            border-radius: 1.5em;
            &[disabled] {
                border-color: #999999;
                color: #999999;
            }
        }
        .plan-infos {
            padding: 0;
            margin-top: 2rem;
            text-align: left;
        }
        .def-info-item {
            list-style: none;
            .info-list-style {
                float: left;
                margin-right: 1rem;
                font-size: 1.15em;
                color: var(--color-theme);
            }
            .info-label {
                display: inline-block;
                margin-bottom: 0.25rem;
            }
        }
        .def-info-item + .def-info-item {
            margin-top: 1rem;
        }
        &:hover {
            box-shadow: 0 0.125rem 0.25rem 0.125rem rgba(0, 0, 0, 0.1);
            transform: translateY(-0.5rem);
        }
        &.plan--pro {
            .plan-type {
                color: var(--color-theme);
            }
            .plan-desc {
                color: var(--color-theme);
                background-color: var(--color-theme-light);
                &::before {
                    border-bottom-color: var(--color-theme-light);
                }
            }
        }
        &.plan--premium {
            .plan-type {
                color: var(--color-yellow);
            }
            .plan-desc {
                color: var(--color-yellow);
                background-color: var(--color-yellow-light);
                &::before {
                    border-bottom-color: var(--color-yellow-light);
                }
            }
        }
    }
}
</style>
