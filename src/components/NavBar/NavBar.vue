<template>
    <nav>
        <ul>
            <li>
                <VMenu :close-on-content-click="false" transition="slide-y-transition">
                    <template #activator="{ props }">
                        <button v-bind="props">
                            <VIcon>mdi-account</VIcon>
                        </button>
                    </template>
                    <LoginPopupVue />
                </VMenu>
            </li>
            <li>
                <VSelect variant="outlined" density="compact" item-title="text" item-value="code" :items="languages"
                    v-model="locale" :label="t('language')" hide-details />
            </li>
            <li style="margin-left: auto;">
            </li>
            <li>
                <button @click="onHomeClick">
                    <VIcon>mdi-home</VIcon>
                </button>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { MessageSchema, Locale } from "@/i18n"
import { locales } from "@/i18n"
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginPopupVue from "@/components/Profile/LoginPopup.vue"

const { t, locale } = useI18n<MessageSchema, Locale>();

const languages = computed(() =>
    Object.entries(locales).map(([key, value]) => ({
        code: value,
        text: t(`languages.${key}`)
    }))
);

const router = useRouter();
function onHomeClick() {
    router.push('/')
}

</script>
<style lang="scss" scoped>
nav {
    position: sticky;
    inset-inline: 0;
    top: 0;
    background-color: gray;
    padding-block: 0.5rem;
    padding-inline: 5rem;
}

ul {
    margin-block: 0;
    display: flex;
    padding: 0;
    list-style: none;
    gap: 0.5rem;
}

li {
    display: grid;
    place-items: center;

    * {
        height: 100%;
    }
}

button:has(i.mdi) {
    border-radius: 50%;
    background-color: gray;
    width: 2rem;
    height: 2rem;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.8);
    }
}
</style>