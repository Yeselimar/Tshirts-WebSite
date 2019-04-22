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
  data() {
        return {
        }
    }
};
</script>