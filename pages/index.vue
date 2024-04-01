<script lang="ts" setup>
import HomeSimlessly from '@/components/business/section/HomeSimlessly.vue'
import WhyUs from '@/components/business/section/WhyUs.vue'
import Truster from '@/components/business/section/Truster.vue'


const { push } = useRouter()


push('/news')

</script>

<template>
    <article class="home">
        <section class="banner">
            <div class="container px-4 mx-auto banner-content">
                <h1>专业的电竞赛事数据服务商</h1>
                <p>为电竞行业提供专业的赛事数据服务，为电竞爱好者提供最新的电竞赛事资讯</p>
                <button class="btn btn-primary btn-contact" @click="toIndexSearch">立即搜索</button>
            </div>
            <div class="bball-container">
                <div class="after-bball"></div>
            </div>
        </section>
        <HomeSimlessly />
        <WhyUs />
        <Truster />
    </article>
</template>

<style lang="scss">
@import "~/assets/css/variables.module.scss";

.home {
    .banner {
        letter-spacing: 0.125rem;
        background:
            url("~/assets/imgs/banner/home.jpg"),
            linear-gradient(to right, #ffffff, #ffffff 25%, #EFF1FE 50%, #EFF1FE);
        background-position: center center;
        background-size: cover;
        &::before {
            content: "";
            display: block;
            height: var(--header-height);
        }
    }
    .banner-content {
        position: relative;
        line-height: 1.5;
        font-size: 1.375rem;
        color: #ffffff;
        animation: 2s ease 0s title-enter;
    }
    .btn-contact {
        --bs-btn-border-color: #ffffff;
        --bs-btn-color: #ffffff;
    }
    .bball-container {
        position: relative;
        overflow: hidden;
        &::before {
            content: "";
            position: absolute;
            top: 40%;
            left: 0;
            display: block;
            width: 10rem;
            height: 10rem;
            border-radius: 50%;
            background-color: #D8E1FC;
            transform: translateX(-10%);
        }
        .after-bball {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                display: block;
                width: 22.5rem;
                height: 22.5rem;
                border-radius: 50%;
                background-color: #D8E1FC;
                transform: translateY(-50%);
            }
            &::after {
                content: "";
                position: absolute;
                top: 20%;
                right: 0;
                display: block;
                width: 16.5rem;
                height: 16.5rem;
                border-radius: 50%;
                background-color: #D8E1FC;
                transform: translateX(50%);
            }
        }
    }

    @keyframes title-enter {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}

@media (max-width: $--container-lg) {
    .home {
        .banner-content {
            text-align: center;
            font-size: 1.25rem;
        }
    }
}

@media (max-width: $--container-sm) {
    .home {
        .banner-content {
            font-size: 1rem;
        }
    }
}
</style>
