<style>
  .btn
  {
    color:#fff !important;
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
              <h4>
                <strong>
                  Nuevo Artículo
                </strong>
              </h4>
              <div class="pull-right">
                <a class="btn btn-sm btn-danger">Ir a Listado de Artículos</a>
              </div>
            </div>

            <div class="card-body">
               <div class="d-flex">
                      <input name="nombre" id="nombre" type="text" placeholder="Nombre del Artículo" class="form-control input-sm" v-model="articulo.nombre" autocomplete="off" 
                      :class="{'error-input': errors.first('nombre','form-create')}"
                      data-vv-scope="form-create"
                      v-validate
                      data-vv-rules="required:true|min:3"
                      >
                      <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-create')" >Campo requerido.</span>
                      <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-create')">Mínimo 3 caracteres.</span>
                </div>


            </div>
        </div>

      </div>
    </div>

   

</template>

<script>
  import CerService from "../../../../plugins/CerService";
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isLoading: false,
        isDesign: false,
        articulo: {
        	nombre: ''
        },
      }
    },
    components:
    {

    },
    computed:
    {
      ...mapGetters(['getIsAuth','getUrl','getFiltroArticulo']),
    },
    mounted()
    {

    },
    created: function()
    {
      
      if(this.getFiltroArticulo === 'disenables'){
      	this.isDesign = true
      } else{
      	this.isDesign = false
      }

    },
    methods:
    {

    },
  }


</script>