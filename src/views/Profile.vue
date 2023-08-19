<template>
    <div>
        <CheckoutList :deals="dealStore.deals" />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useDealStore } from "@/store/Deal"
import CheckoutList from '@/components/CheckoutList.vue';
const dealStore = useDealStore();
onMounted(async () => {
    await dealStore.getAllDeals();
})
</script>
<style lang="scss" scoped></style>