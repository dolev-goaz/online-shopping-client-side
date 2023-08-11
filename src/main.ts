import { createApp } from 'vue'
import './style.css'
import i18n from '@/i18n'
import App from './App.vue';
import "vuetify/styles"
import { createVuetify } from "vuetify"
import { VSelect, VIcon, VProgressCircular, VMenu } from "vuetify/components"
// import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import { createPinia } from 'pinia';
import { router } from './router';

const vuetify = createVuetify({
    components: {
        VSelect,
        VIcon,
        VProgressCircular,
        VMenu
    }, 
    locale: {
        rtl: {
            'he-IL': true,
            'en-US': false
        }
    }
})

const pinia = createPinia();

createApp(App)
    .use(i18n)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')
