<template>
    <article>
        <div class="image-wrapper">
            <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                :alt="fullName">
            <div class="current-user-indicator" v-if="isCurrentUser">
                {{ t('message.you') }}!
            </div>
        </div>
        <div v-for="{ header, key } in infoBlocks" :key="header">
            <header>
                {{ header }}
            </header>
            <EditableField tag="div" class="content" v-model="userProxy[key].value" />
        </div>
        <div class="permission-block">
            <header>
                {{ t('user.permission') }}
            </header>
            <div class="content">
                <VSelect :disabled="isCurrentUser" :placeholder="t('user.permission')" v-model="userProxy.role.value"
                    :items="possibleRoles" density="compact" hide-details />
            </div>
        </div>
        <div class="save">
            <Transition name="fade">
                <button @click="onSave" v-if="wasUpdated">
                    <VIcon>mdi-content-save</VIcon>
                </button>
            </Transition>
        </div>
    </article>
</template>
<script setup lang="ts">
import { Roles, UserReduced } from '@/@types/Model';
import { MessageSchema } from '@/i18n';
import { WritableComputedRef } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import EditableField from '../EditableField.vue';
const { t } = useI18n<MessageSchema>();

const props = defineProps<{
    user: UserReduced;
    isCurrentUser?: boolean;
}>();

const fullName = computed(() => formatFullName(userProxy.firstName.value, userProxy.lastName.value));
function formatFullName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
}

const infoBlocks = computed(() => {
    const pairs: Array<[string, keyof UserReduced]> = [
        ['user.firstname', 'firstName'],
        ['user.lastname', 'lastName'],
        ['user.email', 'email'],
        ['user.address', 'address'],
    ];

    return pairs.map(([translateKey, value]) => ({
        header: t(translateKey),
        key: value
    }));
});

const possibleRoles = computed(() => Object.values(Roles));


const userEdited = ref<Partial<UserReduced>>({});
watch(props.user, () => {
    userEdited.value = {};
}, {
    immediate: true
});
function setValue<TKey extends keyof UserReduced>(key: TKey, value: UserReduced[TKey]) {
    userEdited.value[key] = value;
}
function getValue<TKey extends keyof UserReduced>(key: TKey) {
    return userEdited.value[key] ?? props.user[key];
}
const userProxy = {} as Record<keyof UserReduced, WritableComputedRef<any>>;
const keys: Array<keyof UserReduced> = ['address', 'email', 'firstName', 'lastName', 'role'];
keys.forEach((key) => {
    userProxy[key] = computed({
        get() {
            return getValue(key)
        },
        set(value: UserReduced[typeof key]) {
            setValue(key, value);
        }
    })
});


const wasUpdated = computed(() => {
    const entries = Object.keys(userEdited.value) as Array<keyof UserReduced>;
    return entries.some((key) => props.user[key] != userEdited.value[key]);
});
const emit = defineEmits<{
    (event: 'save', user: Partial<UserReduced>): void;
}>();
function onSave() {
    if (!wasUpdated.value) return;
    emit('save', userEdited.value);
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
    grid-template-columns: var(--height) repeat(5, 1fr) var(--height);
    place-items: center;
    grid-column-gap: 1rem;

    &>.image-wrapper {
        position: relative;

        &>img {
            height: 100%;
            object-fit: cover;
            aspect-ratio: 1 / 1;
            display: block;
            border-radius: 0.375rem;
        }

        &>.current-user-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            rotate: 15deg;

            font-size: 1.5rem;
            color: var(--clr-accent);
        }
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

.save i.mdi {
    border-radius: 50%;
    padding: 0.25rem;
    background-color: var(--clr-bg);
    transition: filter 200ms ease;

    &:hover {
        filter: brightness(0.9);
    }

    &:active {
        filter: brightness(0.8);
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