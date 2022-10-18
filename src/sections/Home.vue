<template>
    <div>
        <b-container v-if="users">
            <b-row v-for="(user, key ) in users" :key="'user'+key" >
                <b-col cols="3"> 
                    <b-button @click="getUser(user.id)">
                        {{user.firstname}} {{user.lastname}}
                    </b-button> 
                </b-col> 
                <b-col>
                    {{user.email}}
                </b-col>
                <b-col>
                    <b-button @click="deleteUser(user.id)">
                        delete
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
        <b-row v-else class="vh-100 d-flex flex-wrap align-content-center"> 
            <b-col  cols="12" class="text-center ">
                <b-icon icon="three-dots" animation="cylon" font-scale="8" variant="primary"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    // import Content from '../components/Content.vue'
    export default {
        name: 'Home',
        data() {
            return {
         
            }
        },
        components: {
            // Content
        },
        props: {
             search: [String, Number],
        },
        computed: {
            users() {
                return this.$store.getters.users
            },
        },
         methods: {
            getUser(id) {
                this.$store.dispatch('getUser', id)
                    .then(() => {
                    
                    })
                    .then(() => {
                        this.$emit('toast', 'success', 'DONE !', 'To do Created')
                
                    })
                    .catch(() => {
                        this.$emit('toast', 'danger', 'Warning!', 'To do where not created!')
                    })
            },
            deleteUser(id) {
                this.$store.dispatch('deleteUser', id)
                .then(() => {
                    return this.$store.dispatch('getUsers')
                })
                .then(() => {
                    this.$emit('toast', 'success', 'DONE !', 'delete')
                })
                .catch(() => {
                    this.$emit('toast', 'danger', 'Warning!', 'To do where not created!')
                })
            },
            toastEmit(type, title, text) {
                this.$emit('toast', type, title, text)
            },
        },
    }
</script>