<template>
  <div id="app" class="app">
    <Navbar :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
    }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Nevis";
  src: url("./assets/fonts/nevis.ttf") format('truetype');
}

#app {
  font-family: "Nevis", sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>