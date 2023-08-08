<template>
    <button>
        <slot />
    </button>
</template>
<style scoped lang="scss">
button {
    --clr: #008190;
    padding-block: 0.375em;
    padding-inline: 2.5em;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid var(--clr);
    background-color: var(--clr);
    color: white;
    cursor: pointer;
    &:disabled {
        --clr: lightgray;
        cursor: default;
    }
}
</style>