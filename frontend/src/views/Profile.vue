<template>
    <div class="profile container text-center mt-5">
        <div class="row" v-if="authorization == true">
            <div class="col-12 col-md-8">
                
                <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-2">
                    <label for="usernameInput" class="sr-only">Your username :</label>
                    <b-form-input type="text" class="form-control" id="usernameInput" placeholder="Username" aria-describedby="usernameRules" v-model="user.username" :state="usernameValidation"></b-form-input>
                </b-form-group>

                <b-form-group class="px-3" id="input-group-3" description="Not required but way more pleasant to have one.">
                    <label for="Textarea" class="sr-only">Your description :</label>
                    <b-form-textarea class="form-control" id="Textarea" placeholder="Your bio" rows="8" aria-describedby="bioRules" v-model="user.bio"></b-form-textarea>
                </b-form-group>

            </div>

            <div class="col-12 col-md-4">

                <b-form-group class="pb-1 pt-3 px-3 mb-0" id="input-group-1">
                    <label for="emailInput" class="sr-only">Email address :</label>
                    <b-form-input type="email" class="form-control" id="emailInput" placeholder="your@email.com" v-model="user.email" :state="emailValidation"></b-form-input>
                </b-form-group>

                <b-form-group class="p-3 mt-3">
                    <label for="passwordInput" class="sr-only">Your password :</label>
                    <b-form-input type="password" class="form-control" id="passwordInput" placeholder="New password" v-model="user.password" :state="passwordValidation"></b-form-input>
                </b-form-group>

                <div>
                    <b-form-checkbox class="p-3" v-model="user.toggleAdmin" name="check-button" switch size="lg" v-if="adminAuth">
                    User {{ id }} admin role
                    </b-form-checkbox>
                </div>
                <b-row>
                    <b-col lg="6" class="pb-2"><b-button type="submit" class="btn btn-primary m-3" variant="info" @click.prevent="updateUserProfile()">Update</b-button></b-col>
                    <b-col lg="6" class="pb-2 justify-content-center align-items-center"><delete-button /></b-col>
                </b-row>
            </div>
            
        </div>
    </div>
</template>

<script>
import DeleteButton from '../components/DeleteButton'

export default {
  components: { DeleteButton },
    name: 'Profile',
    data() {
        return {
            id: this.$route.params.id,
            userSessionId: this.$cookies.get('user_session').userId,
            authorization: false,
            adminAuth: this.$cookies.get('user_session').isAdmin,
            user: {
                email: "",
                username: "",
                bio: "",
                toggleAdmin: false,
                password: ""
            },
            // eslint-disable-next-line no-useless-escape
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    },
    computed: {
        emailValidation() {
            return this.regex.test(this.user.email)
        },
        usernameValidation() {
            return this.user.username.length > 2 ? true : false
        },
        passwordValidation() {
            return this.user.password.length > 4
        },
    },
    methods: {
        getUserProfile() {
            if (this.userSessionId == this.id || this.adminAuth) {
            this.$store.dispatch('getUserProfile', this.id)
            .then((res) => {
                this.user.email = res.data.email
                this.user.username = res.data.username
                this.user.bio = res.data.bio
                this.user.toggleAdmin = res.data.isAdmin
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
        },
        updateUserProfile() {
            if (this.emailValidation && this.usernameValidation) {
                if (this.passwordValidation) {

                    this.$store.dispatch('updateUserProfile', [this.id, this.user])
                    .then(() => {
                        this.$bvToast.toast(`User profile updated !`, {
                            title: 'Success',
                            variant: 'success',
                            autoHideDelay: 5000 
                        })
                        this.$store.dispatch('getUserProfile', this.id)
                        .then((res) => {
                            this.user.email = res.data.email
                            this.user.username = res.data.username
                            this.user.bio = res.data.bio
                            this.user.toggleAdmin = res.data.isAdmin
                        })
                    }) 
                } else {
                    let newUserInfo = {
                        email : this.user.email,
                        username : this.user.username,
                        bio: this.user.bio,
                        isAdmin : this.user.toggleAdmin
                    }
                    this.$store.dispatch('updateUserProfile', [this.id, newUserInfo])
                    .then(() => {
                        this.$bvToast.toast(`User profile updated !`, {
                            title: 'Success',
                            variant: 'success',
                            autoHideDelay: 5000 
                        })
                        this.$store.dispatch('getUserProfile', this.id)
                        .then((res) => {
                            this.user.email = res.data.email
                            this.user.username = res.data.username
                            this.user.bio = res.data.bio
                            this.user.toggleAdmin = res.data.isAdmin
                        })
                        }
                    )
                    
                }
            }
            if (!this.emailValidation || !this.usernameValidation) {
                this.$bvToast.toast(`Invalid value(s)`, {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelaysuccess: 5000 
                })
            }
        },
        /* deleteUser() {
            this.$store.dispatch('getUserProfile', this.userSessionId)
            .then((res) => {
                if ((this.userSessionId == this.id && !res.data.isAdmin) || (this.userSessionId != this.id && res.data.isAdmin)) {
                    this.$store.dispatch('deleteUser', this.id)
                    .then((res) => {
                        console.log(res)
                        //if res status 200 => user deleted, else error
                        if (res.status == 200) {
                            this.$bvToast.toast(`${res.message}`, {
                                title: 'Success',
                                variant: 'success',
                                autoHideDelaysuccess: 5000 
                            })
                        } else {
                            this.$bvToast.toast(`${res.message}`, {
                                title: 'Error',
                                variant: 'danger',
                                autoHideDelaysuccess: 5000 
                            })
                        }
                    })
                }
                else {
                    this.$bvToast.toast(`unauthorized action`, {
                            title: 'Error',
                            variant: 'danger',
                            autoHideDelay: 5000 
                    })
                }
            })
            .catch((err) => err)
        } */
    },
    created() {
        this.getUserProfile()
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
}
</script>

<style lang="scss" scoped>
.profile {
    margin-bottom: 100px;
}
</style>