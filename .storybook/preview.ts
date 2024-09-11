import {type Preview, setup} from "@storybook/vue3";
import '../src/style.css'
import {type App} from 'vue';
import { createPinia } from 'pinia';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
    faXmark,
    faArrowRightFromBracket,
    faTrash,
    faPen,
    faPoo,
    faArrowDown19,
    faArrowUp19,
    faStopwatch
} from '@fortawesome/free-solid-svg-icons'

library.add(faXmark, faArrowRightFromBracket, faTrash, faPen, faPoo, faArrowDown19, faArrowUp19, faStopwatch)
/** THE MAIN CHANGE */

const pinia = createPinia();

setup((app: App) => {
    app.use(pinia);
    app.component('font-awesome-icon', FontAwesomeIcon)
})
const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
}

export default preview
