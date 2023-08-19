<template>
    <div class="profile-page">
        <header>
            <PersonalInfo />
        </header>
        <CheckoutList :deals="dealStore.deals" />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useDealStore } from "@/store/Deal"
import CheckoutList from '@/components/Profile/CheckoutList.vue';
import PersonalInfo from '@/components/Profile/PersonalInfo.vue';
const dealStore = useDealStore();
onMounted(async () => {
    await dealStore.getAllDeals();
});
</script>
<style lang="scss" scoped>
.profile-page {
    height: 100%;
}
</style>