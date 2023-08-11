<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
import { useI18n } from "vue-i18n";
import { locales } from "./i18n";
import { watch } from "vue";
import { useLocale } from "vuetify";
const { locale } = useI18n();
const { current } = useLocale();

watch(locale, () => {
  const dir = (locale.value === locales.hebrew) ? 'rtl' : 'ltr';
  document.dir = dir;
  
  current.value = locale.value;
}, {
  immediate: true
});
</script>

<template>
  <NavBar id="nav" />
  <div id="router-view">
    <router-view />
  </div>
</template>

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
