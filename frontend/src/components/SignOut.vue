<template>
    <div>
        <b-link @click="removeAuth()">Sign out</b-link>
    </div>
</template>

<script>
export default {
    name: 'SignOut',
    methods: {
        removeAuth() {
            //modal ?
            this.$cookies.remove('user_session')
            this.$bvToast.toast(`User logout`, {
                title: 'Bye',
                variant: 'success',
                autoHideDelaysuccess: 5000 
            })
            setTimeout(function() { window.location.pathname = '/'; }, 6000)
        }
    }
}
</script>