import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    },
    theme: {
        defaultTheme: 'dark'
    }
})
app.use(vuetify)

app.mount('#app')
