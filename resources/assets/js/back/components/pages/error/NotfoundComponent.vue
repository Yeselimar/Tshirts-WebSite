<style>
	.carita-triste
	{
		color:#455a64 !important;
	}
</style>
<template>
	<div class="page-wrapper">

	    <!-- Bread crumb -->
	    <div class="row page-titles">
	        <div class="col-md-5 align-self-center">
	            <h3 class="text-primary">Panel de Control</h3>
	        </div>
	        <!--
	        <div class="col-md-7 align-self-center">
	            <ol class="breadcrumb">
	                <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
	                <li class="breadcrumb-item active">Panel de Control</li>
	            </ol>
	        </div>
	        -->
	    </div>
	    <!-- End Bread crumb -->

	    <div class="container-fluid">

	    	<div class="card">
		    	<div class="card-title">
	            </div>
	            <div class="card-body">
	            	<p></p>
	            	<p class="text-center"><i class="fa fa-frown-o fa-2x carita-triste" aria-hidden="true"></i></p>
	            	<p></p>
	            	<p class="h3 text-center">Página No Encontrada</p>
	            	<p></p>
	            	<p class="h6 text-center">Disculpe, la página solicitdad no puede ser encontrada o ya expiró.</p>
	            	<p></p>
	            	<div class="col-12 text-center">
	            		<button class="btn btn-sm btn-danger" @click="$router.push({ name: 'index'})" >Ir al Inicio</button>
	            	</div>
	            	<p></p>
	            	<p></p>
	            </div>
            </div>

	    </div>

    </div>
</template>

<script>

  	import loading from "../../../../components/layouts/loading.vue";
  	import { mapGetters } from 'vuex'

export default
{
    data () {
      return {
      }

    },
    components:
    {

    }
}

</script>