<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import country_region from '@/assets/json/country_region.json'
import { addContact } from "@/src/api/contact"
import { $registerDialog } from './index'

export default defineComponent({
    name: 'RegisterDialog',
    props: {},
    directives: {
        setSize: {
            updated(el: HTMLElement, binding) {
                const { visible } = binding.value
                if (!visible) return;
                // dialogHeader
                const dialogHeaderEl = el.querySelector('.dialog__header')!
                // dialogBody
                const dialogBodyEl = el.querySelector('.dialog__main') as HTMLElement
                if (dialogBodyEl) {
                    const dialogHeaderElHeight = dialogHeaderEl?.clientHeight || 0
                    dialogBodyEl.style.maxHeight = `calc(100vh - 2rem - ${dialogHeaderElHeight}px)`
                }
            },
        },
    },
    setup(props, { expose }) {

        const visible = ref(false)
        const open = () => {
            visible.value = true
        }
        const close = () => {
            visible.value = false
            setTimeout(() => {
            }, 500);
        }

        const formData = reactive({
            fullName: '',
            email: '',
            companyName: '',
            countryOrRegion: '',
            product: '',
            more: '',
            hear: '',
        })
        const countriesAndRegions = country_region.map(item => item.en)
        const products = [
            'iSIM Enablement solution',
            'RSP SaaS',
            'eIM platform',
            'eSIM Chip',
            'nuSIM module: BG95M3-nuSIM',
            'Other',
        ]
        const hears = [
            'Existing Simlessly customer',
            'Search engine e.g.Google',
            'Linkedin',
            'Social media',
            'Word of mouth',
            'Other',
        ]

        const submitLoading = ref(false)
        const isSubmitSuccess = ref(false)
        const cpu_isEmpty = computed(() => {
            return Object.values(formData).some(item => !item);
        })
        const submit = async (e: Event) => {
            e.preventDefault()
            if (!cpu_isEmpty || submitLoading.value) return;
            submitLoading.value = true
            try {
                await addContact(formData)
                isSubmitSuccess.value = true
                gtm?.trackEvent({
                    event: 'contact',
                    send_to: 'AW-16453342700/71CaCIr9ro8ZEOyryKU9',
                })
                setTimeout(() => {
                    close()
                }, 2000);
            } catch (error) {
                window.alert(error)
                submitLoading.value = false
            }
        }

        expose({
            open,
            close,
            formData,
        })
        return {
            visible,
            open,
            close,
            formData,
            countriesAndRegions,
            products,
            hears,
            submitLoading,
            isSubmitSuccess,
            cpu_isEmpty,
            submit,
        };
    }
})
</script>

<template>
    <div class="contact-dialog">
        <transition name="mask">
            <div v-show="visible" class="dialog-mask" />
        </transition>
        <transition name="inner">
            <div v-show="visible" v-setSize="{ visible }" class="dialog__inner">
                <div class="i-mdi-close dialog-close" @click="close" />
                <div class="flex">
                    <div class="flex-1 min-w-0">
                        <div class="dialog__header">
                            <span class="dialog-title" :class="{ 'invisible': isSubmitSuccess }">Contact Us</span>
                        </div>
                        <div class="dialog__main">
                            <form v-if="!isSubmitSuccess" action="" @submit="submit">
                                <div class="def-form-item">
                                    <label class="form-label required" for="fullName">Full Name</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model="formData.fullName"
                                            id="fullName"
                                            maxlength="32"
                                            name="fullName"
                                            @change="formData.fullName = (formData.fullName ?? '').trim()"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="email">Email</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model.trim="formData.email"
                                            id="email"
                                            maxlength="64"
                                            name="email"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="companyName">Company</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model.trim="formData.companyName"
                                            id="companyName"
                                            maxlength="32"
                                            name="companyName"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="countryOrRegion">Country/Region</label>
                                    <div>
                                        <RtSelect
                                            class="w-full"
                                            v-model="formData.countryOrRegion"
                                            id="countryOrRegion"
                                            name="countryOrRegion"
                                            :options="countriesAndRegions"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="product">Consulting Product</label>
                                    <div>
                                        <RtSelect
                                            class="w-full"
                                            v-model="formData.product"
                                            id="product"
                                            name="product"
                                            :options="products"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="more">Message</label>
                                    <div>
                                        <RtTextarea
                                            class="w-full"
                                            v-model.trim="formData.more"
                                            id="more"
                                            maxlength="256"
                                            name="more"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="hear">How did you hear about us?</label>
                                    <div>
                                        <RtSelect
                                            class="w-full"
                                            v-model="formData.hear"
                                            id="hear"
                                            name="hear"
                                            :options="hears"
                                        />
                                    </div>
                                </div>
                                <div class="mt-8">
                                    <button
                                        class="btn btn-primary"
                                        :disabled="cpu_isEmpty || submitLoading"
                                        type="submit"
                                    >
                                        <span class="align-middle">Send Message</span>
                                        <div v-if="submitLoading" class="i-mdi-loading ml-4" />
                                    </button>
                                </div>
                            </form>
                            <div v-else class="text-center">
                                <div class="i-mdi-check-circle-outline icon-success" />
                                <p class="mt-0 text-2xl">Thank you</p>
                                <p class="mb-8">
                                    We appreciate that you've taken the time to write us.<br />
                                    We'll be back to you very soon.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-illustration">
                        <div class="i-app-contact-msg-box opacity-50" style="top: 16%; left: 50%;" />
                        <div class="i-app-contact-msg-box" style="top: 12%; left: 58%;" />
                        <div class="i-app-contact-mail opacity-50" style="top: 30%; left: 15%;" />
                        <div class="i-app-contact-mail" style="top: 34%; left: 25%;" />
                        <div class="i-app-contact-msg-box opacity-10" style="top: 66%; left: 32%;" />
                        <div class="i-app-contact-mail opacity-50" style="top: 60%; left: 45%;" />
                        <div class="i-app-contact-msg-box" style="top: 55%; left: 60%;" />
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.contact-dialog {
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    z-index: 109;
    .dialog-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
    .dialog__inner {
        position: relative;
        z-index: 119;
        width: min(1024px, calc(100% - 2rem));
        border-radius: 0.5rem;
        background-color: var(--color-bg);
        box-shadow: 0 0.125rem 0.5rem 0.125rem rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }
    .dialog-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 1;
        width: 1.5rem;
        height: 1.5rem;
        color: #ffffff;
        cursor: pointer;
    }
    .dialog__header {
        padding: 1rem;
    }
    .dialog-title {
        margin-top: 0;
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-theme);
    }
    .dialog__main {
        padding: 1rem;
        overflow-y: auto;
    }
    .i-mdi-loading {
        animation: 1s linear 0s infinite loading;
    }
    .def-form-item {
        margin-bottom: 1rem;
        font-size: 0.875rem;
        .form-label {
            display: inline-block;
            margin-bottom: 0.25rem;
        }
    }
    .icon-success {
        font-size: 5rem;
        color: var(--s-color-green);
    }
    .contact-illustration {
        position: relative;
        width: 400px;
        background: linear-gradient(to bottom, var(--color-theme),#ffffff);
    }
    .i-app-contact-mail {
        position: absolute;
        width: 104px;
        height: 71px;
    }
    .i-app-contact-msg-box {
        position: absolute;
        width: 119px;
        height: 51px;
    }
    
    .mask-enter-from,
    .mask-leave-to {
        opacity: 0;
    }
    .mask-enter-active,
    .mask-leave-active {
        transition: opacity 0.25s ease;
    }
    .mask-enter-to,
    .mask-leave-from {
        opacity: 1;
    }

    .inner-enter-from,
    .inner-leave-to {
        transform: scale(0);
    }
    .inner-enter-active,
    .inner-leave-active {
        transition: transform 0.25s ease;
    }
    .inner-enter-to,
    .inner-leave-from {
        transform: scale(1);
    }

    @keyframes loading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
}

@media (max-width: $--container-md) {
    .contact-dialog {
        .dialog-close {
            color: inherit;
        }
        .contact-illustration {
            display: none;
        }
    }
}
</style>
