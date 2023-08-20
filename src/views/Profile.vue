<template>
    <div class="profile-page">
        <template v-if="authStore.isLoggedIn">
            <header>
                <PersonalInfo />
            </header>
            <div class="content">
                <CheckoutList />
            </div>
        </template>
        <strong class="not-logged-in" v-else>
            {{ t('message.notLoggedIn') }}
        </strong>
    </div>
</template>
<script setup lang="ts">
import CheckoutList from '@/components/Profile/CheckoutList.vue';
import PersonalInfo from '@/components/Profile/PersonalInfo.vue';
import { useAuthStore } from '@/store/Authentication';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
const { t } = useI18n<MessageSchema>();

const authStore = useAuthStore();
</script>
<style lang="scss" scoped>

.profile-page:has(strong.not-logged-in) {
    height: 100%;
    display: grid;
    place-items: center;
}
.profile-page>strong:only-child {
    font-size: 5rem;
    margin-bottom: 2em;
}
.profile-page {
    height: 100%;
}

header {
    margin-bottom: 2rem;
}

.content {
    padding-inline: 2rem;
}
</style>