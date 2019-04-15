<template>
<div>
    <!-- header-->
        <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM" @searchK="searchK"></header-component>
    <!--end header -->
    <!-- title --->
    <migajas-component titulo="Diseñar > Personalizar"></migajas-component>
    <!-- end title --->
</div>

</template>

<script>
import headerComponent from "../../../components/layouts/headerComponent.vue";
import migajasComponent from "../../../components/layouts/migajasComponent.vue";
    export default
    {
        name:'disenarComponent',
        components:
        {
            headerComponent,
            migajasComponent
        },
        props:
        {
            url:{
                type:String,
                require:true
                }
        },
        data() {
            return {
                isLoading: false,
                isDesign: false,
                numCart: 0,
                numBag: 0,
                isAuth: false,
                search: '',
                rubro: ''
            }
        },
        methods:
        {
            loginM(e)
            {

            },
            designM(e)
            {

            },
            searchM(e)
            {

            },
            searchK(e){

            },
        },
    }
</script>