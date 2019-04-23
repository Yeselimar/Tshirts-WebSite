<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>


export default {
    created(){
        this.$store.dispatch('loadUserAdmin')
    },
    components:
    {
    },
    mounted()
    {
       
    },
  data() {
        return {
        }
    }
};
</script>