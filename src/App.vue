<template>
  <div id="app">
        <Header @search="setSearch" @toast="toast"/>
        <Home :search="search" @toast="toast" />
  </div>
</template>

<script>
import '@/styles/main.scss'
import Header from './components/Header.vue'
import Home from './sections/Home.vue'
export default {
    name: 'HR_helper',
    data() {
        return {
            search: null
        }
    },
    components: {
        Header,
        Home
      
    },
    methods: {
        getUsers() {
            this.$store.dispatch('getUsers')
            .catch(() => {
               this.$emit('toast', 'danger', 'Warning!', 'Users where not collected')
            })
        },
        setSearch(search) {
            this.search = search
        },
        toast(variant = null, title, text) {
            this.$bvToast.toast(text, {
                title: title,
                toaster: 'b-toaster-bottom-right',
                variant: variant,
                solid: true,
            })
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
