<script lang="ts">
import { defineComponent } from 'vue'
import { COOKIES_CONSENT_KEY, $privacyConsent } from './index'

export default defineComponent({
    name: 'CookiesPolicy',
    setup() {
        const toPreferencesSetting = () => {
            $privacyConsent.createPreferencesSetting()
            close()
        }

        const rejectAll = () => {
            window.localStorage.setItem(COOKIES_CONSENT_KEY, '0')
            close()
        }

        const acceptAll = () => {
            window.localStorage.setItem(COOKIES_CONSENT_KEY, '1')
            close()
        }

        const close = () => {
            $privacyConsent.unmountCookiesPolicy()
        }

        return {
            toPreferencesSetting,
            rejectAll,
            acceptAll,
            close,
        };
    }
})
</script>

<template>
    <div class="cookies-policy">
        <div class="cookies-policy-body">
            <div class="p-4 border-bottom">
                <div class="i-mdi-close float-right text-2xl !rt-color-text-lighter cursor-pointer" @click="close" />
                <p class="my-0 leading-normal"><strong>Cookies Policy</strong></p>
            </div>
            <div class="cookies-policy__main">
                <p class="mt-0">
                    Simlessly is committed to providing you with a secure and seamless browsing experience.
                    To achieve this, we use cookies, including third-party website tracking technologies.
                    These cookies are automatically placed when you visit our websites and do not require your explicit consent.
                </p>
                <p>
                    By default, these cookies ensure the basic functionality and security of our websites.
                    However, we and our partners also use additional cookies to enhance the performance of our websites and offer you an optimal online experience.
                </p>
                <div>
                    <p><strong>Your Cookie Choices:</strong></p>
                    <ul>
                        <li>
                            <strong>Accept All</strong>: By clicking 'Accept All,' you provide your consent for us and our partners to use additional cookies to improve website performance and enhance your online experience.
                        </li>
                        <li>
                            <strong>Keep Default Settings</strong>: If you choose not to click 'Accept All,' the default settings will remain unchanged, and only essential cookies will be utilized.
                        </li>
                        <li>
                            <strong>Set Preferences</strong>: For individualized control over your consent, click 'Set Preferences' to manage your cookie preferences.                        </li>
                    </ul>
                </div>
                <p>
                    <strong>Important Note</strong>:
                    Your continued use of our websites signifies your acceptance of the default settings.
                    If you have any concerns or questions, please refer to our
                    <nuxt-link to="/privacypolicy" target="_blank">Privacy Statement</nuxt-link>
                    for detailed information.
                </p>
                <p>
                    Thank you for choosing Simlessly for your connectivity needs.
                </p>
            </div>
            <div class="grid sm:grid-cols-3 gap-2 p-4 border-top">
                <button class="btn btn-light" @click="toPreferencesSetting">Set Preferences</button>
                <button class="btn btn-light" @click="rejectAll">Reject All</button>
                <button class="btn btn-primary" @click="acceptAll">Accept All</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.cookies-policy {
    position: fixed;
    z-index: 99;
    animation: fade-in var(--transi-d);
    .cookies-policy-body {
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        width: calc(100% - 4rem);
        max-width: $--container-sm;
        border-radius: 0.25rem;
        background-color: var(--color-bg);
        box-shadow: 0 0 0.5rem 0.25rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
        animation: fade-in 1s;
    }
    .cookies-policy__main {
        max-height: calc(100vh / 3);
        padding: 1rem;
        line-height: 1.5;
        font-size: 0.875rem;
        overflow-y: auto;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: translateY(100%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
</style>
