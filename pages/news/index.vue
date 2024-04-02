<script setup lang="ts">

import news_1 from '@/assets/imgs/news/news_1.png'


import {ref} from "vue";

const news = ref<any[]>([
    {
        imgPath: news_1,
        title: '我省举行杭州亚运会亚残运会总结表彰大会 易炼红讲话 王浩主持',
        createdAt: '2021-09-01',
        // 概要
        desc: '1月20日上午，省委、省政府隆重举行杭州亚运会亚残运会总结表彰大会，深入学习贯彻习近平总书记考察浙江重要讲话精神和关于办好杭州亚运会' +
                '、亚残运会的重要指示精神，总结杭州亚运会、亚残运会成功举办宝贵经验，表彰亚运先进集体和先进个人，进一步激励全省上下以勇当先行者、谱写新篇章的使命自觉勇毅前行、拼搏进取、再立新功。',
        // 跳转链接
        link: '/1',
    },
])


</script>


<template>
    <article class="news">
        <div class="banner">
            <div class="news-card__img">
                <img src="@/assets/imgs/news/news_bg.png" alt="news" />
            </div>
        </div>
        <section class="container py-20">
            <div class="news-list">
                <div class="news-list_item" v-for="(item, index) in news" :key="index">
                    <div class="news-list__left__img">
                        <img :src="item.imgPath" alt="news" />
                    </div>
                    <div class="news-list__right__content">
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.createdAt }}</p>
                        <p>{{ item.desc }}</p>
                        <router-link :to="item.link">Read More</router-link>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>


<style lang="scss">
.news {
    .banner {
        .news-card__img {
            img {
                width: 100%;
            }
        }
    }
    .news-list {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 0 auto;
        .news-list_item {
            display: flex;
            gap: 1rem;
            .news-list__left__img {
                img {
                    width: 100%;
                }
            }
            .news-list__right__content {
                margin-right: 1rem;
                h3 {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                p {
                    font-size: 1rem;
                    color: #666;
                }
                a {
                    color: #666;
                    text-decoration: none;
                    &:hover {
                        color: var(--color-theme);
                    }
                }
            }
        }
    }
}
</style>
