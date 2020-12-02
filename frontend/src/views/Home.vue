<template>
  <div class="home my-3 text-center">
    <div v-if="authorization == false">
      <img alt="Groupomania's logo" class="home__logo" src="../assets/img/logo.svg">
      <h1>Welcome</h1>
      <p>Please log in to continue.</p>
    </div>
    <div v-else>
      <MessageCard v-for="post in message" :key="post.userId" :message="message" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import MessageCard from "../components/MessageCard"
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    MessageCard
  },
  data() {
    return {
      authorization: false,
      message: {
        title: "",
        content: "",
        attachment: "",
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
      }
    }
  },
  methods: {
    listAllMessages() {
      axios.get("http://localhost:3000/api/")
      .then(res => {
        console.log(res)
        if (res.status == 200 && res == []) {
          alert('No messages found !')
        }
        res = this.message
      })
      .catch(err => {
        console.log(err)
        console.log(err.response)
      })
    }
  },
  beforeMount() {
    if(this.$cookies.get('username')) {
      this.authorization = true
    }
  },
  mounted() {
    this.listAllMessages()
  }
}

</script>

<style scoped lang="scss">
  .home {
    &__logo {
      max-width: 15%;
      animation-name: spin;
      animation-duration: 4000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
