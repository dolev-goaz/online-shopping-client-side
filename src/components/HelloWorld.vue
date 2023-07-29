<script setup lang="ts">
import * as DLService from "../DL";

function getProducts() {
  DLService.getProducts().then(console.log);
}

</script>

<template>
  <button type="button" @click="getProducts">Get Products</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
