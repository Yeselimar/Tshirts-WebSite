<template>
    <div>
        <v-app>

        <router-view></router-view>
        </v-app>

    </div>
</template>
<script>
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import 'chartist/dist/chartist.min.css'

export default {
    created(){
        this.$store.dispatch('loadUserAdmin')
    },
    components:
    {
    },
  data() {
        return {
        }
    }
};
</script>