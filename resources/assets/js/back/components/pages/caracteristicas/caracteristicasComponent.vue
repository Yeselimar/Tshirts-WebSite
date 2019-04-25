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
	        <div class="text-right">
	            <button type="button" class="btn btn-danger" @click="crear">
	              Crear Caracteristica
	            </button>
	        </div>

	        <div classs="col-lg-12">
	            <div class="card">
	                <div class="card-title">
	                    <h4>Características</h4>
	                </div>
	                <div class="card-body">
	                    <div class="table-responsive">
	                        <table class="table table-hover">
	                        	<thead>
		                        	<tr>
		                        		<th class="text-center">ID</th>
		                        		<th>Grupo</th>
		                        		<th>Valor</th>
		                        		<th class="text-center">Acciones</th>
		                        	</tr>
	                     		</thead>
		                     	<tbody>
		                     		<tr v-for="caracteristica in caracteristicas">
		                     			<td class="text-center">{{caracteristica.id}}</td>
		                     			<td>{{caracteristica.grupo.nombre}}</td>
		                     			<td>{{caracteristica.valor}}</td>
		                     			<td class="text-center">
		                     				<button @click="editar(caracteristica)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                                            <button @click="eliminarCaracteristica(caracteristica)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
		                     			</td>
		                     		</tr>
		                     	</tbody>
	                     	</table>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>

	    <!-- Modal para crear característica -->
        <div class="modal" id="crear">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Crear Característica</strong></h5>
                        <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                      	<div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <label class="control-label h6" for="nombre">Grupo</label>
	                                <select class="form-control input-sm ">
			                            <option v-for="grupo in grupos" :value="grupo.id">@{{ grupo.nombre}}</option>
			                        </select>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <label class="control-label h6" for="nombre">Nombre</label>
                                <input type="text" name="nombre" class="form-control input-sm" v-model="grupo.nombre">
                            </div>
                      	</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-primary pull-right" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-xs btn-inverse pull-right" @click="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para crear característica -->
    </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";

export default {
  	data () {
	    return {
	    	caracteristica:
	    	{
	    		id:'',
	    		valor:'',
	    		color:'',
	    		grupo:
	    		{
	    			id:'',
	    			nombre:''
	    		}
	    	},
	    	caracteristicas:[],
	    	grupos:[]
	    }
   	},
   	created()
   	{
   		this.todos();
   		this.obtenergrupos();
   	},
   	methods:
   	{
   		obtenergrupos()
   		{
   			CerService.post("/grupos/todos")
            .then(response => {
                if(response.grupos)
                {
                    this.grupos = response.grupos;
                }
            })
            .catch(error => {
                this.$swal
                .mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000
                })
                .fire({
                    type: "error",
                    title: "Ha ocurrido un error inesperado"
                });
            }); 
   		},
   		crear()
   		{
   			this.grupo.nombre = '';
            $('#crear').modal('show');
   		},
   		editar()
   		{

   		},
   		eliminarCaracteristica()
   		{

   		},
   		todos()
        {
            CerService.post("/caracteristicas/todos")
            .then(response => {
                if(response.caracteristicas)
                {
                    this.caracteristicas = response.caracteristicas;
                }
            })
            .catch(error => {
                this.$swal
                .mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000
                })
                .fire({
                    type: "error",
                    title: "Ha ocurrido un error inesperado"
                });
            }); 
        }
   	}
}
</script>