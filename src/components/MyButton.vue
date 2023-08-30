<template>
    <button class="app-btn">
        <VProgressCircular class="loader" v-if="loading" size="30" width="4" indeterminate />
        <slot />
    </button>
</template>
<script lang="ts" setup>
const props = defineProps<{
    loading?: boolean;
}>();
</script>
<style scoped lang="scss">
button:has(.loader) {
    padding-inline-start: 0;
}

.loader {
    margin-inline: 1rem;
}
</style>