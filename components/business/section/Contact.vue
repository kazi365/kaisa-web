<script setup lang="ts">
const text = '<strong>Mail</strong>: contact@simlessly.com'
</script>

<template>
    <div class="contact">
        <div class="container px-4 mx-auto text-center">
            <h2 class="mt-0 text-3xl">Contact Us!</h2>
            <a class="mb-0 text-2xl underline rt-color-white" href="mailto:contact@simlessly.com">contact@simlessly.com</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.contact {
    padding-top: 5rem;
    padding-bottom: 5rem;
    color: #ffffff;
    background-image: url("~/assets/imgs/bg/foot_box.jpg");
    background-position: center;
    background-size: cover;
    .section-title {
        margin-top: 0;
        margin-bottom: 2rem;
        text-align: center;
    }
    .section-content {
        text-align: center;
    }
}
</style>