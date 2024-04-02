<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { login } from "@/src/api/login"
import { $loginDialog } from './index'

export default defineComponent({
    name: 'LoginDialog',
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
                $loginDialog.unmount()
            }, 500);
        }

        const formData = reactive({
            username: '',
            password: ''
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
            try {
                await login(formData)
                isSubmitSuccess.value = true
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
            submitLoading,
            isSubmitSuccess,
            cpu_isEmpty,
            submit,
        };
    }
})
</script>

<template>
    <div class="login-dialog">
        <transition name="mask">
            <div v-show="visible" class="dialog-mask" />
        </transition>
        <transition name="inner">
            <div v-show="visible" v-setSize="{ visible }" class="dialog__inner">
                <div class="i-mdi-close dialog-close" @click="close" />
                <div class="flex">
                    <div class="flex-1 min-w-0">
                        <div class="dialog__header">
                            <span class="dialog-title" :class="{ 'invisible': isSubmitSuccess }">用户登录</span>
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
                                    <label class="form-label required" for="password">密码</label>
                                    <div>
                                        <RtInput
                                            class="w-full"
                                            v-model.trim="formData.password"
                                            id="password"
                                            maxlength="64"
                                            name="password"
                                            type="password"
                                        />
                                    </div>
                                </div>

                                <div class="mt-8">
                                    <button
                                        class="btn btn-primary"
                                        :disabled="cpu_isEmpty || submitLoading"
                                        type="submit"
                                    >
                                        <span class="align-middle">登录</span>
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

.login-dialog {
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
