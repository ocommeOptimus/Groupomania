<template>
  <div class="register my-3 mx-md-5">
    <form class="form-signin">
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

      <b-button type="submit" class="btn btn-primary mx-3" @click.prevent="userRegister">Register</b-button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    
  },
  data() {
    return {
      email: '',
      username: '',
      bio: '',
      password: '',
      // eslint-disable-next-line no-useless-escape
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  }, 
  computed: {
    emailValidation() {
      return this.regex.test(this.email)
    },
    usernameValidation() {
      return this.username.length > 4 && this.username.length < 13
    },
    passwordValidation() {
      return this.password.length > 4
    }
  },
  methods: {
    userRegister() {
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
    },
  },
  beforeMount() {
  },
  mounted() {
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