<script lang="ts" setup>
import { ref } from 'vue'

const videoVisible = ref(false)
const showVideo = () => {
    videoVisible.value = true
}
const closeVideo = () => {
    videoVisible.value = false
}
</script>

<template>
    <section class="home-simlessly">
        <div class="container py-20 px-4 mx-auto">
            <div class="text-center">
                <img class="h-16" alt="" src="@/assets/imgs/simlessly_logo_2.png" />
                <p class="text-3xl">Seamlessly Empowering Enterprises with SIM-less Services</p>
                <div class="simlessly-video-operation">
                    <img alt="" src="~/assets/imgs/what_is_Simlessly.jpg" />
                    <button class="btn btn-primary video-play" @click="showVideo">
                        <div class="i-mdi-play text-5xl" />
                    </button>
                </div>
            </div>
        </div>
        <Transition name="simlessly-video-container">
            <div v-if="videoVisible" class="simlessly-video-container">
                <div class="container xl:max-w-screen-xl px-4 flex flex-col items-center justify-center">
                    <video class="max-w-full max-h-75vh" autoplay controls>
                        <source src="/video/Simlessly_Corporate_Video_1st_Release.mp4" type="video/mp4" />
                    </video>
                    <button class="btn btn-light mt-8 text-3xl" @click="closeVideo">
                        <div class="i-mdi-close" />
                    </button>
                </div>
            </div>
        </Transition>
    </section>
</template>

<style lang="scss" scoped>
.home-simlessly {
    .simlessly-video-operation {
        position: relative;
        display: inline-block;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 5px; // source img has 5px bottom border
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            transition: background-color var(--transi-d);
        }
        &:hover::after {
            background-color: rgba(0, 0, 0, 0.4);
        }
    }
    .video-play {
        --bs-btn-hover-color: var(--color-theme);
        --bs-btn-hover-bg: #ffffff;

        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        padding: 1rem 2rem;
        border-radius: 1rem;
        transform: translate(-50%, -50%);
    }
    .simlessly-video-container-enter-from {
        opacity: 0;
    }
    .simlessly-video-container-enter-active {
        transition: opacity 0.25s linear;
    }
    .simlessly-video-container-enter-to {
        opacity: 1;
    }
    .simlessly-video-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        display: grid;
        place-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
}
</style>
