import heIL from "@/assets/locales/he-IL.json";
import enUs from "@/assets/locales/en-US.json";
import { createI18n } from "vue-i18n";

export type MessageSchema = [typeof heIL];
export type Locale = 'he-IL' | 'en-US';

const i18n = createI18n<MessageSchema, Locale>({
    legacy: false,
    locale: 'he-IL',
    messages: {
        'he-IL': heIL,
        'en-US': enUs
    }
});

export default i18n;