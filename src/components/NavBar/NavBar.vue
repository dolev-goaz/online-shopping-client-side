<template>
    <nav>
        <header v-if="authStore.isAdmin" class="admin-header">{{ t('admin.navbarHeader') }}</header>
        <ul>
            <li style="margin-inline-end: auto;">
                <RouterLink to="/">
                    <VIcon size="20">mdi-home</VIcon>
                </RouterLink>
            </li>
            <li>
                <button @click="() => toggleDark()">
                    <VIcon> {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }} </VIcon>
                </button>
            </li>
            <li v-if="!authStore.isAdmin">
                <RouterLink to="/cart">
                    <VIcon size="20">mdi-cart</VIcon>
                </RouterLink>
            </li>
            <li>
                <VMenu :close-on-content-click="false" v-model="openLoginPopup" transition="slide-y-transition">
                    <template #activator="{ props }">
                        <button v-bind="props">
                            <VIcon>mdi-account</VIcon>
                        </button>
                    </template>
                    <LoginPopupVue @close="() => openLoginPopup = false" />
                </VMenu>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import LoginPopupVue from "@/components/Profile/LoginPopup.vue"
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core'
import { useAuthStore } from "@/store/Authentication";
import { useI18n } from "vue-i18n";
import { MessageSchema } from "@/i18n";

const { t } = useI18n<MessageSchema>();
const authStore = useAuthStore();

const isDark = useDark({
    selector: 'body',
    // attribute: 'data-color-scheme',
    valueDark: 'dark',
    valueLight: 'light',
})
const toggleDark = useToggle(isDark)

const openLoginPopup = ref(false);

</script>
<style lang="scss" scoped>
.admin-header {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    font-size: 1.5rem;
    color: var(--clr-fg-light);
}
nav {
    position: sticky;
    inset-inline: 0;
    top: 0;
    color: black;
    border-bottom: 1px solid lightgray;
    padding-block: 1rem;
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

:is(button, a):has(i.mdi) {
    border-radius: 50%;
    background-color: var(--bg-clr);
    width: 2rem;
    height: 2rem;
    color: darkgray;
    border: 1px solid lightgray;

    text-decoration: none;

    display: grid;
    place-items: center;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.8);
    }
}
</style>