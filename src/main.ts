import {createApp} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import './style.css'
import "./firebase";
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faXmark,
    faArrowRightFromBracket,
    faTrash,
    faPen,
    faPoo,
    faArrowDown19,
    faArrowUp19,
    faStopwatch
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

library.add(faXmark, faArrowRightFromBracket, faTrash, faPen, faPoo, faArrowDown19, faArrowUp19, faStopwatch);

const app = createApp(App)
app.use(router);
app.use(createPinia());
app.use(VueTailwindDatepicker as any);
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')