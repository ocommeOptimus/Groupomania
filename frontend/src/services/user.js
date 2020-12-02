import axios from 'axios'
import Vue from 'vue'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)

class UserRoutes {
    userRegister(userInfo) {
        return axios.post('http://localhost:3000/api/auth/register', userInfo)
        .catch((err) => {
            throw err
        })
    }
    userLogin(userLogInfo) {
        return axios.post('http://localhost:3000/api/auth/login', userLogInfo)
        .then((response) => {
            Vue.$cookies.set('user_session', response.data, '1d')
        })
        .catch((err) => {
            throw err
        })
    }
}


export default new UserRoutes()