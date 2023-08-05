<template>
    <div style="position: relative;" :class="{ hover: !isOutside }">
        <img ref="image" :src="src" v-bind="attrs">
        <div class="preview-container">
            <img :src="src" :style="{ transform }">
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useMouseInElement } from "@vueuse/core"
import { computed } from "vue";
import { ref, useAttrs } from "vue";
const attrs = useAttrs();
const props = defineProps<{
    src: string;
}>();
const image = ref<HTMLImageElement | null>();
const { isOutside, x, y,elementPositionX,elementPositionY,elementX,elementY } = useMouseInElement(image)

const transform = computed(() => `translate(${elementX.value}px, ${elementY.value}px)`);
</script>

<style scoped lang="scss">
.preview-container {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.hover {
    .preview-container>img {
        width: auto;
        height: auto;
    }
}
</style>