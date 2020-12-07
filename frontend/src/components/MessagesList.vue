<template>
    <div>
        <b-card
            :header="User"
            header-tag="header"
            :title="title"
            :img-src="attachment"
            :img-alt="title + ' image'"
            img-top
            :tag="'message-' + id"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
            {{ content }}
            </b-card-text>

            <template #footer>
                <em>
                    <b-row class="justify-content-md-end">
                        <b-col col lg="2" class="d-flex column">
                            <b-icon icon="hand-thumbs-up" aria-hidden="true"></b-icon>{{ usersLiked.length }}
                        </b-col>
                        <b-col col lg="2" class="d-flex column">
                            <b-icon icon="hand-thumbs-down" aria-hidden="true"></b-icon>{{ usersDisliked.length }}
                        </b-col>
                    </b-row>
                </em>
            </template>
            
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'MesagesList',
    props: {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        attachment: {
            type: Object,
            required: false,
        },
        id: {
            type: Number,
            required: true
        },
        usersLiked: {
            type: Array,
            required: false,
        },
        usersDisliked: {
            type: Array,
            required: false
        },
        User: {
            username: {
                type: String,
                required: true
            }
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