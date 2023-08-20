<template>
    <article v-if="user">
        <header class="name">
            {{ user.firstName }} {{ user.lastName }}
        </header>
        <section class="details">
            {{ user.address }} {{ user.email }}
        </section>
        <div class="actions">
            <MyButton @click="onLogout" class="logout">
                {{ t('authentication.logout') }}
            </MyButton>
        </div>
    </article>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/Authentication';
import { computed } from 'vue';
import MyButton from '../MyButton.vue';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n<MessageSchema>();
const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);

function onLogout() {
    authStore
        .logout()
        .then(() => {
            router.push('/')
        });
}
</script>
<style scoped lang="scss">
article {
    direction: rtl;
    padding: 4rem;
    background-color: var(--clr-bg-dark);
    display: grid;
    grid-template-areas:
        'n _'
        'd a';
}

header.name {
    font-size: 3rem;
    line-height: 1;
    color: var(--clr-fg-light);
    font-weight: bold;
    grid-area: n;
}

section.details {
    grid-area: d;
    margin-block: auto;
}

.actions {
    grid-area: a;
    justify-self: end;
}
</style>