<template>
    <div>
        <footer class="footer fixed-bottom">
            <div class="container text-center">{{ copyright }}</div>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "Footer",
    components: {},
    computed: {
        ...mapGetters({
            copyright: "copyright"
        })
    }
}
</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f5f5f5;
}
</style>