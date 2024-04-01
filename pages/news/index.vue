<script setup lang="ts">


</script>


<template>
    <article class="news">
        <div class="banner">
            <div class="news-card__img">
                <img src="@/assets/imgs/news/news_bg.png" alt="news" />
            </div>
        </div>
        <section class="container py-20">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <span v-for="i in 6" :key="i" class="news-card">
                    <NuxtLink to="/news/1">
                        <div class="news-card__img">
                            <img src="https://via.placeholder.com/300" alt="news" />
                        </div>
                        <div class="news-card__content">
                            <h4 class="news-card__title">Title</h4>
                            <p class="news-card__desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </NuxtLink>
                </span>
            </div>
        </section>
    </article>
</template>


<style lang="scss">

</style>
