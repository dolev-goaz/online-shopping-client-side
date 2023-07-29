<template>
    <div ref="menuContainer" class="menu-container">
        <button class="menu-activator" @click="onToggleMenu">{{ placeholder }}</button>
        <Transition name="open-menu">
            <div class="items-container" v-if="openMenu">
                <!-- idk why i need the casting here -->
                <button class="item" v-for="item in items" :key="item[itemKey as keyof T]" @click="onSelect(item)">
                    {{ item[textKey as keyof T] }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import { ref } from 'vue';
import { onClickOutside } from "@vueuse/core"


const openMenu = ref(false);
const menuContainer = ref<HTMLDivElement | null>(null);
onClickOutside(menuContainer, () =>{
    openMenu.value = false;
})

const props = defineProps<{
    placeholder: string;
    items: T[];
    itemKey: keyof T;
    textKey: keyof T;
    valueKey: keyof T;
}>();

function onToggleMenu() {
    openMenu.value = !openMenu.value;
}
function onSelect(item: T) {

}
</script>

<style scoped>
.items-container {
    position: absolute;
    top: 0;
}

.menu-container {
    position: relative;
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