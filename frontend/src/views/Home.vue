<template>
  <div class="home mt-5 text-center">

    <div v-if="authorization == false">
      <img alt="Groupomania's logo" class="home__logo" src="../assets/img/logo.svg">
      <h1>Welcome</h1>
      <p>Please log in to continue.</p>
    </div>

    <div v-else>
      <h1>You in !</h1>
      <p>Congratulations</p>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      authorization: false
    }
  },
  beforeMount() {
    if(this.$cookies.get('user_session')) {
      this.authorization = true
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