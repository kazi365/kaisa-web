<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

const rspSignUpUrl = runtimeConfig.public.NUXT_RSP_SIGNUP_URL
</script>

<template>
    <section class="pricing-rsp-comparison">
        <div class="container lg:max-w-screen-lg py-20 px-4 mx-auto">
            <h2 class="mt-0 text-center text-3xl">Full comparison</h2>
            <table class="comparison-table">
                <colgroup>
                    <col style="width: 16%;" />
                    <col style="width: 28%;" />
                    <col style="width: 28%;" />
                    <col style="width: 28%;" />
                </colgroup>
                <thead>
                    <tr>
                        <th>Features/Service</th>
                        <th>
                            <p class="mt-0 mb-2 text-2xl"><strong>BASIC</strong></p>
                            <nuxt-link :to="rspSignUpUrl" target="_blank">
                                <button class="btn btn-outline-primary rounded-3xl">Buy Now</button>
                            </nuxt-link>
                        </th>
                        <th>
                            <p class="mt-0 mb-2 text-2xl rt-color-theme"><strong>PRO</strong></p>
                            <nuxt-link :to="rspSignUpUrl" target="_blank">
                                <button class="btn btn-primary rounded-3xl">Buy Now</button>
                            </nuxt-link>
                        </th>
                        <th>
                            <p class="mt-0 mb-2 text-2xl rt-color-yellow"><strong>PREMIUM</strong></p>
                            <nuxt-link :to="rspSignUpUrl" target="_blank">
                                <button class="btn btn-outline-primary rounded-3xl">Buy Now</button>
                            </nuxt-link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Profile Configuration Visualization</td>
                        <td>For simpler use cases</td>
                        <td>
                            IMS Network Registration/<br />
                            MultilMSI and IMSI Recycling Applet/<br />
                            RF & Protocol Conformance Testing/<br/>
                            Private LTE and Private Lab
                        </td>
                        <td>More complex use cases and customized configuration</td>
                    </tr>
                    <tr>
                        <td>Profile Configuration</td>
                        <td>3</td>
                        <td>20</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Profile Format</td>
                        <td>Plain text/PGP enc</td>
                        <td>Plain text/PGP enc/INPUT-OUTPUT file</td>
                        <td>Plain text/PGP enc/INPUT-OUTPUT file/customer dedicated encryption</td>
                    </tr>
                    <tr>
                        <td>PLMN Network</td>
                        <td>1</td>
                        <td>50</td>
                        <td>10,000</td>
                    </tr>
                    <tr>
                        <td>Profile Management & Status Query</td>
                        <td>Console Portal</td>
                        <td>Console Portal/API Notification</td>
                        <td>Console Portal/API Notification/Account Manager</td>
                    </tr>
                    <tr>
                        <td>Re-download on one device with one AC</td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 1 time monthly)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 10 times monthly)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 100 times monthly)</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Re-download attempt on one device with one AC</td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 5 times monthly)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 20 times monthly)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Max 100 times monthly)</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Reset the Profile status(reset profile status and device binding)</td>
                        <td>-</td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Limited to Admin Account)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Limited to Admin and Sub Admin Account)</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Re-download for different devices with one AC</td>
                        <td>-</td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                        </td>
                    </tr>
                    <tr>
                        <td>Profile Import</td>
                        <td>Single/Batch</td>
                        <td>Single/Batch/API</td>
                        <td>Single/Batch/API/Customizable</td>
                    </tr>
                    <tr>
                        <td>AC Format</td>
                        <td>String Text/QR Code Picture</td>
                        <td>String Text/QR Code Picture/Zip/Download Link</td>
                        <td>String Text/QR Code Picture/Zip/Download Link/Customer Specific Format</td>
                    </tr>
                    <tr>
                        <td>AC QR Code logo</td>
                        <td>-</td>
                        <td><div class="i-mdi-check comparison-yes" /></td>
                        <td><div class="i-mdi-check comparison-yes" /></td>
                    </tr>
                    <tr>
                        <td>API Integration</td>
                        <td>-</td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(Standard Restful APIs)</div>
                        </td>
                        <td>
                            <div class="i-mdi-check comparison-yes" />
                            <div>(More & Rich APIs)</div>
                        </td>
                    </tr>
                    <tr>
                        <td>Dashboard & Report</td>
                        <td>Default Basic Statistics</td>
                        <td>Multidimensional Chart</td>
                        <td>Customizable</td>
                    </tr>
                    <tr>
                        <td>EID block</td>
                        <td>-</td>
                        <td><div class="i-mdi-check comparison-yes" /></td>
                        <td><div class="i-mdi-check comparison-yes" /></td>
                    </tr>
                    <tr>
                        <td>Account Number</td>
                        <td>1</td>
                        <td>5</td>
                        <td>Unlimited</td>
                    </tr>
                    <tr>
                        <td>Alert & Notification</td>
                        <td>Website</td>
                        <td>Website/email</td>
                        <td>Website/email/SMS</td>
                    </tr>
                    <tr>
                        <td>Security</td>
                        <td>Password Protected</td>
                        <td>Password Protected</td>
                        <td>Two-factor Authentication Exclusive Key Ceremony</td>
                    </tr>
                    <tr>
                        <td>API QPS</td>
                        <td>-</td>
                        <td>5</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Customer Service</td>
                        <td>email/in-app Chat</td>
                        <td>email/in-app Chat/Phone Support (weekdays/working hours) Professional Service</td>
                        <td>Dedicated Account Manager 24/7 Enterprise Service</td>
                    </tr>
                    <tr>
                        <td>Response Time</td>
                        <td v-html="'< 48h (Based on urgency)'"></td>
                        <td v-html="'< 24h (Based on urgency)'"></td>
                        <td v-html="'< 1h (Based on urgency)'"></td>
                    </tr>
                    <tr>
                        <td>SLA Uptime</td>
                        <td>99.9%</td>
                        <td>99.99%</td>
                        <td>99.999%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.pricing-rsp-comparison {
    .comparison-table {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        font-size: 0.875rem;
        overflow-wrap: anywhere;
        thead {
            position: sticky;
            top: var(--header-height);
            z-index: 9;
        }
        tbody tr:nth-child(2n) {
            background-color: #fafafb;
        }
        th + th,
        td + td {
            border-left: none;
        }
        th, td {
            padding: 0.5rem;
            border: 1px solid var(--color-border);
        }
        th {
            font-weight: normal;
            background-color: #ffffff;
        }
        .btn {
            --bs-btn-font-size: inherit;
        }
    }
    .comparison-yes {
        font-size: 1.5rem;
        color: var(--color-theme);
    }
}
</style>
