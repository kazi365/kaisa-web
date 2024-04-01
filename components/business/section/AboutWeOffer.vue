<script lang="ts" setup>

</script>

<template>
    <section id="we-offer" class="about-we-offer">
        <div class="container grid lg:grid-cols-2 items-center py-20 px-4 mx-auto">
            <div class="<md:hidden" />
            <div>
                <h2 class="mt-0 text-5xl rt-color-theme">What We Offer</h2>
                <p class="text-lg">
                    At Simlessly, we provide a diverse range of cutting-edge products and services that aim to enhance your digital experience.
                    Whether you are an MVNO in need of reliable and user-friendly provisioning services, a business seeking streamlined operations with integrated eSIM device testing solutions, an OEM looking to simplify xSIM-based cellular IoT management, or an ODM in search of xSIM integration services, we have the perfect solution for you.
                </p>
                <p class="text-lg">
                    Our team of highly skilled professionals is devoted to developing state-of-the-art software and operating systems, as well as offering services that adhere to the highest standards of quality and performance.
                    We consistently push the boundaries of technology to deliver the most advanced and user-friendly solutions available in the market.
                </p>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "~/assets/css/variables.module.scss";

.about-we-offer {
    background-image: url("~/assets/imgs/about-offer.png");
    background-position: center left;
    background-size: contain;
    background-repeat: no-repeat;

    @media screen and (max-width: $--container-lg) {
        background-image: none;
    }
}
</style>
