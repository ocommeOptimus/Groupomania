<template>
  <div class="register my-3 mx-md-5">
    <form>
      <div class="form-group px-3">
        <b-form-input type="email" class="form-control" id="emailInput" placeholder="your@email.com" aria-describedby="emailRules" v-model="email" :state="emailValidation"></b-form-input>
        <small id="emailRules" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group px-3">
        <b-form-input type="text" class="form-control" id="userInput" placeholder="Username" aria-describedby="usernameRules" v-model="username" :state="usernameValidation"></b-form-input>
        <small id="usernameRules" class="form-text text-muted">Must be at least 5 characters and less than 13.</small>
      </div>
      <div class="form-group px-3">
        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Your bio" rows="3" aria-describedby="bioRules" v-model="bio"></textarea>
        <small id="bioRules" class="form-text text-muted">Not required but way more pleasant to have one.</small>
      </div>
      <div class="form-group px-3">
        <b-form-input type="password" class="form-control" placeholder="Password" id="passwordInput" aria-describedby="passwordRules" v-model="password" :state="passwordValidation"></b-form-input>
        <small id="passwordRules" class="form-text text-muted">Must be at least 5 characters.</small>
      </div>
      <b-button type="submit" class="btn btn-primary mx-3" @click.prevent="userRegister">Register</b-button>
    </form>
  </div>
</template>

<script>
//import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      
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
    bio: {
      get() {
        return this.$store.state.users.bio
      },
      set (value) {
        this.$store.commit('UPDATE_BIO_INPUT', value)
      }
    },
    password: {
      get() {
        return this.$store.state.users.password
      },
      set (value) {
        this.$store.commit('UPDATE_PWD_INPUT', value)
      },
      /* ...mapGetters({
        emailValidation: "emailValidation",
        usernameValidation: "usernameValidation",
        passwordValidation: "passwordValidation"

      }) */
    }
  },
  methods: {
    userRegister() {
      this.$store.dispatch('userRegister')
    }
    /* ...mapGetters({
        emailValidation: "emailValidation",
        usernameValidation: "usernameValidation",
        passwordValidation: "passwordValidation"

      }) */
    /* userRegister() {
      let newUser = {
        email: this.email,
        username: this.username,
        bio: this.bio,
        password: this.password
      }
      axios.post('http://localhost:3000/api/auth/register', newUser)
      .then(res => {
        this.$bvToast.toast(`${this.username} created ! Your UserId is n° ${res.data.userId}`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        setTimeout(function() { window.location.pathname = '/login'; }, 6000)
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
    }, */
  },
  beforeMount() {
  },
  mounted() {
    /* mapGetters({
        emailValidation: "emailValidation",
        usernameValidation: "usernameValidation",
        passwordValidation: "passwordValidation"

      }) */
  }
}
</script>