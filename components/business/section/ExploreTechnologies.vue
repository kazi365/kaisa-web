<script setup lang="ts">
import { $contactDialog } from '@/components/business/login-dialog/index'

const sectionData = {
    subtitle: 'Whether you have a query about features, pricing, demo or anything else, our team is ready to answer all your questions.',
}

const doContact = () => {
    $contactDialog.create()
}
</script>

<template>
    <section class="explore-technologies">
        <div class="container px-4 mx-auto">
            <h2 class="section-title">Explore the latest technologies ahead of time</h2>
            <p class="text-center rt-color-white">{{ sectionData.subtitle }}</p>
            <div class="section-content">
                <button class="btn btn-touch" @click="doContact">GET IN TOUCH</button>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.explore-technologies {
    padding-top: 5rem;
    padding-bottom: 5rem;
    background-image: url("~/assets/imgs/bg/foot_box.jpg");
    background-position: center;
    background-size: cover;

    .section-title {
        margin-top: 0;
        text-align: center;
        color: #ffffff;
    }
    .section-content {
        text-align: center;
    }
    .btn-touch {
        padding: 0.75rem 2.75rem;
        border-radius: 1.5em;
        margin-top: 2rem;
        font-weight: bold;
        color: var(--color-theme);
        background-color: #ffffff;
    }
}
</style>
