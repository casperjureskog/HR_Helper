<template>
    <div class="bg-light">
        <b-container class="position-relative">
            <b-row class=" d-flex justify-content-between p-4 ">
                <b-col cols="12" md="4" class="text-center text-md-left pt-3">
                    <h1 class="text-primary">HR Helper</h1>
                </b-col>
                <b-col cols="12" md="auto" class="pt-3 text-right">
                    <b-input-group class="mt-2">
                        <b-form-input v-model="search" placeholder="search" @change="$emit('search', search)">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button @click="search = null, $emit('search', search)" class="text-white" variant="secondary"> 
                                Rensa
                            </b-button>
                            <b-button @click="visible = !visible" size="sm" class="text-white" variant="primary">
                                Lägg till client
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-collapse id="add-user" v-model="visible" class="add-user bg-primary p-3">
                <b-form>
                    <b-row>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="newUser.firstname" placeholder="Förnman" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="newUser.lastname" placeholder="Efternamn" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="newUser.email" placeholder="Email*" />
                        </b-col>
                        <b-col cols="12" class="py-2">
                            <b-form-input v-model="newUser.adress" placeholder="adress" />
                        </b-col>
                        <b-col cols="6" class="py-2">
                            <b-button   @click="onSubmit(newUser)"  
                                        :disabled="newUser.email === null"
                                        secondary="primary">
                                Skapa
                            </b-button>
                        </b-col>
                        <b-col cols="6" class="text-right py-2">
                            <b-button   @click="cancelForm()" 
                                        variant="secondary">
                                Ångra
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-collapse>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'HR_Helper',
        data() {
            return {
                search: null,
                error: false,
                visible: false,
                newUser: {
                    firstname: null,
                    lastname: null,
                    steps: 1,
                    adress: null,
                    email: null
                }
            }
        },
        methods: {
            onSubmit(newUser) {
                this.$store.dispatch('createUser', newUser)
                .then(() => {
                    this.visible = false
                    this.newUser =   {
                            firstname: null,
                            lastname: null,
                            steps: 1,
                            adress: null,
                            email: null
                        }
                })
                .then(() => {
                    this.$emit('toast', 'success', 'DONE !', 'To do Created')
                    return this.$store.dispatch('getUsers')
                })
                .catch(() => {
                    this.$emit('toast', 'danger', 'Warning!', 'To do where not created!')
                })
            },
            cancelForm() {
                this.visible = false
                this.newUser =   {
                        firstname: null,
                        lastname: null,
                        steps: 1,
                        adress: null,
                        email: null
                    }
            }
        },
    }
</script>
