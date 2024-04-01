<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { COOKIES_CONSENT_KEY, $privacyConsent } from './components/privacy-consent'

const route = useRoute()
const cpu_layout = computed(() => {
  if (route.path.includes('page-printer')) return 'empty-layout';
  return 'default-layout';
})

const gtm = useGtm()
const privacyConsentCache = useLocalStorage(COOKIES_CONSENT_KEY, '');
(() => {
  if (privacyConsentCache.value === '0') {
    gtm?.enable(false)
    return;
  }
  try {
    const cacheJson = JSON.parse(privacyConsentCache.value)
    if (!cacheJson.pref) {
      gtm?.enable(false)
      return;
    }
  } catch (error) {
    // 
  }
})();
onMounted(() => {
  if (!privacyConsentCache.value) {
    $privacyConsent.createCookiesPolicy()
  }
})
</script>

<template>
  <NuxtLayout :name="cpu_layout">
    <NuxtPage />
  </NuxtLayout>
</template>
