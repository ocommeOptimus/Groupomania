<template>
    <div class="text-center mt-5">
        <div v-if="authorization == true">
            <div>This is profile page {{this.$route.params.id}}</div>
            <div>
                Bye World
                {{user.username}}
                {{ user.isAdmin }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            id: this.$route.params.id,
            userSessionId: this.$cookies.get('user_session').userId,
            authorization: false,
            user: {
                id: "",
                email: "",
                username: "",
                bio: "",
                isAdmin: false
            }
        }
    },
    computed: {

    },
    methods: {
        getUserProfile() {
            console.log(this.userSessionId)
            this.$store.dispatch('getUserProfile', this.userSessionId)
            .then((res) => {
                 if (this.userSessionId == this.id || res.data.isAdmin == true) {
                this.$store.dispatch('getUserProfile', this.id)
                .then((res) => {
                    this.user.id = res.data.id
                    this.user.email = res.data.email
                    this.user.username = res.data.username
                    this.user.bio = res.data.bio
                    this.user.isAdmin = res.data.isAdmin
                })
                }
                else {
                    this.$bvToast.toast(`unauthorized action`, {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000 
                    })
                    setTimeout(function() { window.location.pathname = '/'; }, 6000)
                }
            })
        }
    },
    beforeMount() {
        if (this.$cookies.get('user_session')) {
            this.authorization = true
        }
        else {
            this.$bvToast.toast(`unauthorized action`, {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 5000 
            })
            setTimeout(function() { window.location.pathname = '/'; }, 6000)
        }
        
    },
    mounted() {
        this.getUserProfile()
    }
    
}
</script>