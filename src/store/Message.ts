import { defineStore } from 'pinia';

type MessageType = 'error' | 'warning' | 'success';

export type Message = {
    text: string;
    type: MessageType;
    duration: number;
}

type MessageInner = Omit<Message, 'duration'>;

type MessagePayload = {
    text: string;
    duration?: number;
} | string;


interface StoreState {
    message: MessageInner | null;
    _msgTimeout: NodeJS.Timeout | undefined;
}

const _defaultDuration = 3000;

export const useMessageStore = defineStore("message-store", {
    state: (): StoreState => ({
        message: null,
        _msgTimeout: undefined,
    }),
    actions: {
        errorMessage(payload: MessagePayload): void {
            return this._setMessage({
                type: 'error',
                ...parseMessagePayload(payload),
            });
        },
        successMessage(payload: MessagePayload) {
            return this._setMessage({
                type: 'success',
                ...parseMessagePayload(payload),
            });
        },
        warningMessage(payload: MessagePayload) {
            return this._setMessage({
                type: 'warning',
                ...parseMessagePayload(payload),
            });
        },
        _setMessage(messageObject: Message) {
            clearTimeout(this._msgTimeout);

            this.message = {
                type: messageObject.type,
                text: messageObject.text
            }

            this._msgTimeout = setTimeout(() => {
                this.message = null;
            }, messageObject.duration);
        }
    },
    getters: {
    }
});

function parseMessagePayload(payload: MessagePayload) {
    const [text, duration] = typeof payload === 'string'
        ? [payload, _defaultDuration]
        : [payload.text, payload.duration ?? _defaultDuration];

    return {
        text,
        duration
    };
}