import { createApp } from 'vue'
import './style.css'
import i18nInstance from '@/i18n'
import App from './App.vue';
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { VSelect, VIcon, VProgressCircular, VMenu, VDialog } from "vuetify/components"
import { he } from "vuetify/locale"
// import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import { createPinia } from 'pinia';
import { router } from './router';

const vuetify = createVuetify({
    components: {
        VSelect,
        VIcon,
        VProgressCircular,
        VMenu,
        VDialog
    },
    locale: {
        locale: 'he-IL',
        fallback: 'he-IL',
        messages: { 'he-IL': he },
        rtl: {
            'he-IL': true,
            'en-US': false,
        }
    }
})

const pinia = createPinia();

createApp(App)
    .use(i18nInstance)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')
