<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import type { TMenu } from '~types/menu'
import { $loginDialog} from '@/components/business/login-dialog'

const route = useRoute()

const { y } = useWindowScroll()

const { width: windowWidth } = useWindowSize()
const asideShow = ref(false)
const hasAside = computed(() => windowWidth.value < 1024)
const toggleAside = () => {
    asideShow.value = !asideShow.value
}

const menus = ref<TMenu[]>([
    { id: 'news', label: '新闻', path: '/news' },
    { id: 'events', label: '赛事', path: '/game' },
    { id: 'teams', label: '队伍', path: '/team' },
    { id: 'players', label: '球员', path: '/athlete' },
])

const doLogin = () => {
    $loginDialog.create()
}
</script>

<template>
    <header
        class="header"
        :class="{
            'header--light': true,
        }"
    >
        <div class="container px-4 mx-auto header__inner">
            <div class="header__left">
                <div
                    v-if="hasAside"
                    class="sidebar-switch"
                    :class="asideShow ? 'i-mdi-menu-open' : 'i-mdi-menu'"
                    @click="toggleAside"
                />
                <NuxtLink class="header-logo" to="/" />
            </div>
            <div class="header__right">
                <button class="btn btn-primary" @click="doLogin">登录</button>
            </div>
            <div class="header-content justify-between">
                <nav class="navbar">
                    <template v-if="!hasAside">
                        <div
                            v-for="link in menus"
                            :key="link.id"
                            class="mx-2 nav-item"
                            :class="{'nav--active': link.path === route.path}"
                            @mouseenter="link.childrenVisible = true"
                            @mouseleave="link.childrenVisible = false"
                        >
                            <NuxtLink class="nav-label" :to="link.path">{{ link.label }}</NuxtLink>
                            <div v-if="link.children?.length && link.childrenVisible" class="nav-childs">
                                <NuxtLink
                                    v-for="childLink in link.children"
                                    :key="childLink.id"
                                    class="rt-color-text"
                                    :to="childLink.path"
                                    @click="link.childrenVisible = false"
                                >{{ childLink.label }}</NuxtLink>
                            </div>
                        </div>
                    </template>
                </nav>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@import "~/assets/css/variables.module.scss";

header.header {
    --header-content-height: calc(var(--header-height) - 2rem);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 89;
    width: 100%;
    height: var(--header-height);
    color: #ffffff;
    transition: background-color 0.25s ease;
    .header__inner {
        height: 100%;
    }
    .header__left,
    .header__right,
    .header-content {
        display: flex;
        align-items: center;
        height: 100%;
    }
    .header__left {
        float: left;
        margin-right: 1rem;
    }
    .sidebar-switch {
        margin-right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
    }
    .header-logo {
        display: inline-block;
        width: 141px;
        height: 34px;
        background-image: url("~/assets/imgs/kaisa_logo.png");
        background-size: 100% 100%;
    }
    .header__right {
        float: right;
        margin-left: 1rem;
    }
    .navbar {
        line-height: var(--header-height);
        text-align: center;
        font-weight: 500;
    }
    .nav-item {
        position: relative;
        display: inline-block;
        width: 7rem;
        transition: transform 0.25s ease;
        .nav-label {
            display: inline-block;
            color: #ffffff;
            transition: transform 0.25s ease;
        }
        .nav-childs {
            position: absolute;
            top: 100%;
            left: 0;
            display: flex;
            flex-direction: column;
            min-width: 100%;
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
            line-height: 2.5;
            white-space: nowrap;
            background-color: var(--color-bg);
            a {
                display: inline-block;
                padding-right: 1rem;
                padding-left: 1rem;
                color: var(--color-text);
                &:hover {
                    color: #ffffff;
                    background-color: var(--color-theme);
                }
            }
        }
        &:hover {
            .nav-label {
                transform: scale(1.125);
            }
        }
        &.nav--active {
            .nav-label {
                font-weight: 600;
                transform: scale(1.125);
            }
        }
    }
    .search-entry {
        padding: 0.5rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        color: var(--color-text-light);
        background-color: rgba(249, 249, 249, 0.5);
        transition: border-color var(--transi-d);
        cursor: pointer;
        &:hover {
            border-color: var(--color-text);
        }
    }
    .search-entry-text {
        margin-left: 0.25rem;
        vertical-align: middle;
        font-size: 0.875rem;
    }
}
header.header.header--light {
    background-color: var(--color-bg);
    box-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.1);
    .sidebar-switch {
        color: var(--color-theme);
    }
    .header-logo {
        background-image: url("~/assets/imgs/kaisa_logo.png");
    }
    .header-contact {
        color: #ffffff;
        background-color: var(--color-theme);
    }
    .nav-item {
        .nav-label {
            color: var(--color-text);
        }
    }
}

@media (max-width: 1023.98px) {
    header.header {
        .navbar {
            display: none;
        }
        .search-entry-text {
            display: none;
        }
    }
}

@media (min-width: $--container-lg) {
    header.header {
        .sidebar-switch {
            display: none;
        }
    }
}
</style>
