<script setup lang="ts">
import NavBar from "@/components/NavBar/NavBar.vue";
</script>

<template>
  <NavBar id="nav"/>
  <router-view id="router-view" />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  color: white;
}
#nav {
  flex: 0 1 auto;
}
#router-view {
  flex: 1 1 auto;
  overflow-y: auto;
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
