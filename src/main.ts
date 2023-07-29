import { createApp } from 'vue'
import './style.css'
import i18n from '@/i18n'
import App from './App.vue';
import "vuetify/styles"
import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    }
})

createApp(App)
    .use(i18n)
    .use(vuetify)
    .mount('#app')
