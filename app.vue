<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { COOKIES_CONSENT_KEY, $privacyConsent } from './components/privacy-consent'

const route = useRoute()
const cpu_layout = computed(() => {
  if (route.path.includes('page-printer')) return 'empty-layout';
  return 'default-layout';
})


</script>

<template>
  <NuxtLayout :name="cpu_layout">
    <NuxtPage />
  </NuxtLayout>
</template>
