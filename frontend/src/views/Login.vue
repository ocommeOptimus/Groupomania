<template>
  <div class="login my-3 mx-md-5">
    <form>
      <div class="form-group p-3">
        <input type="email" class="form-control" id="exampleInputEmail1" placeholder="your@email.com" v-model="email">
      </div>
      <div class="form-group p-3">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary mx-3" @click="userLogin">Log me in !</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  }, methods: {
    userLogin() {
      let userLogin = {
        email: this.email,
        password: this.password
      }
      axios.post('http://localhost:3000/auth/login', userLogin)
    }
  }
}
</script>