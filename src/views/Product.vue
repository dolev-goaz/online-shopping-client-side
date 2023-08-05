<template>
    <div v-if="productStore.loadingProducts">
        <VProgressCircular class="loader" size="100" width="10" indeterminate  absolute/>
    </div>
    <div v-else>
        {{ productStore.currentProduct?.ProductName }}
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/Product';

const router = useRoute();
const productStore = useProductStore();
productStore.getProductById(router.params.id as string);

</script>
<style scoped lang="scss">
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
</style>