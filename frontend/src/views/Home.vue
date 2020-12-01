<template>
  <div class="home my-3 text-center">

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
// @ is an alias to /src

</script>
