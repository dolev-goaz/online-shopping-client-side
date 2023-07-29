<template>
    <nav>
        <ul>
            <li>
                <button>
                    {{ t('account') }}
                </button>
            </li>
            <li>
                <Dropdown v-model="locale" :placeholder="t('language')" :items="languages" item-key="code" text-key="text"
                    value-key="code" />
                <!-- <button @click="onToggleLanguage">
                    {{ t('language') }}
                </button> -->
            </li>
            <li></li>
            <li></li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { MessageSchema, Locale } from "@/i18n"
import { locales } from '@/i18n';
import { computed } from 'vue';
import Dropdown from "@/components/Dropdown/Dropdown.vue"

const { t, locale } = useI18n<MessageSchema, Locale>();

const languages = computed(() => {
    return Object.entries(locales).map(([key, value]) => ({
        code: value,
        text: t(`languages.${key}`)
    }))
})
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
    display: grid;
    padding: 0;
    list-style: none;
    gap: 0.5rem;
    grid-template-columns: repeat(2, 60px);
    width: max-content
}
li > button {
    border: none;
}
</style>