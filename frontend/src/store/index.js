import Vue from 'vue'
import Vuex from 'vuex'
import { ToastPlugin } from 'bootstrap-vue'
Vue.use(ToastPlugin)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    websiteName: "Groupomania"
  },
  getters: {
    copyright: (state) => {
			const currentYear = new Date().getFullYear()

			return `© Copyright ${currentYear} : ${state.websiteName}`
		}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
