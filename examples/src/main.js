import Vue from 'vue'
import App from '@/App.vue'
import TransformHelper from 'transform-helper'
window.TransformHelper = TransformHelper

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
