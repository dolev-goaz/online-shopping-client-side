<template>
    <LoadWrapper :loading="productStore.loadingProducts">
        <div>
            {{ productStore.currentProduct?.ProductName }}
        </div>
    </LoadWrapper>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/Product';
import LoadWrapper from '@/components/LoadWrapper.vue';

const router = useRoute();
const productStore = useProductStore();
productStore.getProductById(router.params.id as string);

</script>
<style scoped lang="scss"></style>