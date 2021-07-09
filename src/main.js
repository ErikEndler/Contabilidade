import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Maska from 'maska'
import Toast, { POSITION } from 'vue-toastification'
import './assets/css/custom/custom.css'
import './assets/css/custom/loaders.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toastification/dist/index.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();


const app = createApp(App)
app.use(Maska)
app.use(router)
app.mount('#app')
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
