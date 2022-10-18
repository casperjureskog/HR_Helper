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
                        console.log('user', response);
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
                    console.log('users', response);
                    commit('users', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        createUser({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users`
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
        deleteUser({ commit },data) {
            return new Promise((resolve, reject) => {
                let url = `${process.env.VUE_APP_API}users/${data}`
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