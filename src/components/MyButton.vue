<template>
    <button>
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

button {
    --clr: var(--clr-accent);
    padding-block: 0.375em;
    padding-inline: 2.5em;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid var(--clr);
    background-color: var(--clr);
    color: var(--clr-fg-invert);
    cursor: pointer;

    &:disabled {
        --clr: lightgray;
        cursor: default;
    }

    &:not(:disabled) {
        --button-press-size: 2px;
        box-shadow: 0 var(--button-press-size) 1px 0 var(--clr-shadow-light);
        transition: translate 50ms ease;
        &:hover {
            filter: brightness(0.9);
        }

        &:active {
            filter: brightness(0.8);
            box-shadow: none;
            translate: 0 var(--button-press-size);
        }
    }
}
</style>