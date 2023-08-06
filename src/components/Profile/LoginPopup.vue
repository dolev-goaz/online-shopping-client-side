<template>
    <div class="login-popup">
        <div class="actions">
            <button class="login">
                {{ t('authentication.login') }}
            </button>
            <button class="register">
                {{ t('authentication.registration') }}
            </button>
        </div>
        <ul class="redirects">
            <li>
                <a href="#/profile">{{ t('pageName.profile') }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { Locale, MessageSchema } from '@/i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<MessageSchema, Locale>();
</script>
<style scoped lang="scss">
.login-popup {
    background-color: white;
    border-radius: 0.5rem;
    width: 18.5rem;
}
.actions {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
}
.actions > button {
    padding-block: 0.375em;
    box-shadow: 0 2px 1px 0 #ccc;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    text-align: center;
    border: 1px solid #008190;
    &.login {
        background-color: #008190;
        color: white;
    }
    &.register {
        color: #008190;
        background-color: white;
    }
    &:hover {
        filter: brightness(0.9);
    }
    &:active {
        filter: brightness(0.8);
    }
}
ul.redirects {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;  
    li {
        &:hover {
            filter: brightness(0.9);
        }
        &:active {
            filter: brightness(0.8);
        }
        background-color: white;
    }
    li > a {
        text-decoration: none;
        display: block;
        padding: 1rem;
        text-align: right;
        width: 100%;
    }
}
</style>