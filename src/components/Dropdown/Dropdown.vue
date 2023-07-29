<template>
    <button ref="menuActivator" class="menu-activator" @click="onToggleMenu">
        <span>
            {{ placeholder }}
        </span>
        <Transition name="open-menu">
            <ul class="items-container" v-if="openMenu">
                <!-- idk why i need the casting here -->
                <li class="item" v-for="item in items" :key="item[itemKey as keyof T]"
                    :class="{ active: isActive(item) }">
                    <button @click="() => onSelect(item)">
                        {{ item[textKey as keyof T] }}
                    </button>
                </li>
            </ul>
        </Transition>
    </button>
</template>

<script lang="ts" setup generic="T extends Record<string, any>, TValueKey extends keyof T">
import { ref, computed } from 'vue';
import { onClickOutside } from "@vueuse/core"


const openMenu = ref(false);
const menuActivator = ref<HTMLButtonElement | null>(null);
onClickOutside(menuActivator, () => {
    openMenu.value = false;
})

const props = defineProps<{
    placeholder: string;
    items: T[];
    itemKey: keyof T;
    textKey: keyof T;
    valueKey: TValueKey;
    modelValue: T[TValueKey];
}>();
const emit = defineEmits<{
    (event: 'update:modelValue', payload: T[TValueKey]): void;
}>();

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value: T[TValueKey]) {
        emit('update:modelValue', value);
    }
});

function onToggleMenu(event: MouseEvent) {
    const target = event.target! as HTMLElement;
    if (target.closest('.items-container')) return;
    openMenu.value = !openMenu.value;
}
function onSelect(item: T) {
    model.value = item[props.valueKey];
    // openMenu.value = false;
}

function isActive(item: T) {
    const value = item[props.valueKey] === model.value;
    console.log(item[props.valueKey], value);
    return item[props.valueKey] === model.value;
}
</script>

<style lang="scss" scoped>
li.item {
    width: 100%
    // &>button {
        
    // }
}
li.item > button {
    width: 100%;
    border: 0;
    background-color: white;
    &:hover {
        filter: brightness(0.9);
    }
}
li.item.active > button {
    background-color: #586790;
    color: white;
}


.items-container {
    position: absolute;
    top: 100%;
    left: 0;

    background-color: white;
    padding: 0;
    list-style: none;
    width: 10rem;
}

.menu-activator {
    position: relative;
    border: 0;
}

.open-menu-enter-active,
.open-menu-leave-active {
    transition: opacity 100ms ease;
}

.open-menu-enter-from,
.open-menu-leave-to {
    opacity: 0;
}
</style>