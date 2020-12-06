<template>

  <div class="register mt-5 mx-md-5">
    <form class="register__form-signin">
      <b-form-group class="px-3" id="input-group-1" description="We'll never share your email with anyone else.">
        <label for="emailInput" class="sr-only">Email address :</label>
        <b-form-input type="email" class="form-control" id="emailInput" placeholder="Enter your@email.com" aria-describedby="emailRules" v-model="email" :state="emailValidation"></b-form-input>
      </b-form-group>

      <b-form-group class="px-3" id="input-group-2" description="Must be at least 5 characters and less than 13.">
        <label for="usernameInput" class="sr-only">Your username :</label>
        <b-form-input type="text" class="form-control" id="usernameInput" placeholder="Enter username" aria-describedby="usernameRules" v-model="username" :state="usernameValidation"></b-form-input>
      </b-form-group>

      <b-form-group class="px-3" id="input-group-3" description="Not required but way more pleasant to have one.">
        <label for="Textarea" class="sr-only">Your description :</label>
        <b-form-textarea class="form-control" id="Textarea" placeholder="Your bio" rows="3" aria-describedby="bioRules" v-model="bio"></b-form-textarea>
      </b-form-group>

      <b-form-group class="px-3" id="input-group-4" description="Must be at least 5 characters.">
        <label for="passwordInput" class="sr-only">Your password :</label>
        <b-form-input type="password" class="form-control" placeholder="Password" id="passwordInput" aria-describedby="passwordRules" v-model="password" :state="passwordValidation"></b-form-input>
      </b-form-group>

      <b-button type="submit" class="btn btn-primary mx-3" @click.prevent="userRegister()">Register</b-button>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Register',
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
    }
  },
  methods: {
    userRegister() {
      let userInfo = {
        email: this.email,
        username: this.username,
        bio: this.bio,
        password: this.password
      }
      this.$store.dispatch('userRegister', userInfo)
      .then((res) => {
        console.log(res)
        console.log(res.config.data.username)
        this.$bvToast.toast(`${res.data.username} created ! Your UserId is n° ${res.data.userId}`, {
          title: 'Success',
          variant: 'success',
          autoHideDelay: 5000 
          }
        )
        setTimeout(function() { window.location.pathname = '/login'; }, 6000)
      })
      .catch(error => {
        if (error.message.match(409)[0] == 409) {
            console.log('Hello Error 409')
            this.$bvToast.toast(`This email/username already used`, {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 5000 
            }
          )
        } else {
            this.$bvToast.toast(`Please recheck your fields`, {
            title: 'Invalid value',
            variant: 'danger',
            autoHideDelay: 5000 
            }
          )
        }
      })
    }
  }
}
</script>

 <style scoped lang="scss">
.register {
  margin-bottom: 100px;
  &__form-signin {
  width: 100%;
  max-width: 430px;
  padding: 15px;
  margin: auto;
  }
}
</style>