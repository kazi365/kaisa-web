<script setup lang="ts">
import news_1 from '@/assets/imgs/news/news_1.png'
import news_2 from '@/assets/imgs/news/news_2.png'
import news_3 from '@/assets/imgs/news/news_3.png'

import {ref} from "vue";

const news = ref<any[]>([
    {
        imgPath: news_1,
        title: '我省举行杭州亚运会亚残运会总结表彰大会 易炼红讲话 王浩主持',
        createdAt: '2024-01-21 19:26',
        // 概要
        desc: '1月20日上午，省委、省政府隆重举行杭州亚运会亚残运会总结表彰大会，深入学习贯彻习近平总书记考察浙江重要讲话精神和关于办好杭州亚运会' +
                '、亚残运会的重要指示精神，总结杭州亚运会、亚残运会成功举办宝贵经验，表彰亚运先进集体和先进个人，进一步激励全省上下以勇当先行者、谱写新篇章的使命自觉勇毅前行、拼搏进取、再立新功。',
        // 跳转链接
        link: '/news/new1',
    },
    {
        imgPath: news_2,
        title: '共同把握新机遇 携手打造新引擎——习近平主席向第二届全球数字贸易博览会致贺信汇聚共同发展新动能',
        createdAt: '2023-11-24 10:24',
        // 概要
        desc: '11月23日，习近平主席向第二届全球数字贸易博览会致贺信，在与会中外嘉宾和社会各界人士中引发热烈反响。',
        // 跳转链接
        link: '/news/new2',
    },
    {
        imgPath: news_3,
        title: '第19届亚洲运动会在杭州圆满闭幕 李强出席闭幕式',
        createdAt: '2023-10-09 08:34',
        // 概要
        desc: '亚运聚欢潮，璀璨共此时。第19届亚洲运动会8日晚在杭州圆满闭幕。国务院总理李强出席闭幕式。',
        // 跳转链接
        link: '/news/new3',
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
                        <p>{{ item.createdAt }}</p>
                        <hr>
                        <h3 class="mt-2">{{ item.title }}</h3>
                        <p>{{ item.desc }}</p>
                        <div class="mt-2 mdi-format-float-right">
                            <router-link :to="item.link">查看详情</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </article>
</template>


<style lang="scss">
.news {

    &::before {
        content: "";
        display: block;
        height: var(--header-height);
    }

    .banner {
        .news-card__img {
            img {
                width: 100%;
            }
        }
    }
    .news-list {
        width: 80%;
        margin: 0 auto;
        .news-list_item {
            display: flex;
            margin-bottom: 20px;
            .news-list__left__img {
                width: 40%;
                img {
                    width: 100%;
                }
            }
            .news-list__right__content {
                width: 55%;
                margin-left: 20px;
                padding-left: 20px;
                p {
                    font-size: 14px;
                    color: #666;
                }
                h3 {
                    font-size: 18px;
                    color: #333;
                }
                hr {
                    margin: 10px 0;
                }

            }
        }
    }
}
</style>
