<template>
  <div class="register my-3 mx-md-5">
    <form>
      <div class="form-group px-3">
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="your@email.com" aria-describedby="emailRules" v-model="email">
        <small id="emailRules" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group px-3">
        <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Username" aria-describedby="usernameRules" v-model="username">
        <small id="usernameRules" class="form-text text-muted">Must be at least 4 characters and less than 12.</small>
      </div>
      <div class="form-group px-3">
        <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Your bio" rows="3" aria-describedby="bioRules" v-model="bio"></textarea>
        <small id="usernameRules" class="form-text text-muted">Not required but way more pleasant to have one.</small>
      </div>
      <div class="form-group px-3">
        <input type="password" class="form-control" placeholder="Password" id="exampleInputPassword1" v-model="password">
        <small id="passwordRules" class="form-text text-muted">Must be at least 5 characters.</small>
      </div>
      <button type="submit" class="btn btn-primary mx-3" @click="userRegister">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      username: '',
      bio: '',
      password: ''
    }
  }, methods: {
    userRegister() {
      let newUser = {
        email: this.email,
        username: this.username,
        bio: this.bio,
        password: this.password
      }
      axios.post('http://localhost:3000/auth/register', newUser)
    }
  }
}
</script>