import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import store from './store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

// name is optional
Vue.use(VueLodash, { lodash: lodash })

Vue.use(VueMoment, {
    moment,
})

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
