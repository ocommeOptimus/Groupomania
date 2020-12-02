import Vue from 'vue'
import Vuex from 'vuex'
import { ToastPlugin } from 'bootstrap-vue'
import UserRoutes from '../services/user'
Vue.use(ToastPlugin)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {
      email: '',
      username: '',
      bio: '',
      password: ''
    },
    answer: {
      registration: [],
      login: []
    },
    currentUser: {
      id: '',
      infos: {}
    },
    websiteName: "Groupomania",
    // eslint-disable-next-line no-useless-escape
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  getters: {
    copyright: (state) => {
			const currentYear = new Date().getFullYear()

			return `© Copyright ${currentYear} : ${state.websiteName}`
    },
    emailValidation(state) {
      return state.regex.test(state.users.email)
    },
    usernameValidation(state) {
      return state.users.username.length > 4 && state.users.username.length < 13
    },
    passwordValidation(state) {
      return state.users.password.length > 4
    },
    getUser(state) {
      return state.users
    },
    getApiAnswer(state) {
      return state.answer
    }
  },
  mutations: {
    UPDATE_EMAIL_INPUT (state, email) {state.users.email = email},
    UPDATE_USERNAME_INPUT (state, username) {state.users.username = username},
    UPDATE_BIO_INPUT (state, bio) {state.users.bio = bio},
    UPDATE_PWD_INPUT (state, password) {state.users.password = password},
    REGISTER_USER (state, userInfo) {
      userInfo.email = state.users.email,
      userInfo.username = state.users.username,
      userInfo.bio = state.users.bio,
      userInfo.password = state.users.password
    },
    REGISTER_ANSWER (state, apiAnswer) {
      state.answer.registration = apiAnswer
    },
    LOGIN_ANSWER (state, apiAnswer) {
      state.answer.login = apiAnswer
    },
    /* LOGIN_ANSWER_BIS (state) {
      state.currentUser.id = Vue.$cookies.get('user_session').userId
    } */
  },
  actions: {
    userRegister({commit}, userInfo) {
      return UserRoutes.userRegister(userInfo)
      .then((response) => {
        commit('REGISTER_ANSWER', response)
        return Promise.resolve(response)
      },
      (error) => {
        commit('REGISTER_ANSWER', error)
        return Promise.reject(error)
      })
    },
    userLogin({commit}, userLogInfo) {
      return UserRoutes.userLogin(userLogInfo)
      .then((userLogInfo) => {
        console.log(userLogInfo)
        commit('LOGIN_ANSWER', userLogInfo)
        return Promise.resolve(userLogInfo)
      },
      (error) => {
        commit('LOGIN_ANSWER', error)
        return Promise.reject(error)
      })
    }
  },
  modules: {
  }
})
