<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing variant="danger">Delete</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit your password"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="passwordState"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: 'DeleteButton',
    data() {
      return {
        urlId: this.$route.params.id,
        password: '',
        passwordState: null,
        userSessionId: this.$cookies.get('user_session').userId,
        username: this.$cookies.get('user_session').username,
        adminAuth: this.$cookies.get('user_session').isAdmin
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.passwordState = valid
        return valid
      },
      resetModal() {
        this.password = ''
        this.passwordState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        this.handleSubmit()
        
        // Trigger submit handler => use userSessionId to check password if ok => this.handlesubmit
      },
      handleSubmit() {
        let userInfo = {
            username: this.username,
            password: this.password
        }
        
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }

        this.$store.dispatch('userLogin', userInfo)
        .then(() => {
            if ((this.userSessionId == this.urlId && !this.adminAuth) || (this.userSessionId != this.urlId && this.adminAuth)) {
                if (this.userSessionId == this.urlId) {
                    //delete user => remove cookies => go home
                    this.$store.dispatch('deleteUser', this.urlId)
                    .then((res) => {
                        console.log(res)
                        //if res status 200 => user deleted, else error
                        if (res.status == 200) {
                            this.$bvToast.toast(`${res.data.message}`, {
                                title: 'Success',
                                variant: 'success',
                                autoHideDelaysuccess: 5000 
                            })
                            this.$cookies.remove('user_session')
                            setTimeout(function() { window.location.pathname = '/'; }, 6000)
                        } else {
                            this.$bvToast.toast(`${res.data.message}`, {
                                title: 'Error',
                                variant: 'danger',
                                autoHideDelaysuccess: 5000 
                            })
                        }
                    })
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                    })
                } else {
                    this.$store.dispatch('deleteUser', this.urlId)
                    .then((res) => {
                        console.log(res)
                        //if res status 200 => user deleted, else error
                        if (res.status == 200) {
                            this.$bvToast.toast(`${res.data.message}`, {
                                title: 'Success',
                                variant: 'success',
                                autoHideDelaysuccess: 5000 
                            })
                        } else {
                            this.$bvToast.toast(`${res.data.message}`, {
                                title: 'Error',
                                variant: 'danger',
                                autoHideDelaysuccess: 5000 
                            })
                        }
                    })
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-prevent-closing')
                    })
                }
            } else {
                this.$bvToast.toast(`Admin user can't delete his own account`, {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000 
                    }
                )
            }
            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
        })
        })
        .catch(() => {
            this.$bvToast.toast(`Wrong password`, {
                title: 'Error',
                variant: 'danger',
                autoHideDelay: 5000 
                }
            )
        })  
      }
    },
    created() {
        console.log('Hello n° ' + this.$route.params.id)
    },
    beforeMount() {

    }
  }
</script>