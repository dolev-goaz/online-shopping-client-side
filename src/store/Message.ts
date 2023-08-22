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
};


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
        errorMessage({ text, duration = _defaultDuration }: MessagePayload) {
            return this._setMessage({
                text,
                duration,
                type: 'error'
            });
        },
        successMessage({ text, duration = _defaultDuration }: MessagePayload) {
            return this._setMessage({
                text,
                duration,
                type: 'success'
            });
        },
        warningMessage({ text, duration = _defaultDuration }: MessagePayload) {
            return this._setMessage({
                text,
                duration,
                type: 'warning'
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
})