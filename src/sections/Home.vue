<template>
    <div>
        <b-container v-if="searchUsers" class="py-3 px-4 px-xl-0">
            <b-row class="bg-secondary-trans rounded-lg mb-3">
                <b-col cols="3">
                    Namn
                </b-col>
                <b-col cols="3">
                    E-mail
                </b-col>
                <b-col cols="3" class="d-flex justify-content-center">
                   status
                </b-col>
                <b-col cols="2" class="d-flex justify-content-center">
                    Delete
                </b-col>
                <b-col cols="1">
                    Edit
                </b-col>
            </b-row>
            <b-row v-for="(user, key ) in searchUsers" :key="'user'+key">
                <b-col cols="3"> 
                    {{user.firstname}} {{user.lastname}}
                </b-col> 
                <b-col cols="3">
                    {{user.email}}
                </b-col>
                <b-col cols="3">
                    <span class="badge w-100" :class="'bg-'+user.steps">{{currentStep(user.steps)}}</span>
                </b-col>
                <b-col cols="2" class="d-flex justify-content-center flex-wrap align-content-center">
                    <b-button @click="deleteUser(user.id)" size="sm" class="text-danger">
                        Delete
                    </b-button>
                </b-col>
                <b-col cols="1" class="pt-1">
                    <b-button @click="getUser(user.id)" size="sm">
                        Edit
                    </b-button>
                </b-col>
            </b-row>
            <b-modal v-model="modalShow" hide-footer hide-header>
                <div class="d-block text-center">
                    <h3>Hello From My Modal!</h3>
                </div>
                <b-form v-if="modalShow">
                    <b-row>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="user.firstname" placeholder="Förnman" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="user.lastname" placeholder="Efternamn" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="user.email" placeholder="Email*" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="user.adress" placeholder="Adress" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-select v-model="user.steps" :options="options" size="sm" class="mt-3"></b-form-select>
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-textarea v-model="user.notes" placeholder="Notes" />
                        </b-col>
                        <b-col cols="6" class="py-2">
                            <b-button @click="modalShow = false" variant="primary">Stäng</b-button>
                        </b-col>
                        <b-col cols="6" class="py-2 text-right ">
                            <b-button @click="saveUser(user)" :disabled="user.email === null" variant="primary">Spara</b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-modal>
        </b-container>
        <b-row v-else class="vh-100 d-flex flex-wrap align-content-center"> 
            <b-col  cols="12" class="text-center ">
                <b-icon icon="three-dots" animation="cylon" font-scale="8" variant="primary"/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: 'HR_helper',
        data() {
            return {
                modalShow: false,
                options: [
                    { value: 1, text: 'Kontakt' },
                    { value: 2, text: 'Dialog' },
                    { value: 3, text: 'Intervju' },
                    { value: 4, text: 'Erbjudande' },
                    { value: 5, text: 'Avslutad' }
                ]
            }
        },
        components: {
            // Content
        },
        props: {
             search: [String, Number],
        },
        computed: {
            searchUsers() {
                const usersOrder = _.orderBy(this.$store.getters.users, 'steps', 'asc',);
                if (this.search) {
                    return _.filter(usersOrder, user => {
                        var string = `${user.firstname} ${user.lastname} ${user.email} `
                        let searchReg = new RegExp(this.search + ".*")
                        if (string.match(searchReg)) {
                            return user
                        }
                    }) 
                } else {
                    return usersOrder
                }
            },
            user() {
                return this.$store.getters.user[0]
            },
        },
         methods: {
            currentStep(step) {
                var option = _.find(this.options, { value: step })
                return option? option.text : null
            },
            saveUser(user) {
                this.$store.dispatch('updateUsers', user)
                .then(() => {
                    this.$store.dispatch('getUsers')
                    this.modalShow = false
                })
                .then(() => {
                    this.$emit('toast', 'success', 'DONE !', 'Användare updaterad')

                })
                .catch(() => {
                    this.$emit('toast', 'danger', 'Warning!', 'Gick inte att updatera användaren')
                })
            },
            getUser(id) {
                this.$store.dispatch('getUser', id)
                .then(() => {
                    this.modalShow = true
                })
                .then(() => {
                    this.$emit('toast', 'success', 'DONE !', 'Användare hämtad')
            
                })
                .catch(() => {
                    this.$emit('toast', 'danger', 'Warning!', 'Gick inte att hämta användaren')
                })
            },
            deleteUser(id) {
                this.$store.dispatch('deleteUser', id)
                .then(() => {
                    return this.$store.dispatch('getUsers')
                })
                .then(() => {
                    this.$emit('toast', 'success', 'DONE !', 'Användaren raderad')
                })
                .catch(() => {
                    this.$emit('toast', 'danger', 'Warning!', 'Användaren blev inte raderad')
                })
            },
            toastEmit(type, title, text) {
                this.$emit('toast', type, title, text)
            },
        },
    }
</script>