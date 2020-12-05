<template>
  <div>
    <b-navbar class="navbar-groupo" toggleable="lg" type="light">
      <b-navbar-brand class="navbar-groupo__brand" to="/">
        <img alt="Groupomania's brand" class="navbar-groupo__logo" src="../assets/img/icon-left-font-monochrome-black.svg">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto" v-if="authorization == true">
          <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'home'}">Home</router-link>
          </b-nav-item>
          <!-- <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'mymessages' }">Post your message</router-link>
          </b-nav-item> -->
          <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
          </b-nav-item>

          <b-nav-item-dropdown right class="d-flex align-items-center">
            <template #button-content>
              <em>{{ user.username }}</em>
            </template>
            <b-dropdown-item>
              <router-link class="nav-link" :to="`/profile/${user.id}`">My profile</router-link>
            </b-dropdown-item>
            <b-dropdown-item><sign-out /></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import SignOut from '../components/SignOut'

export default {
  components: { SignOut },
  name: 'Navbar',
  data() {
    return {
      authorization: false,
      user: {
        id: '',
        username: ''
      }
    }
  },
  beforeMount() {
    if (this.$cookies.get('user_session')) {
          this.authorization = true
          this.user.id = this.$cookies.get('user_session').userId
          this.user.username = this.$cookies.get('user_session').username
    }
  }
}
</script>


<style scoped lang="scss">
  .navbar-groupo {
    background-color: #f5f5f5;
    &__brand {
      max-width: 15%;
      @media (max-width: 640px) {
        max-width: 30%;
      }
    }
    &__logo {
      width: 100%;
    }
  }
</style>
