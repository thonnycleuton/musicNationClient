// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@/assets/css/style.css'
import axios from 'axios'

Vue.use(VueMaterial)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: function () {
    return {
      logado: false,
      especial: false,
      is_staff: false,
      auth: {
        headers: {Authorization: 'Token '}
      }
    }
  },
  mounted: function () {
    this.is_staff = localStorage.getItem('especial')
    this.$parent.is_staff = localStorage.getItem('especial')
    this.$root.is_staff = localStorage.getItem('especial')

    this.auth.headers.Authorization += localStorage.getItem('token')
    console.log('auth')
    console.log(this.auth)
    axios.get('http://localhost:8000/groupmembers/', this.auth).then((response) => {
      this.logado = true
    }, (err) => {
      console.log(err)
    })
  },
  components: { App },
  template: '<App/>'
})
