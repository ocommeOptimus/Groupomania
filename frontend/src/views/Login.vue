<template>
  <div class="login my-3 mx-md-5">
    <form class="form-signin">
      <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-1" v-if="loginType">
        <label for="emailInput" class="sr-only">Email address :</label>
        <b-form-input type="email" class="form-control" id="emailInput" placeholder="your@email.com" v-model="email" :state="emailValidation"></b-form-input>
      </b-form-group>

      <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-2" v-else>
        <label for="usernameInput" class="sr-only">Your username :</label>
        <b-form-input type="text" class="form-control" id="usernameInput" placeholder="Username" aria-describedby="usernameRules" v-model="username" :state="usernameValidation"></b-form-input>
      </b-form-group>

      <b-button pill variant="outline-secondary" class="d-flex m-auto" size="sm" @click="loginSwitchType">Switch connexion type</b-button>

      <b-form-group class="p-3 mt-3">
        <label for="passwordInput" class="sr-only">Your password :</label>
        <b-form-input type="password" class="form-control" id="passwordInput" placeholder="Password" v-model="password" :state="passwordValidation"></b-form-input>
      </b-form-group>

      <b-button type="submit" class="btn btn-primary mx-3" @click.prevent="userLogin()">Log me in !</b-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginType: false
    }
  },
  computed: {
    emailValidation() {
      return this.$store.getters.emailValidation
    },
    usernameValidation() {
      return this.$store.getters.usernameValidation
    },
    passwordValidation() {
      return this.$store.getters.passwordValidation
    },
    email: {
      get() {
        return this.$store.state.users.email
      },
      set (value) {
        this.$store.commit('UPDATE_EMAIL_INPUT', value)
      }
    },
    username: {
      get() {
        return this.$store.state.users.username
      },
      set (value) {
        this.$store.commit('UPDATE_USERNAME_INPUT', value)
      }
    },
    password: {
      get() {
        return this.$store.state.users.password
      },
      set (value) {
        this.$store.commit('UPDATE_PWD_INPUT', value)
      },
    }
  },
  methods: {
    userLogin() {
      let userLogInfo = {}
      if (this.username == '') {
        userLogInfo = {
        email: this.email,
        password: this.password
        }
      } else {
        userLogInfo = {
        username: this.username,
        password: this.password
        }
      }
      console.log(userLogInfo)
      this.$store.dispatch('userLogin', userLogInfo)
      .then((res) => {
        console.log(res)
        this.$bvToast.toast(`${this.username, this.email} logged in !`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        setTimeout(function() { window.location.pathname = '/index.html'; }, 600)
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        let errorArray = error.response.data.errors
        
        if (!errorArray) {
          this.$bvToast.toast(`${error.response.data.error}`, {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 5000 
          })
        } 
        else {
          this.$bvToast.toast(`Error at ${errorArray[0].param} field`, {
          title: errorArray[0].msg,
          variant: 'danger',
          autoHideDelay: 5000 
          })
        }
      })
    },
    loginSwitchType() {
      this.loginType = !this.loginType
    }
  },
  beforeMount() {
    //Get cookie  
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