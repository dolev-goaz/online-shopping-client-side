<template>
    <div class="number-input">
        <button @click="increaseAmount" v-if="!hideControls">
            <VIcon>mdi-plus</VIcon>
        </button>
        <slot>
            <span>
                {{ model }}
            </span>
        </slot>
        <button @click="decreaseAmount" v-if="!hideControls">
            <VIcon>mdi-minus</VIcon>
        </button>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';


const props = withDefaults(defineProps<{
    modelValue: number;
    min?: number;
    max?: number;
    hideControls?: boolean;
}>(), {
    min: -Infinity,
    max: Infinity,
    hideControls: false
});
const emit = defineEmits<{
    (event: "update:modelValue", value: number): void;
}>();

const model = computed({
    get() {
        return props.modelValue
    },
    set(newValue: number) {
        emit('update:modelValue', newValue);
    }
})

function increaseAmount() {
    model.value += 1;
}

function decreaseAmount() {
    model.value -= 1;
}

</script>

<style lang="scss" scoped>
.number-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
i.mdi {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    padding: 0.75rem;
    background-color: var(--clr-bg-dark);
    color: var(--clr-fg-light);
    border: 1px solid var(--clr-fg-light);

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.8);
    }
}
</style>