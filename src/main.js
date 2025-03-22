import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './scripts/uils/element.js'
import { createPinia, PiniaVuePlugin } from 'pinia'
import dayjs from "dayjs";
import directive from "@/scripts/uils/directive";
import "@/scripts/uils/momentum.js"

Vue.use(PiniaVuePlugin)
Vue.use(directive)
const pinia = createPinia()


Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs

//这个方法需要放在new Vue之前，不然按F5刷新页面不会调用这个方法
router.beforeEach( (to, from, next) => {
  if (to.meta.needLogin) {
    let loginState = sessionStorage.getItem('login') || 0
    if(loginState === 0){
      next('/login');
    }else{
      next();
    }
  }else{
    // if(to.name !== 'Login'){
    //   next('/login');
    // }else{
      next();
    // }
  }
})

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')