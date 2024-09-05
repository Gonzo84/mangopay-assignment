import {createApp} from 'vue'
import router from './router'
import './style.css'
import App from './App.vue'
import useFirebase from "./firebase";

useFirebase();

const app = createApp(App)
app.use(router);
app.mount('#app')