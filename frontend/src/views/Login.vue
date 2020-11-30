<template>
  <div class="login my-3 mx-md-5">
    <form>
      <div class="form-group p-3 mb-0" v-if="loginType">
        <b-form-input type="email" class="form-control" id="emailInput" placeholder="your@email.com" v-model="email"></b-form-input>
      </div>
      <div class="form-group p-3 mb-0" v-else>
        <b-form-input type="text" class="form-control" id="userInput" placeholder="Username" aria-describedby="usernameRules" v-model="username"></b-form-input>
      </div>
      <b-button pill variant="outline-secondary" class="d-flex m-auto" size="sm" @click="loginSwitchType">Switch connexion type</b-button>
      <div class="form-group p-3 mt-3">
        <b-form-input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password"></b-form-input>
      </div>
      <b-button type="submit" class="btn btn-primary mx-3" @click.prevent="userLogin">Log me in !</b-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      loginType: false,
      // eslint-disable-next-line no-useless-escape
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  methods: {
    userLogin() {
      let userLogin = {}
      if (this.username == '') {
        userLogin = {
        email: this.email,
        password: this.password
        }
      } else {
        userLogin = {
        username: this.username,
        password: this.password
        }
      }
      axios.post('http://localhost:3000/api/auth/login', userLogin)
      .then(res => {
        console.log(res)
        //localstorage the cookie or token
        this.$bvToast.toast(`${this.username, this.email} logged in !`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        setTimeout(function() { window.location.pathname = '/'; }, 6000)
      }, err => {
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
          }
        )
        }
        }
      )
    },
    loginSwitchType() {
      this.loginType = !this.loginType
    }
  },
  beforeMount() {
    //Get cookie  setTimeout(function() { window.location.pathname = '/index.html'; }, 600)
  }
}
</script>