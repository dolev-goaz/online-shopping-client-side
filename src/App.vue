<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
import { useI18n } from "vue-i18n";
import { locales } from "./i18n";
import { watch } from "vue";
import { useAuthStore } from "./store/Authentication";
import { useLoadingStore } from "./store/Loading";
import { onMounted } from "vue";
const { locale } = useI18n();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

watch(locale, () => {
  const dir = (locale.value === locales.hebrew) ? 'rtl' : 'ltr';
  document.dir = dir;
}, {
  immediate: true
});

onMounted(async () => {
  loadingStore.startLoading('authentication');
  await authStore.loadAuthorization();
  loadingStore.finishLoading('authentication');
});
</script>

<template>
  <NavBar id="nav" />
  <div id="router-view">
    <VProgressCircular v-if="loadingStore.loading['authentication']" class="loader" size="150" width="10" indeterminate />
    <router-view v-else />
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
}
</style>

<style>
#app {
  display: flex;
  flex-direction: column;
  color: var(--clr-fg);
}

#nav {
  flex: 0 1 auto;
}

#router-view {
  flex: 1 1 auto;
  overflow-y: auto;
  position: relative;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}
</style>
