<template>
    <div class="bg-dark">
        <b-container class="position-relative">
            <b-row class=" d-flex justify-content-between p-4 p-md-0">
                <b-col cols="12" class="text-center text-md-left pt-3">
                    <h1 class="text-primary">HR Helper</h1>
                </b-col>
             
            </b-row>
           
        </b-container>
    </div>
</template>

<script>
    export default {
        name: 'HR Helper',
        data() {
            return {
                search: null,
                error: false,
                visible: false,
                title: null,
                content: null,
                date: null,
                time: null
            }
        },
         methods: {
         
        },
    }
</script>
