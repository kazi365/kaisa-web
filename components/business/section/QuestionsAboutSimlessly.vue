<script setup lang="ts">
import { $contactDialog } from '@/components/business/login-dialog/index'

const sectionData = {
    title: 'Still have questions about how simlessly can help your business?',
}

const doContact = () => {
    $contactDialog.create()
}
</script>

<template>
    <section class="question-about-simlessly">
        <div class="container py-20 px-4 mx-auto text-center">
            <h2 class="mt-0 text-3xl">{{ sectionData.title }}</h2>
            <div class="mt-10">
                <button class="btn btn-primary btn-contact" @click="doContact">
                    <span class="align-middle">Contact Sales!</span>
                    <div class="i-mdi-arrow-right ml-2" />
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.question-about-simlessly {
    color: #ffffff;
    background-image: url("~/assets/imgs/bg/foot_box.jpg");
    background-position: center;
    background-size: cover;
    .btn-contact {
        --bs-btn-border-color: transparent;
        --bs-btn-color: var(--color-theme);
        --bs-btn-bg: #ffffff;
    }
}
</style>
