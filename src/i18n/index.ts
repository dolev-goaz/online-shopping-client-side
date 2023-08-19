import heIL from "@/assets/locales/he-IL.json";
import enUs from "@/assets/locales/en-US.json";
import { createI18n } from "vue-i18n";

export type MessageSchema = [typeof heIL];
export const locales = {
    hebrew: 'he-IL',
    // english: 'en-US'
} as const;
export type Locale = typeof locales[keyof typeof locales];

const i18n = createI18n<MessageSchema, Locale>({
    legacy: false,
    locale: 'he-IL',
    messages: {
        'he-IL': heIL,
        // 'en-US': enUs
    },
    datetimeFormats: {
        'he-IL': {
            long: {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
        }
    }
});

export default i18n;