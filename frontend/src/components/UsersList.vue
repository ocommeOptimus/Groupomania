<template>
    <div>

        <b-list-group>
            <b-list-group-item class="d-flex justify-content-between align-items-center" :href="'/profile/' + id">
            {{ username }}
            <b-badge variant="primary" pill>id : {{ id }}</b-badge>
            </b-list-group-item>
        </b-list-group>

    </div>
</template>

<script>
export default {
    name: 'UsersList',
    props: {
        username: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>

</style>