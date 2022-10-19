import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: null,
        user: null,
    },
    getters: {
        users: state => {
            return state.users
        },
        user: state => {
            return state.user
        }
    },
    mutations: {
        users: (state, data) => {
            data = _.sortBy(data, function (user) {
                return new Date(user.do_date);
            });
            state.users = data
        },
        user: (state, data) => {
            state.user = data
        }
    },
    actions: {
        getUser({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/${data}`
                axios.get(url, { header: true })
                    .then((response) => {
                        commit('user', response.data)
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        getUsers({ commit }, ) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/`
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
        createUser(data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users`
                axios.post(url, data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        deleteUser(data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/${data}`
                axios.delete(url)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        updateUsers(data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/${data.id}`
                axios.put(url, data)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    }
})