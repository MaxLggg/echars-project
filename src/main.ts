import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElIcons from "@element-plus/icons-vue";
import App from './App.vue'
import router from "./routers/index"
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(pinia)
  .mount("#app");
