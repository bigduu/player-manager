import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import './style.css'
import 'video.js/dist/video-js.css'
import VueVideoPlayer from '@videojs-player/vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './route/router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(VueVideoPlayer).use(router).mount('#app')
