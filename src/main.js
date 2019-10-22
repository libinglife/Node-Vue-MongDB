// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import vueAxios from "vue-axios"
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(vueAxios,axios);
Vue.use(infiniteScroll);

import VueLazyLoad from 'vue-lazyload'

Vue.use(vueAxios,axios);

Vue.use(VueLazyLoad,{
	preLoad:'1.3', //预加载高度比例
    loading: 'static/loading-svg/loading-bars.svg',
    attempt:3, //尝试计数
    try: 3 // defaulst 1
});

Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
