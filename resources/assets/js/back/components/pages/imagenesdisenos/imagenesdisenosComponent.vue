<style>
	.custom-file-label
	{
		height: calc(1.90rem + 1px) !important;
	    padding: .200rem .50rem !important;
	    border-radius: 25px;

	}
	    
	.custom-file-label::after
	{
		height: calc(calc(1.90rem + 1px) - 1px * 2) !important;
	    padding: 0.200rem .500rem !important;
	    content: "Examinar" !important;
	    border-radius: 0 25px 25px 0;

	}
	select.form-control:not([size]):not([multiple])
	{
    	height: calc(1.90rem + 1.15px);
	}
  	.imagen-cuadrada
	{
	    width:15px; 
	    height:15px;
	}
	.capsula-rubros
	{
	    height: 15px;
	    font-size: 11px;
	    background-color: #ef7a6e;
	    font-weight: bold;
	    text-transform: uppercase;
	    color: #fff !important;
	    margin-right: 4px;
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
        
        <div class="text-right">
          	<a class="btn btn-sm btn-danger" @click="crear">Crear Imagen Prediseñada</a>
        </div>

        <div class="card">

            <div class="card-title">
              	<h4>
                <strong>
                  	Imágenes de Diseños
                </strong>
              	</h4>

            </div>

            <div class="card-body">
            	<b-table
                  show-empty
                  empty-text ="No hay registros para mostrar"
                  empty-filtered-text="
                  No hay registros que coincidan con su búsqueda"
                  class="table table-hover"
                  :class="{'table-responsive': table_responsive}"
                  :items="imagenes"
                  :fields="fields"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  @filtered="onFiltered"
              	>

              	<template slot="id" slot-scope="row">
                	{{row.item.id}}
              	</template>

              	<template slot="imagen" slot-scope="row">
                	<img :src="url+row.item.url" class="imagen-cuadrada">
              	</template>

              	<template slot="nombre" slot-scope="row">
                	{{row.item.nombre}}
              	</template>

              	<template slot="categoria" slot-scope="row">
              		<span class="badge badge-pill capsula-rubros">{{row.item.categoria.nombre}}</span>
              	</template>

              	<template slot="pertenece" slot-scope="row">
              		{{row.item.usuario.rol}}
              	</template>

              	<template slot="actions" slot-scope="row"> 
              		<button @click="editar(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                  	<button @click="eliminarImagen(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
              	</template>

              	</b-table>

              	<b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

            </div>

        </div>

    	</div>

    	<!-- Modal para crear imagen -->
        <div class="modal" id="crear" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Crear Imagen Prediseñada</strong></h5>
                        <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                                <label class="control-label h6" for="nombre">Nombre</label>
                                <input type="text" name="nombre" class="form-control input-sm input-rounded" v-model="imagen.nombre" 
                                autocomplete="off" 
                                :class="{'error-input': errors.first('nombre','form-crear')}"
                                data-vv-scope="form-crear"
                                v-validate
                                data-vv-rules="required:true|min:3"
                                >
                                <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-crear')">Campo requerido.</span>

                                <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-crear')">Mínimo 3 caracteres.</span>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                                <label class="control-label h6" for="nombre">Categoría {{imagen.categoria.id }}</label>
                                <select class="form-control input-sm input-rounded" v-model="imagen.categoria.id">
                                	<option  v-for="categoria in categorias" :value="categoria.id">{{categoria.nombre}}</option>
                                </select>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="control-label h6" for="imagen">Imagen</label>
                                <div class="custom-file">
							    	<input type="file" class="custom-file-input input-sm" id="customFile" accept="image/*" @change="cargafoto">
							    	<label class="custom-file-label" for="customFile">Seleccione una imagen</label>
							  	</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-xs btn-primary pull-right" @click="guardar()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para crear imagen -->
	</div>
</template>

<script>
  import CerService from "../../../../plugins/CerService";
  import loading from "../../../../components/layouts/loading.vue";
  import { mapGetters } from 'vuex'

export default
{
    data () {
      	return {
        url:'',
        imagen:
        {
        	id:'',
        	url:'',
        	nombre:'',
        	categoria:
        	{
        		id:'',
        		nombre:'',
        	}
        },
        imagenes:[],
        categorias:[],
        fields: 
        [
          { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
          { key: 'imagen', label: 'Imagen', sortable: true, 'class': 'text-center' },
          { key: 'nombre', label: 'Nombre', sortable: true, 'class': 'text-left' },
          { key: 'categoria', label: 'Categoría', sortable: true, 'class': 'text-center' },
          { key: 'pertenece', label: 'Pertenece', sortable: true, 'class': 'text-center' },
          { key: 'actions', label: 'Acciones', 'class': 'text-center' }
        ],
        currentPage: 1,
        perPage: 10,
        totalRows: 0,
        pageOptions: [5, 10, 15, 20, 50, 100,500,1000],
        sortBy: null,
        sortDesc: false,
        sortDirection: "asc",
        table_responsive: false,
        filter: null,
    	}
   	},
   	components:
   	{

   	},
   	mounted()
    {
      	$(window).resize(event => {
        event.preventDefault();
         
        if (document.body.clientWidth <= 500) {
          this.table_responsive = true;
        } else {
          this.table_responsive = false;
        }
     	});
      	
      	$(".custom-file-input").on("change", function() {
		  var fileName = $(this).val().split("\\").pop();
		  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		});
    },
   	computed:
    {
      	...mapGetters(['getIsAuth','getUrl','getFiltroArticulo']),
      	sortOptions()
      	{
        // Create an options list from our fields
        return this.fields.filter(f => f.sortable).map(f => {
            return { text: f.label, value: f.key };
          });
      	},

    },
   	created: function()
   	{
   		this.url = this.getUrl;//obtengo la url base
   		this.todos();
   		this.obtenercategorias();
   	},
   	methods:
   	{
   		onFiltered(filteredItems)
	    {
	        // Trigger pagination to update the number of buttons/pages due to filtering
	        this.totalRows = filteredItems.length;
	        this.currentPage = 1;
	    },
	    crear()
	    {
	    	this.imagen.id = null;
            this.imagen.nombre = '';
            this.imagen.categoria.id = 1;//selecciono la primera
            $('#crear').modal('show');
	    },
	    cargafoto(event)
	    {
	        this.imagen.url = event.target.files[0];
	    },
	    guardar(event)
	    {
	    	this.$validator.validateAll("form-crear").then(resp => 
            {
                if (resp)
                {
                    var dataform = new FormData();
                    dataform.append("nombre", this.imagen.categoria.nombre);
                    dataform.append("url", this.imagen.categoria.id);
                    dataform.append("url", this.imagen.categoria.id);
                    $('#crear').modal('hide');
                    CerService.post("/categorias/guardar",dataform)
                    .then(response => 
                    {
                        this.todos();
                        this.$swal
                        .mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 4000
                        })
                        .fire({
                            type: "success",
                            title: response.msg
                        });
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
                else
                {
                    this.$swal
                    .mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000
                    })
                    .fire({
                        type: "warning",
                        title: "Por favor verifique los campos"
                    });
                }
            });
	    },
	    editar()
	    {

	    },
	    actualizar()
	    {

	    },
	    eliminar()
	    {

	    },
	    eliminarImagen()
	    {

	    },
	    todos()
	    {
	    	CerService.post("/imagenes-disenos/todos")
	        .then(response => {
	          	if(response.imagenes)
	          	{
	            	this.imagenes = response.imagenes;
	            	this.totalRows = this.imagenes.length;
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
	    obtenercategorias()
	    {
	    	CerService.post("/categorias/todos")
	        .then(response => {
	          	if(response.categorias)
	          	{
	            	this.categorias = response.categorias;
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