<template>
    <button>
        <slot />
    </button>
</template>
<style scoped lang="scss">
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
}
</style>