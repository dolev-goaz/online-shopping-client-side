<template>
    <div style="position: relative;" :class="{ hover: !isOutside }">
        <img ref="image" :src="src" v-bind="attrs">
        <div class="preview-container" v-if="!isOutside">
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
const { isOutside, elementX, elementY, elementWidth, elementHeight } = useMouseInElement(image)

const transform = computed(() => {
    const ratioX = 100 * elementX.value / elementWidth.value;
    const ratioY = 100 * elementY.value / elementHeight.value;
    
    const offsetX = elementWidth.value / 2;
    const offsetY = elementHeight.value / 2;
    return `translate(calc(${-ratioX}% + ${offsetX}px), calc(${-ratioY}% + ${offsetY}px))`;
});
</script>

<style scoped lang="scss">
.preview-container {
    direction: ltr;
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
        // height: 100%;
        object-fit: cover;
    }
}

.hover {
    .preview-container>img {
        width: 100vw;
        // width: auto;
        // height: auto;
    }
}
</style>