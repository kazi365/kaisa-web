<script setup lang="ts">
import Header from './components/DefaultHeader.vue'
import AppMain from './components/DefaultMain.vue'
import Footer from './components/DefaultFooter.vue'
</script>

<template>
    <div class="default-layout">
        <Header />
        <AppMain><slot /></AppMain>
        <Footer />
    </div>
</template>

<style lang="scss">
.default-layout {
    --header-height: 3.5rem;
    --main-content-height: calc(100vh - var(--header-height));
}
</style>
