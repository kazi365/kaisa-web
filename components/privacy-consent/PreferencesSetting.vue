<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { COOKIES_CONSENT_KEY, $privacyConsent } from './index'
import RtSwitch from '@/components/rt-switch/RtSwitch.vue'

export default defineComponent({
    name: 'PreferencesSetting',
    components: { RtSwitch },
    setup() {
        const formData = reactive({
            func: true,
            pref: true,
            targ: true,
        })
        const acceptAll = () => {
            window.localStorage.setItem(COOKIES_CONSENT_KEY, '1')
            close()
        }

        const save = () => {
            window.localStorage.setItem(COOKIES_CONSENT_KEY, JSON.stringify(formData))
            if (!formData.pref) {
                const gtm = useGtm()
                gtm?.enable(false)
            }
            close()
        }

        const close = () => {
            const privacyConsentCache = useLocalStorage(COOKIES_CONSENT_KEY, '')
            if (!privacyConsentCache.value) {
                $privacyConsent.createCookiesPolicy()
            }
            $privacyConsent.unmountPreferencesSetting()
        }

        return {
            formData,
            acceptAll,
            save,
            close,
        };
    }
})
</script>

<template>
    <div class="preferences-setting">
        <div class="preferences-setting-mask" />
        <div class="preferences-setting-body">
            <div class="p-4 border-bottom">
                <div class="i-mdi-close float-right text-2xl !rt-color-text-lighter cursor-pointer" @click="close" />
                <p class="my-0 leading-normal"><strong>Set Preferences</strong></p>
            </div>
            <div class="cookies-policy__main">
                <p class="mt-0">
                    You have the option to permit specific types of cookies on our websites.
                    Click on the various categories to gain insights and modify our default settings.
                    Keep in mind that rejecting specific cookie types may impact your browsing experience and the services we offer.
                    This tool is designed to help you oversee your consent for the processing of personal data. 
                </p>
                <p>
                    <nuxt-link to="/privacypolicy" target="_blank">Read Privacy Statement</nuxt-link>
                </p>
                <ul class="pl-0 mt-8 list-none">
                    <li class="py-4 border-top">
                        <RtSwitch class="cookies-group-toggle" :modelValue="true" disabled />
                        <details class="cookies-group-item" open>
                            <summary class="cookies-group__header">
                                <div class="i-mdi-chevron-right cookies-group-expansion" />
                                <span class="align-middle"><strong>Strictly Necessary Cookies</strong></span>
                            </summary>
                            <p>
                                These cookies are essential for the website's functionality and cannot be disabled in our systems.
                                They are typically activated in response to actions you take, constituting a request for services—such as adjusting privacy preferences, logging in, or completing forms.
                                While you can configure your browser to block or notify you about these cookies, certain site features may become unavailable.
                                Importantly, these cookies do not store any personally identifiable information.
                            </p>
                        </details>
                    </li>
                    <li class="py-4 border-top">
                        <RtSwitch class="cookies-group-toggle" v-model="formData.func" />
                        <details class="cookies-group-item" open>
                            <summary class="cookies-group__header">
                                <div class="i-mdi-chevron-right cookies-group-expansion" />
                                <span class="align-middle"><strong>Functional Cookies</strong></span>
                            </summary>
                            <p>
                                These cookies empower the website to offer improved functionality and personalization.
                                They can be set by us or third-party providers whose services we've incorporated into our pages.
                                If you opt not to permit these cookies, some or all of these services may not operate as intended.
                            </p>
                        </details>
                    </li>
                    <li class="py-4 border-top">
                        <RtSwitch class="cookies-group-toggle" v-model="formData.pref" />
                        <details class="cookies-group-item" open>
                            <summary class="cookies-group__header">
                                <div class="i-mdi-chevron-right cookies-group-expansion" />
                                <span class="align-middle"><strong>Performance Cookies</strong></span>
                            </summary>
                            <p>
                                These cookies enable us to track visits and traffic sources, facilitating the measurement and enhancement of our site's performance.
                                They provide insights into the popularity of specific pages and visitor navigation patterns.
                                All data collected by these cookies is aggregated, ensuring anonymity.
                                If you choose not to allow these cookies, we won't be aware of your site visits, and monitoring its performance will be restricted.
                            </p>
                        </details>
                    </li>
                    <li class="py-4 border-top">
                        <RtSwitch class="cookies-group-toggle" v-model="formData.targ" />
                        <details class="cookies-group-item" open>
                            <summary class="cookies-group__header">
                                <div class="i-mdi-chevron-right cookies-group-expansion" />
                                <span class="align-middle"><strong>Targeting Cookies</strong></span>
                            </summary>
                            <p>
                                These cookies may be established on our site by our advertising partners to create a profile of your interests and display relevant advertisements on other sites.
                                While they do not store personal information directly, they rely on uniquely identifying your browser and internet device.
                                Opting not to allow these cookies may result in less personalized advertising.
                            </p>
                        </details>
                    </li>
                </ul>
            </div>
            <div class="grid sm:grid-cols-2 gap-2 p-4 border-top">
                <button class="btn btn-light" @click="acceptAll">Accept All</button>
                <button class="btn btn-primary" @click="save">Save Preferences</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.preferences-setting {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    animation: fade-in var(--transi-d);
    .preferences-setting-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
    }
    .preferences-setting-body {
        position: relative;
        width: 100%;
        max-width: $--container-md;
        border-radius: 0.25rem;
        background-color: var(--color-bg);
        box-shadow: 0 0 0.25rem 0.125rem rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .cookies-policy__main {
        max-height: 75vh;
        padding: 1rem;
        line-height: 1.5;
        font-size: 0.875rem;
        overflow-y: auto;
    }
    .cookies-group-toggle {
        float: right;
        z-index: 1;
    }
    .cookies-group-item {
        .cookies-group__header {
            display: block;
            list-style-type: none;
            font-size: 1rem;
            cursor: pointer;
            &::marker {
                content: "";
            }
            /* Safari */
            &::-webkit-details-marker {
                display: none;
            }
        }
        .cookies-group-expansion {
            margin-right: 0.5rem;
            font-size: 1.5rem;
            color: var(--color-theme);
            transform: rotate(90deg);
        }
        &[open] {
            .cookies-group-expansion {
                transform: rotate(-90deg);
            }
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}
</style>
