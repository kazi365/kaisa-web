<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { $registerDialog } from './index'
import RtSelect from "@/components/select/RtSelect.vue";
import RtTextarea from "@/components/textarea/RtTextarea.vue";
import {signup} from "@/src/api/user";
import {useNotify} from "@/composables/use-notify/useNotify";
const { notify } = useNotify()

export default defineComponent({
    name: 'RegisterDialog',
    components: {RtTextarea, RtSelect},
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
            $registerDialog.unmount()
            visible.value = false
            setTimeout(() => {
            }, 500);
        }

        const formData = reactive({
            username: '',
            email: '',
            phone: '',
            password: '',
            firstName: '',
            lastName: '',
        })

        const submitLoading = ref(false)
        const isSubmitSuccess = ref(false)
        const cpu_isEmpty = computed(() => {
            return Object.values(formData).some(item => !item);
        })
        const submit = async (e: Event) => {
            e.preventDefault()
            if (!cpu_isEmpty || submitLoading.value) return;
            submitLoading.value = true
            await signup(formData)
            notify({
                msg: '注册成功',
                type: 'info',
                position: 'top',
            })
            submitLoading.value = false
            isSubmitSuccess.value = true
            close()
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
            submitLoading,
            isSubmitSuccess,
            cpu_isEmpty,
            submit,
        };
    }
})
</script>

<template>
    <div class="register-dialog">
        <transition name="mask">
            <div v-show="visible" class="dialog-mask" />
        </transition>
        <transition name="inner">
            <div v-show="visible" v-setSize="{ visible }" class="dialog__inner">
                <div class="i-mdi-close dialog-close" @click="close" />
                <div class="flex">
                    <div class="flex-1 min-w-0">
                        <div class="dialog__header">
                            <span class="dialog-title" :class="{ 'invisible': isSubmitSuccess }">用户注册</span>
                        </div>
                        <div class="dialog__main">
                            <form v-if="!isSubmitSuccess" action="" @submit="submit">
                                <div class="def-form-item">
                                    <label class="form-label required" for="username">用户名</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model="formData.username"
                                            id="fullName"
                                            maxlength="32"
                                            name="fullName"
                                            @change="formData.username = (formData.username ?? '').trim()"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="email">邮箱</label>
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
                                    <label class="form-label required" for="phone">电话</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model.trim="formData.phone"
                                            id="companyName"
                                            maxlength="32"
                                            name="companyName"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="password">密码</label>
                                    <div>
                                        <RtInput
                                                class="w-full"
                                                v-model.trim="formData.password"
                                                id="companyName"
                                                maxlength="32"
                                                name="companyName"
                                                type="password"
                                        />
                                    </div>
                                </div>

                                <div class="def-form-item">
                                    <label class="form-label required" for="firstName">名</label>
                                    <div>
                                        <RtInput
                                                class="w-full"
                                                v-model.trim="formData.firstName"
                                                id="companyName"
                                                maxlength="32"
                                                name="companyName"
                                        />
                                    </div>
                                </div>
                                <div class="def-form-item">
                                    <label class="form-label required" for="lastName">姓</label>
                                    <div>
                                        <RtInput
                                                class="w-full"
                                                v-model.trim="formData.lastName"
                                                id="companyName"
                                                maxlength="32"
                                                name="companyName"
                                        />
                                    </div>
                                </div>
                                <div class="mt-8">
                                    <button
                                        class="btn btn-primary"
                                        :disabled="cpu_isEmpty || submitLoading"
                                        type="submit"
                                    >
                                        <span class="align-middle">注册</span>
                                        <div v-if="submitLoading" class="i-mdi-loading ml-4" />
                                    </button>
                                </div>
                            </form>
                            <div v-else class="text-center">
                                <div class="i-mdi-check-circle-outline icon-success" />
                                <p class="mt-0 text-2xl">Thank you</p>
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

.register-dialog {
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
