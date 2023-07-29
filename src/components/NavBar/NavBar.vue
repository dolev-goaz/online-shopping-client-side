<template>
    <nav>
        <ul>
            <li>
                <button>
                    {{ t('account') }}
                </button>
            </li>
            <li>
                <VSelect variant="outlined" density="compact" item-title="text" item-value="code" :items="languages" v-model="locale" :label="t('language')" />
            </li>
            <li>
            </li>
            <li></li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { MessageSchema, Locale } from "@/i18n"
import { locales } from "@/i18n"
import { computed } from 'vue';

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
    display: flex;
    padding: 0;
    list-style: none;
    gap: 0.5rem;
}
</style>