<template>
    <div class="message-card d-flex p-3 mx-auto flex-column">

      <main role="main">
        <h1>{{ title }}</h1>
        <p class="lead">{{ content }}</p>
        <b-img :src="attachment" fluid alt="Responsive image"></b-img>
      </main>

      <footer class="mt-auto">
        <div>
          <p>Post by {{ userId }}.</p>
        </div>
      </footer>

    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        attachment: {
            type: Object,
            required: false
        },
        userId: {
            type: Number,
            required: true
        }

    }
}
</script>

<style scoped lang="scss">
    .message-card {
        max-width: 42em;
    }
</style>