<template>
  <div class="login my-3 mx-md-5">
    <form class="form-signin">
      <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-1" v-if="loginType">
        <label for="emailInput" class="sr-only">Email address :</label>
        <b-form-input type="email" class="form-control" id="emailInput" placeholder="your@email.com" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-2" v-else>
        <label for="userInput" class="sr-only">Your username :</label>
        <b-form-input type="text" class="form-control" id="userInput" placeholder="Username" aria-describedby="usernameRules" v-model="username"></b-form-input>
      </b-form-group>

      <b-button pill variant="outline-secondary" class="d-flex m-auto" size="sm" @click="loginSwitchType">Switch connexion type</b-button>

      <b-form-group class="p-3 mt-3">
        <label for="passwordInput" class="sr-only">Your password :</label>
        <b-form-input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password"></b-form-input>
      </b-form-group>

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
        //localStorage.setItem('access_token', this.token)
        this.$cookies.set('username', res.data, '1d')

        console.log(this.$cookies)
        console.log(this.$cookies.get('username'))

        this.$bvToast.toast(`${this.username, this.email} logged in !`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        //setTimeout(function() { window.location.pathname = '/'; }, 6000)
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

<style scoped lang="scss">
.form-signin {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
}
</style>