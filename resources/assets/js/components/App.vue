<template>
    <div>
        <!-- header-->
            <header-component></header-component>
        <!--end header -->
        <router-view></router-view>

        <!--footer-->
            <footer-component></footer-component>
        <!-- end footer -->
    </div>
</template>
<script>
  import { EventBus } from '../event-bus.js';
  import headerComponent from "../components/layouts/headerComponent.vue";
    import footerComponent from "../components/layouts/footerComponent.vue";


export default {
    created(){
        this.$store.dispatch('loadUser')
    },
    components:
    {
        headerComponent,
        footerComponent
    },
  data() {
        return {
        }
    }
};
</script>