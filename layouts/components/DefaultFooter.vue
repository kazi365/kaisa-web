<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

</script>

<template>
    <footer class="footer">
        <div class="container px-4 mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 info-groups">
               <p>
                   杭州第19届亚运会组委会
               </p>
                <p>
                    中国浙江省杭州市上城区富春路150号昆仑中心B座
                </p>
                <p>
                    邮编：310016
                </p>
                <p>
                    邮箱：info@hangzhou2022.cn
                </p>
            </div>
            <div class="flex items-center justify-between gap-y-2 mt-6 mb-8">
                <span class="text-xs">Copyright © 2024 温州大学 胡攀. All Rights Reserved.</span>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
@import "~/assets/css/variables.module.scss";

footer.footer {
    color: #ffffff;
    background-color: #282E43;
    overflow: hidden;
    .footer-logo {
        width: 141px;
        height: 34px;
    }
    .follow-icon {
        width: 1.25rem;
        height: 1.25rem;
        color: #ffffff;
        &:hover {
            color: rgba(255, 255, 255, 0.75);
        }
    }
    .info-groups {
        margin-top: 2rem;
        border-bottom: 1px solid #ffffff;
    }
    .info-group-item {
        flex-basis: 25%;
        margin-bottom: 1.5rem;
        .info-group-title {
            margin: 0;
        }
        .info-group-childs {
            padding: 0;
            margin-bottom: 0;
            line-height: 2;
            font-size: 0.875rem;
            list-style: none;
            a {
                color: #ffffff;
                &:hover {
                    color: rgba(255, 255, 255, 0.75);
                }
            }
        }
    }
}

@media (max-width: $--container-lg) {
    footer.footer {
        .info-group-item {
            flex-basis: calc( 1 / 3 * 100%);
        }
        .info-group-item.info-logo {
            flex-basis: 100%;
        }
    }
}

@media (max-width: $--container-sm) {
    footer.footer {
        .info-groups .info-group-item {
            flex-basis: 50%;
        }
        .info-group-item.info-logo {
            flex-basis: 100%;
        }
        .info-groups .info-group-item:last-child {
            flex-basis: 100%;
        }
    }
}
</style>
