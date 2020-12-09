<template>
  <div class="home mt-5 text-center">

    <div v-if="authorization == false">
      <img alt="Groupomania's logo" class="home__logo" src="../assets/img/logo.svg">
      <h1>Welcome</h1>
      <p>Please log in to continue.</p>
    </div>

    <div class="container" v-else>
      <div class="row" v-if="adminAuth == true">
        <div class="col-12 col-md-8">
          <messages-list
          v-for="message in messagesList"
          :title="message.title"
          :content="message.content"
          :attachment="message.attachment"
          :id="message.id"
          :usersLiked="message.usersLiked"
          :usersDisliked="message.usersDisliked"
          :User="message.User.username"
          :key="message.id"/>

        </div>
        <div class="col-12 col-md-4">
          <b-card-group deck class="p-3">
            <b-card header="User list" class="home__users-list">
              <users-list
              v-for="user in usersList"
              :username="user.username"
              :id="user.id"
              :key="user.id" />
            </b-card>
          </b-card-group>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <div class="p-3">
          <messages-list
          v-for="message in messagesList"
          :title="message.title"
          :content="message.content"
          :attachment="message.attachment"
          :id="message.id"
          :usersLiked="message.usersLiked"
          :usersDisliked="message.usersDisliked"
          :User="message.User.username"
          :key="message.id"/>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
import UsersList from '../components/UsersList.vue'
import MessagesList from '../components/MessagesList.vue'

import { mapState } from 'vuex'

export default {
  components: { UsersList, MessagesList },
  data() {
    return {
      authorization: false,
      adminAuth: false
    }
  },
  computed: {
    ...mapState({
      usersList: 'usersList',
      messagesList: 'messagesList'
    })
  },
  beforeMount() {
    if(this.$cookies.get('user_session')) {
      this.authorization = true
      this.adminAuth = this.$cookies.get('user_session').isAdmin
    }
  },
  methods: {
    getAllUsers() {
      this.$store.dispatch('getAllUsers')
    },
    getAllMessages() {
      this.$store.dispatch('getAllMessages')
    }
  },
  created() {
    if(this.$cookies.get('user_session')) {
      this.getAllUsers()
      this.getAllMessages()
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  margin-bottom: 100px;
  &__logo {
    max-width: 15%;
    animation-name: spin;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  &__users-list {
    max-height: 200px;
    overflow: scroll;
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