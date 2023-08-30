<template>
    <div class="profile-page">
        <header>
            <PersonalInfo />
        </header>
        <div class="content">
            <template v-if="!authStore.isAdmin">
                <CheckoutList />
            </template>
            <template v-else>
                <AdminUserList />
            </template>
        </div>
    </div>
</template>
<script setup lang="ts">
import CheckoutList from '@/components/Profile/CheckoutList.vue';
import PersonalInfo from '@/components/Profile/PersonalInfo.vue';
import { useAuthStore } from '@/store/Authentication';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
import { useRouter } from 'vue-router';
import AdminUserList from '@/components/Profile/AdminUserList.vue';
const router = useRouter();

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