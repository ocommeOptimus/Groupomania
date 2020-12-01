import Vue from 'vue'
import Vuex from 'vuex'
import { ToastPlugin } from 'bootstrap-vue'
import axios from 'axios'
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
    }
  },
  mutations: {
    UPDATE_EMAIL_INPUT (state, email) {state.users.email = email},
    UPDATE_USERNAME_INPUT (state, username) {state.users.username = username},
    UPDATE_BIO_INPUT (state, bio) {state.users.bio = bio},
    UPDATE_PWD_INPUT (state, password) {state.users.password = password},
    REGISTER_USER (state) {
      return state.users
    },
    REGISTER_USER_BIS(state, users) {
      state.users = users
    },
    REGISTER_USER_THIRD(state, users) {
      state.users = users
    }
  },
  actions: {
    userRegister({commit, state}, userInfo) {

      console.log(commit("REGISTER_USER")),
      console.log(commit("REGISTER_USER_BIS")),
      console.log(commit("REGISTER_USER_BIS", "users"))
      console.log(commit("REGISTER_USER_BIS", ...state.users))
      console.log(...state.users)
      console.log({...state.users.email})
      
      const infoUpdated = [...state.users]
      
      console.log('Hello World')

      axios.post('http://localhost:3000/api/auth/register', infoUpdated)
      .then(res => {
        commit()
        this.$bvToast.toast(`${res.data.username} created ! Your UserId is n° ${res.data.userId}`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        setTimeout(function() { window.location.pathname = '/login'; }, 6000)
      }, 
      err => {
        console.log(err.response)
        let errorArray = err.response.data.errors
        
        if (!errorArray) {
          this.$bvToast.toast(`${err.response.data.error}`, {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 5000 
          }
        )
        } else {
          this.$bvToast.toast(`Error at ${errorArray[0].param} field`, {
          title: errorArray[0].msg,
          variant: 'danger',
          autoHideDelay: 5000 
          })
        }
        }
      )
    }
  },
  modules: {
  }
})
