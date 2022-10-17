import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: null
    },
    getters: {
        users: state => {
            return state.users
        }
    },
    mutations: {
        users: (state, data) => {
            data = _.sortBy(data, function (user) {
                return new Date(user.do_date);
            });
            state.users = data
        }
    },
    actions: {
        getUsers({ commit }, ) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos`
                axios.get(url,{ header: true } )
                .then((response) => {
                 
                    commit('users', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        createUsers({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos`
                axios.post(url, data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.log(commit);
                    reject(error)
                })
            })
        },
        deleteUsers({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos/${data.id}`
                axios.delete(url)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.log(commit);
                        reject(error)
                    })
            })
        },
        updateUsers({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/1/todos/${data.id}`
                axios.put(url, data)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.log(commit);
                        reject(error)
                    })
            })
        },
    }
})