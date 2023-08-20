<template>
    <article>
        <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
            :alt="fullName">
        <div v-for="infoBlock in infoBlocks" :key="infoBlock.header">
            <header>
                {{ infoBlock.header }}
            </header>
            <div class="content">
                {{ infoBlock.value }}
            </div>
        </div>
        <div class="permission-block">
            <header>
                {{ t('user.permission') }}
            </header>
            <div class="content">
                <VSelect :disabled="disabled" :placeholder="t('user.permission')" v-model="userEdited.role"
                    :items="possibleRoles" density="compact" hide-details />
            </div>
        </div>
        <div class="save">
            <Transition name="fade">
                <button @click="onSave" v-if="!disabled && wasUpdated">
                    <VIcon>mdi-content-save</VIcon>
                </button>
            </Transition>
        </div>
    </article>
</template>
<script setup lang="ts">
import { Roles } from '@/@types/Model';
import { type UserResult } from '@/DL/User';
import { MessageSchema } from '@/i18n';
import { ref } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n<MessageSchema>();

const props = defineProps<{
    user: UserResult;
    disabled?: boolean;
}>();

const fullName = computed(() => `${props.user.firstName} ${props.user.lastName}`);

const infoBlocks = computed(() => {
    const pairs = [
        ['user.fullname', fullName.value],
        ['user.address', props.user.address],
        ['user.email', props.user.email],
    ]

    return pairs.map(([translateKey, value]) => ({
        header: t(translateKey),
        value
    }));
});

const possibleRoles = computed(() => Object.values(Roles));

const userEdited = ref<UserResult>({ ...props.user });
watch(props.user, () => {
    userEdited.value = { ...props.user };
});
const wasUpdated = computed(() => userEdited.value.role !== props.user.role);
function onSave() {

}

</script>
<style lang="scss">
.permission-block .v-select .v-field__input {
    --padding-block: 0.125rem;
    --v-field-input-padding-top: var(--padding-block);
    --v-field-input-padding-bottom: var(--padding-block);
}
</style>

<style lang="scss" scoped>
article {
    --height: 5rem;
    // height: var(--height);

    padding: 1rem;
    box-sizing: content-box;
    border: 2px solid var(--clr-bg-dark);
    border-radius: 0.25rem;

    display: grid;
    grid-template-rows: var(--height);
    grid-template-columns: var(--height) repeat(4, 1fr) var(--height);
    place-items: center;
    grid-column-gap: 1rem;

    &>img {
        height: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        display: block;
        border-radius: 0.375rem;
    }
}

article>* {
    height: 100%;
    display: flex;
    flex-direction: column;

    &>header {
        color: var(--clr-fg);
        font-size: 0.875rem;
    }

    &>.content {
        color: var(--clr-fg-light);
        font-size: 1.125rem;
        line-height: 1;
        margin-block: auto;
    }

    &.save {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>