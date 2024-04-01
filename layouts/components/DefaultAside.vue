<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TMenu } from '~types/menu'

const route = useRoute()

const props = defineProps<{
    modelValue: boolean,
    menus?: TMenu[],
}>()
const emits = defineEmits<{
    (event: 'update:modelValue', val: boolean): void;
}>()

const self_value = ref(false)
const cpu_value = computed({
    get() {
        return props.modelValue ?? self_value.value;
    },
    set(val) {
        emits('update:modelValue', val)
        self_value.value = val
    }
})

const toggle = () => {
    cpu_value.value = !cpu_value.value
}

watch(() => route.fullPath, () => {
    cpu_value.value = false
})
</script>

<template>
    <aside class="aside">
        <transition name="as-m">
            <div v-show="cpu_value" class="aside-mask" @click="toggle" />
        </transition>
        <transition name="as-inn">
            <div v-show="cpu_value" class="aside__inner">
                <ul class="sidebar">
                    <li
                        v-for="item in props.menus"
                        :key="item.id"
                        class="side-item"
                        :class="{ 'side--active': item.path === route.path }"
                    >
                        <NuxtLink
                            class="side-label"
                            :class="{ 'side-link': item.path }"
                            :to="item.path"
                        >{{ item.label }}</NuxtLink>
                        <ul v-if="item.children?.length" class="sub-sidebar">
                            <li
                                v-for="subItem in item.children"
                                :key="subItem.id"
                                class="side-item"
                                :class="{ 'side--active': route.path === subItem.path }"
                            >
                                <NuxtLink
                                    class="side-label"
                                    :class="{ 'side-link': subItem.path }"
                                    :to="subItem.path"
                                >{{ subItem.label }}</NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </transition>
    </aside>
</template>

<style lang="scss">
@import "~/assets/css/variables.module.scss";

aside.aside {
    .aside-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 89;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .aside__inner {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99;
        width: 50%;
        max-width: $--container-sm;
        height: 100%;
        padding: 1rem;
        margin: 0;
        background-color: #ffffff;
    }
    .sidebar,
    .sub-sidebar {
        padding: 0;
        margin: 0;
        text-align: center;
        list-style: none;
    }
    .sidebar {
        > .side-item + .side-item {
            border-top: 1px solid #eeeeee;
        }
    }
    .sub-sidebar {
        margin-top: 0.5rem;
        .side-item .side-link {
            padding-top: 0.5em;
            padding-bottom: 0.5em;
        }
    }
    .side-item {
        .side-label {
            color: var(--color-text);
        }
        .side-link {
            display: block;
            padding-top: 1em;
            padding-bottom: 1em;
            &:hover {
                color: var(--color-theme);
            }
        }
        &.side--active .side-link {
            border-radius: 1rem;
            color: #ffffff;
            background-color: var(--color-theme);
        }
    }

    .as-m-enter-from,
    .as-m-leave-to {
        opacity: 0;
    }
    .as-m-enter-active,
    .as-m-leave-active {
        transition: opacity 0.25s ease;
    }
    .as-m-enter-to,
    .as-m-leave-form {
        opacity: 1;
    }

    .as-inn-enter-from,
    .as-inn-leave-to {
        transform: translateX(-100%);
    }
    .as-inn-enter-active,
    .as-inn-leave-active {
        transition: transform 0.25s ease;
    }
    .as-inn-enter-to,
    .as-inn-leave-form {
        transform: translateX(0);
    }
}
</style>