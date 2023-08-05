<template>
    <div v-if="loading">
        <VProgressCircular class="loader" size="100" width="10" indeterminate absolute />
    </div>
        <slot v-else />
</template>
<script lang="ts" setup>
const props = defineProps<{
    loading: boolean;
}>();
</script>
<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
</style>