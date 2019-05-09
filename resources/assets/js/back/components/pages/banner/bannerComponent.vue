<style>
	select.form-control:not([size]):not([multiple])
	{
    	height: calc(1.75rem + 1.15px);
	}
	.btn-cargar
 	{
	    border: 1px solid #e7e7e7;
	    border-radius: 25px;
	    height: 30px;
	    background-color: #fbfbfb;
	    color: #424242;
  	}
	.img-barna
  	{
	    width:auto;
	    height:28px;
	    border: 1px solid #ebebeb;
	    border-radius: 4px;
  	}
  	.img-barna-grande
  	{
    	width:100%;
    	height:auto;
    	border: 1px solid #ebebeb;
    	border-radius: 4px;
  	}
  	.imagen-cuadrada
	{
	    width:15px; 
	    height:15px;
	}
	.textarea-barna
	{
		border-radius: 10px;
	}
	.h-30
	{
		height:30px;
	}
	.imagen-cuadrada
	{
	    width:15px; 
	    height:15px;
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
	            <button type="button" class="btn btn-danger" @click="crear">
	              Crear Banner
	            </button>
	        </div>

	        <div class="card">

	            <div class="card-title">
	              	<h4>
	                <strong>
	                  	Banner
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
	                  :items="banners"
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
	                	<a class="cursor" @click="ver(row.item)">
	                		<img :src="url+row.item.imagen" class="imagen-cuadrada">
	                	</a>
	              	</template>

	              	<template slot="articulo" slot-scope="row">
	                	{{row.item.articulo.nombre}}
	              	</template>

	              	<template slot="actions" slot-scope="row">
	                	 <button @click="editar(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                  		<button @click="eliminarBanner(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
	              	</template>

	              	</b-table>

              		<b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

		    	</div>
		    </div>
		</div>

		<!-- Modal para crear banner -->
      	<div class="modal" id="crear">
          	<div class="modal-dialog" role="document">
              	<div class="modal-content">
                  	<div class="modal-header">
                      	<h5 class="modal-title pull-left"><strong>Crear Banner</strong></h5>
                      	<a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  	</div>
                  	<div class="modal-body">
                      	<div class="row">
                          	<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              	<label class="control-label h6" for="nombre">Artículos</label>
                              	<select class="form-control input-sm input-rounded" v-model="banner.articulo.id">
                                	<option  v-for="articulo in articulos" :value="articulo.id">{{articulo.nombre}}</option>
                              	</select>
                          	</div>
                          	<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">

                              	<label class="control-label h6" for="imagen">Imagen (1920x720)</label>
                              	
                          		<button class="btn-cargar btn-block cursor" v-if="banner.url == '' &&  banner.src == ''" @click="openInputFile()" style="" :class="{'btn-error': !banner.valida}">
                            	<i class="fa fa-picture-o" aria-hidden="true"></i> Examinar
                              	</button>

                              	<span v-if="!banner.valida" class="error-text">Imagen debe ser menor o igual a 5MB</span> 

                              	<div class="h-30">
                              		<img class="img-fluid  img-responsive img-barna" v-if="banner.url != null && banner.url != '' && banner.url!='image'" :src="banner.src" >

                              		<input accept="image/*" v-if="banner.url == '' &&  banner.src == ''" class="d-none" type="file" ref="imagenInput" @change="cargafoto($event)">

	                            	<button class="btn btn-xs btn-danger" v-else @click="limpiar()"><i class="fa fa-trash"></i></button>
                              	</div>
                          	</div>
                          	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-validation">
                              	<label class="control-label h6" for="descripcion">Descripción</label>
                              	<textarea rows="5"  name="descripcion" class="form-control textarea-barna" v-model="banner.descripcion" 
                              	autocomplete="off" 
                              	:class="{'error-input': errors.first('descripcion','form-crear')}"
                              	data-vv-scope="form-crear"
                              	v-validate
                              	data-vv-rules="required:true|min:3"> 
							        Ingrese una descripción
							    </textarea> 
                              	
                              	<span class="error-text" v-if="errors.firstByRule('descripcion', 'required','form-crear')">Campo requerido</span>	

                              	<span class="error-text" v-else-if="errors.firstByRule('descripcion','min','form-crear')">Mínimo 3 caracteres</span>
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
      	<!-- Modal para crear banner -->

      	<!-- Modal para editar banner -->
      	<div class="modal" id="editar">
          	<div class="modal-dialog" role="document">
              	<div class="modal-content">
                  	<div class="modal-header">
                      	<h5 class="modal-title pull-left"><strong>Editar Banner</strong></h5>
                      	<a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  	</div>
                  	<div class="modal-body">
                      	<div class="row">
                          	<div class="col-lg-12 col-md-6 col-sm-12 col-xs-12 form-validation">
                              	<label class="control-label h6" for="nombre">Artículos</label>
                              	<select class="form-control input-sm input-rounded" v-model="banner.articulo.id">
                                	<option  v-for="articulo in articulos" :value="articulo.id">{{articulo.nombre}}</option>
                              	</select>
                          	</div>
                          	<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                            	<label class="control-label h6" for="imagen">Imagen Actual</label>
                            	<div class="text-left">
                              		<img :src="url+banner.imagen" class="img-fluid img-responsive img-barna">
                            	</div>
                          	</div>
                          	<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 form-validation">

                              	<label class="control-label h6" for="imagen">Actualizar Imagen (1920x720)</label>
                              	
                          		<button class="btn-cargar btn-block cursor" v-if="banner.url == '' &&  banner.src == ''" @click="openInputFile()" style="" :class="{'btn-error': !banner.valida}">
                            	<i class="fa fa-picture-o" aria-hidden="true"></i> Examinar
                              	</button>

                              	<span v-if="!banner.valida" class="error-text">Imagen debe ser menor o igual a 5MB</span> 

                              	<div >
	                            	<img class="img-fluid  img-responsive img-barna" v-if="banner.url != null && banner.url != '' && banner.url!='image'" :src="banner.src" >
	                           
	                            	<input accept="image/*" v-if="banner.url == '' &&  banner.src == ''" class="d-none" type="file" ref="imagenInput" @change="cargafoto($event)">

	                            	<button class="btn btn-xs btn-danger" v-else @click="limpiar()"><i class="fa fa-trash"></i></button>
                              	
                              	</div>
                          	</div>	
                          	<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-validation">
                              	<label class="control-label h6" for="descripcion">Descripción</label>
                              	<textarea rows="5"  name="descripcion" class="form-control textarea-barna" v-model="banner.descripcion" 
                              	autocomplete="off" 
                              	:class="{'error-input': errors.first('descripcion','form-actualizar')}"
                              	data-vv-scope="form-actualizar"
                              	v-validate
                              	data-vv-rules="required:true|min:3"> 
							        Ingrese una descripción
							    </textarea> 
                              	
                              	<span class="error-text" v-if="errors.firstByRule('descripcion', 'required','form-actualizar')">Campo requerido</span>	

                              	<span class="error-text" v-else-if="errors.firstByRule('descripcion','min','form-actualizar')">Mínimo 3 caracteres</span>
                          	</div>
                      	</div>
                  	</div>
                  	<div class="modal-footer">
                      	<button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                      	<button type="button" class="btn btn-xs btn-primary pull-right" @click="actualizar()">Guardar</button>
                  	</div>
              	</div>
         	</div>
      	</div>
      	<!-- Modal para editar banner -->

	    <!-- Modal para eliminar imagen -->
      	<div class="modal" id="eliminar">
          	<div class="modal-dialog" role="document">
              	<div class="modal-content">
                  	<div class="modal-header">
                    	<h5 class="modal-title pull-left"><strong>Eliminar Banner</strong></h5>
                      	<a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  	</div>
                  	<div class="modal-body">
                    	<div class="col-lg-12">
                          	<p>¿Está seguro que desea eliminar el banner del artículo <strong>{{banner.articulo.nombre}}</strong> de forma permanente? </p>
                      	</div>
                      	<div class="col-12">
                        	<img :src="url+banner.imagen" class="img-responsive img-barna">
                      	</div>
                  	</div>
                  	<div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                      	<button type="button" class="btn btn-xs btn-primary pull-right" @click="eliminar()">Eliminar</button>
                  	</div>
              	</div>
          	</div>
      	</div>
      	<!-- Modal para eliminar imagen -->

      	<!-- Modal para ver la imagen -->
	    <div class="modal" id="ver">
	        <div class="modal-dialog" role="document">
	            <div class="modal-content">
	                <div class="modal-header">
	                    <h5 class="modal-title pull-left"><strong>Banner</strong></h5>
	                    <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
	                </div>
	                <div class="modal-body">
	                    <div class="col-12">
	                       <img :src="url+banner.imagen" class="img-responsive img-barna-grande">
	                    </div>
	                </div>
	                <div class="modal-footer">
	                    <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    <!-- Modal para ver la imagen -->
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
	        banner:
	        {
	        	id:'',
	        	imagen:'',
	        	descripcion:'',
	        	url:'',
	        	src:'',
	        	valida: false,
	        	tamanho:'',
	        	articulo:
	        	{
	        		id:'',
	        		nombre:''
	        	}
	        },
	        banners:[],
	        articulos:[],
	        fields: 
	        [
	           { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
	           { key: 'imagen', label: 'Imagen', sortable: true, 'class': 'text-center' },
	           { key: 'articulo', label: 'Artículo', sortable: true, 'class': 'text-left' },
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
	        filter: null
		}
	},
	created()
	{
		this.url = this.getUrl;//obtengo la url base
		this.todos();
		this.obtenerarticulos();
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
	    	this.limpiar();
	    	this.banner.id = null;
	        this.banner.valida = true;
	        this.banner.articulo.id = 1;
	        if(this.articulos.length>0)
	        {
	        	$('#crear').modal('show');
	        }
	        else
	        {
	        	this.mensaje("error","No hay artículos creados. No se pueden crear banner");
	        }
	    },
	    cargafoto(event)
	    {
	        this.banner.tamanho = this.calculatamanho(event.target.files[0]['size']);
	        if (this.tamanhovalido() && event.target.files[0].type.split('/')[0] === 'image')//Si la imagen es mayor a 5MB
	        {
	          	this.banner.valida = true;
	          	this.banner.url = event.target.files[0];
	          	var reader = new FileReader()
	         	reader.readAsDataURL(event.target.files[0])
	          	reader.onload = function ()
	          	{
	            	this.banner.src = reader.result;
	          	}.bind(this)
	            	reader.onerror = function (error)
	          	{}
	        }
	        else
	        {
	          	this.limpiar();
	          	this.banner.valida = false;
	        }
	    },
	    guardar()
	    {
	    	this.$validator.validateAll("form-crear").then(resp => 
	        {
	          	if(resp)
	          	{
	              	var dataform = new FormData();
	              	dataform.append("imagen", this.banner.url);
	              	dataform.append("articulo_id", this.banner.articulo.id);
	              	dataform.append("descripcion", this.banner.descripcion);
	              	CerService.post("/banner/guardar",dataform)
	              	.then(response => 
	              	{
	                  	this.todos();
	                  	this.mensaje("success",response.msg);
	              	})
	              	.catch(error => {
	                	this.mensaje("error","Ha ocurrido un error inesperado");
	              	});
	              	$('#crear').modal('hide');
	          	}
	          	else
	          	{
	            	this.mensaje("warning","Por favor verifique los campos");
	          	}
	        });

	    },
	    editar(banner)
	    {
	    	this.limpiar();
        	this.banner.id = banner.id;
        	this.banner.descripcion = banner.descripcion;
        	this.banner.imagen = banner.imagen;
        	this.banner.valida = true;
        	this.banner.articulo.id = banner.articulo.id;
        	this.banner.articulo.nombre = banner.articulo.nombre;
        	$('#editar').modal('show');
	    },
	    actualizar()
	    {
	    	this.$validator.validateAll("form-actualizar").then(resp => 
        	{
          		if(resp)
		        {
		            var dataform = new FormData();
		            dataform.append("descripcion", this.banner.descripcion);
		            dataform.append("articulo_id", this.banner.articulo.id);
		            dataform.append("imagen", this.banner.url);
		            var url = 'banner/:id/actualizar';
		            url = url.replace(':id', this.banner.id);
		            CerService.post(url,dataform)
		            .then(response => 
		            {
		                this.todos();
		                this.mensaje("success",response.msg);
		            })
		            .catch(error => {
		              this.mensaje("error","Ha ocurrido un error inesperado");
		            });
		            $('#editar').modal('hide');
		        }
		        else
		        {
		            this.mensaje("warning","Por favor verifique los campos");
		        }
		    });
	    },
	    eliminarBanner(banner)
	    {
	    	this.banner.id = banner.id;
	        this.banner.articulo.nombre = banner.articulo.nombre;
	        this.banner.imagen = banner.imagen;
	        $('#eliminar').modal('show');
	    },
	    eliminar()
	    {
	    	$('#eliminar').modal('hide');
	        var url = '/banner/:id/eliminar';
	        url = url.replace(':id', this.banner.id);
	        CerService.post(url)
	        .then(response => 
	        {
	            this.todos();
	            if(response.res==1)
	            {
	                this.mensaje("success",response.msg);
	            }
	            else
	            {
	                this.mensaje("error",response.msg);
	            }
	        })
	        .catch(error => {
	            this.mensaje("error","Ha ocurrido un error inesperado");
	        });
	    },
	    ver(banner)
      	{
        	this.banner.id = banner.id;
        	this.banner.articulo.nombre = banner.articulo.nombre;
        	this.banner.imagen = banner.imagen;
        	$('#ver').modal('show');
      	},
	    todos()
	    {
	    	CerService.post("/banner/todos")
	        .then(response => {
	          	if(response.banners)
	          	{
	            	this.banners = response.banners;
	            	this.totalRows
	          	}
	        })
	        .catch(error => {
	          	this.mensaje("error","Ha ocurrido un error inesperado");
	        }); 
	    },
	    obtenerarticulos()
	    {
	    	CerService.post("/articulos/todos/para-banner")
	        .then(response => {
	          	if(response.articulos)
	          	{
	            	this.articulos = response.articulos;
	          	}
	        })
	        .catch(error => {
	          	this.mensaje("error","Ha ocurrido un error inesperado");
	        }); 
	    },
		mensaje(tipo,mensaje)
	    {
	        this.$swal
	        .mixin({
	          toast: true,
	          position: "top-end",
	          showConfirmButton: false,
	          timer: 4000
	        })
	        .fire({
	          type: tipo,
	          title: mensaje
	        });
	    },
	    limpiar()
	    {
	        this.banner.url='';
	        this.banner.src='';
	    },
	    openInputFile() 
	    {
	        let elem = this.$refs.imagenInput
	        elem.click()
	    },
	    tamanhovalido()
	    {
	        if(this.banner.tamanho<=1)//menor a 5MB
	        {
	          return true;
	        }
	        return false;
	    },
	    calculatamanho(tamanho)
	    {
	        return ((tamanho/1024)/1024);
	    }
	}
}

</script>