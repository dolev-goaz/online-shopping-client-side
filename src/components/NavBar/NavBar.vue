<template>
    <nav>
        <ul>
            <li>
                <button>
                    {{ authenticationText }}
                </button>
            </li>
            <li>
                <VSelect variant="outlined" density="compact" item-title="text" item-value="code" :items="languages"
                    v-model="locale" :label="t('language')" hide-details />
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
import { useAuthStore } from "@/store/Authentication";

const { t, locale } = useI18n<MessageSchema, Locale>();

const languages = computed(() => {
    return Object.entries(locales).map(([key, value]) => ({
        code: value,
        text: t(`languages.${key}`)
    }))
})

const authStore = useAuthStore();

const authenticationText = computed(() => {
    const key = authStore.isLoggedIn ? 'logout' : 'login';
    return t(`authentication.${key}`);
});

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
}</style>