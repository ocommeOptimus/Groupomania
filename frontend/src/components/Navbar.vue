<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand navbar__brand" to="/">
        <img alt="Groupomania's brand" class="navbar__logo" src="../assets/img/icon-left-font-monochrome-black.svg">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'home'}">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- <b-navbar class="navbar-groupo" toggleable="lg" type="light" variant="info">
    <b-navbar-brand class="navbar-groupo__brand" to="/">
      <img alt="Groupomania's brand" class="navbar__logo" src="../assets/img/icon-left-font-monochrome-black.svg">
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="ml-auto" v-if="user.cookie">
        <b-nav-item>
          <router-link class="nav-link" :to="{ name: 'home'}">Home</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" :to="{ name: 'mymessages' }">Post your message</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
        </b-nav-item>

        <b-nav-item-dropdown right>
          <template #button-content>
            <em>{{ this.username }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
  </b-navbar> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    //no need in this template
  },
  data() {
    return {
      //return user.cookie = false
    }
  },
  computed: {
    //no need in this template
  },
  methods: {
    //must install vuex and use mapActions or mapGetters
  },
  beforeMount() {
    //get user.cookie
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .navbar {
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
