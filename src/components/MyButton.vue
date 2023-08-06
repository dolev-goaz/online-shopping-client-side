<template>
    <button>
        <slot />
    </button>
</template>
<style scoped lang="scss">
button {
    padding-block: 0.375em;
    padding-inline: 2.5em;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid #008190;
    background-color: #008190;
    color: white;
    cursor: pointer;
}
</style>