<style>
	select.form-control:not([size]):not([multiple])
	{
    	height: calc(2.25rem + 1.15px);
	}
  .imagen-cuadrada
	{
	    width:auto; 
      height:15px;
	    border: 1px solid #ebebeb;
      border-radius: 3px;
	}
	.capsula-categoria
	{
	    height: 15px;
	    font-size: 11px;
	    background-color: #ef7a6e;
	    font-weight: bold;
	    text-transform: uppercase;
	    color: #fff !important;
	    margin-right: 4px;
	}
  .sin-categoria
  {
    height: 15px;
    font-size: 11px;
    background-color: #dc3545;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff !important;
  }
  .btn-cargar
  {
    border: 1px solid #e7e7e7;
    border-radius: 25px;
    height: 30px;
    background-color: #fbfbfb;
    color: #424242;
  }
  .btn-error
  {
    border: 1px solid red !important;
  }
  /* para las imagenes con contenedores*/
  .img-barna
  {
    width:auto;
    height:27px;
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
  .form-validation
  {
    padding-bottom: 18px !important;
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
          <a class="btn btn-sm btn-danger">Cargar Múltiples</a>
          <a class="btn btn-sm btn-danger" @click="crear">Crear una Imagen Prediseñada</a>
        </div>

        <div class="card">

            <div class="card-title">
              	<h4>
                <strong>
                  	Imágenes Prediseñadas
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
                	<a class="cursor" @click="ver(row.item)">
                    <img :src="url+row.item.url" class="imagen-cuadrada">
                  </a>
              	</template>

              	<template slot="nombre" slot-scope="row">
                	{{row.item.nombre}}
              	</template>

              	<template slot="categoria" slot-scope="row">
              	  <span v-if="row.item.categoria_id" class="badge badge-pill capsula-categoria">{{row.item.categoria.nombre}}</span>
                  <span v-else class="badge badge-pill sin-categoria">SIN CATEGORÍA</span>
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
      <div class="modal" id="crear">
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
                              <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-crear')">Campo requerido</span>

                              <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-crear')">Mínimo 3 caracteres</span>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="nombre">Categoría {{imagen.categoria.id}}</label>
                              <select class="form-control input-sm input-rounded" v-model="imagen.categoria.id">
                              	<option  v-for="categoria in categorias" :value="categoria.id">{{categoria.nombre}}</option>
                              </select>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="imagen">Imagen</label>
                              
                              <button class="btn-cargar btn-block cursor" v-if="imagen.url == '' &&  imagen.src == ''" @click="openInputFile()" style="" :class="{'btn-error': !imagen.valida}">
                                <i class="fa fa-picture-o" aria-hidden="true"></i> Examinar
                              </button>

                              <span v-if="!imagen.valida" class="error-text">Imagen debe ser menor o igual a 5MB</span> 

                              <div class="h-30">
                                <img class="img-fluid  img-responsive img-barna" v-if="imagen.url != null && imagen.url != '' && imagen.url!='image'" :src="imagen.src" >

                                <input accept="image/*" v-if="imagen.url == '' &&  imagen.src == ''" class="d-none" type="file" ref="imagenInput" @change="cargafoto($event)">

                                <button class="btn btn-xs btn-danger" v-else @click="limpiar()"><i class="fa fa-trash"></i></button>
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

      <!-- Modal para editar imagen -->
      <div class="modal" id="editar">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Editar Imagen Prediseñada</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="nombre">Nombre</label>
                              <input type="text" name="nombre" class="form-control input-sm input-rounded" v-model="imagen.nombre" 
                              autocomplete="off" 
                              :class="{'error-input': errors.first('nombre','form-actualizar')}"
                              data-vv-scope="form-actualizar"
                              v-validate
                              data-vv-rules="required:true|min:3"
                              >
                              <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-actualizar')">Campo requerido</span>

                              <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-actualizar')">Mínimo 3 caracteres</span>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="nombre">Categoría</label>
                              <select class="form-control input-sm input-rounded" v-model="imagen.categoria.id">
                                <option  v-for="categoria in categorias" :value="categoria.id">{{categoria.nombre}}</option>
                              </select>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <label class="control-label h6" for="imagen">Imagen Actual</label>
                            <div class="text-left">
                              <img :src="url+imagen.imagen" class="img-fluid img-responsive img-barna">
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="imagen">Actualizar Imagen</label>
                                
                              <button class="btn-cargar btn-block cursor" v-if="imagen.url == '' &&  imagen.src == ''" @click="openInputFile()" style="" :class="{'btn-error': !imagen.valida}">
                                <i class="fa fa-picture-o" aria-hidden="true"></i> Examinar
                              </button>

                              <span v-if="!imagen.valida" class="error-text">Imagen debe ser menor o igual a 5MB</span> 

                              <div class="h-30">
                                <img class="img-fluid  img-responsive img-barna" v-if="imagen.url != null && imagen.url != '' && imagen.url!='image'" :src="imagen.src" >
                              
                              
                                <input accept="image/*" v-if="imagen.url == '' &&  imagen.src == ''" class="d-none" type="file" ref="imagenInput" @change="cargafoto($event)">

                                <button class="btn btn-xs btn-danger" v-else @click="limpiar()"><i class="fa fa-trash"></i></button>

                              </div>
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
      <!-- Modal para editar imagen -->

      <!-- Modal para eliminar imagen -->
      <div class="modal" id="eliminar">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Eliminar Imagen Prediseñada</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-lg-12">
                          <p>¿Está seguro que desea eliminar la imagen prediseñada <strong>{{this.imagen.nombre}}</strong> de forma permanente? </p>
                      </div>
                      <div class="col-12">
                        <img :src="url+imagen.imagen" class="img-responsive img-barna">
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
                      <h5 class="modal-title pull-left"><strong>Imagen Prediseñada: {{this.imagen.nombre}}</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-12">
                        <img :src="url+imagen.imagen" class="img-responsive img-barna-grande">
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
        imagen:
        {
        	id:'',
          nombre:'',
          imagen:'',
        	url:'',
          src:'',
          tamanho:'',
          valida:false,
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
        this.limpiar();
	    	this.imagen.id = null;
        this.imagen.nombre = '';
        this.imagen.valida = true;
        this.imagen.categoria.id = '';
        $('#crear').modal('show');
	    },
	    cargafoto(event)
	    {
        this.imagen.tamanho = this.calculatamanho(event.target.files[0]['size']);
        if (this.tamanhovalido() && event.target.files[0].type.split('/')[0] === 'image')//Si la imagen es mayor a 5MB
        {
          this.imagen.valida = true;
          this.imagen.url = event.target.files[0];
          var reader = new FileReader()
          reader.readAsDataURL(event.target.files[0])
          reader.onload = function ()
          {
            this.imagen.src = reader.result;
          }.bind(this)
            reader.onerror = function (error)
          {}
        }
        else
        {
          this.limpiar();
          this.imagen.valida = false;
        }
	    },
	    guardar()
	    {
	    	this.$validator.validateAll("form-crear").then(resp => 
        {
          if(resp)
          {
              var dataform = new FormData();
              dataform.append("nombre", this.imagen.nombre);
              dataform.append("categoria_id", this.imagen.categoria.id);
              dataform.append("imagen", this.imagen.url);
              CerService.post("/imagenes-predisenadas/guardar",dataform)
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
	    editar(imagen)
	    {
        this.limpiar();
        this.imagen.id = imagen.id;
        this.imagen.nombre = imagen.nombre;
        this.imagen.imagen = imagen.url;
        this.imagen.valida = true;
        this.imagen.categoria.id = (imagen.categoria_id == null) ? "" : imagen.categoria_id;
        $('#editar').modal('show');
	    },
	    actualizar()
	    {
        this.$validator.validateAll("form-actualizar").then(resp => 
        {
          if(resp)
          {
              var dataform = new FormData();
              dataform.append("nombre", this.imagen.nombre);
              dataform.append("categoria_id", this.imagen.categoria.id);
              dataform.append("imagen", this.imagen.url);
              var url = '/imagenes-predisenadas/:id/actualizar';
              url = url.replace(':id', this.imagen.id);
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
	    eliminarImagen(imagen)
	    {
        this.imagen.id = imagen.id;
        this.imagen.nombre = imagen.nombre;
        this.imagen.imagen = imagen.url;
        $('#eliminar').modal('show');
	    },
	    eliminar()
	    {
        $('#eliminar').modal('hide');
        var url = '/imagenes-predisenadas/:id/eliminar';
        url = url.replace(':id', this.imagen.id);
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
      ver(imagen)
      {
        this.imagen.id = imagen.id;
        this.imagen.nombre = imagen.nombre;
        this.imagen.imagen = imagen.url;
        $('#ver').modal('show');
      },
	    todos()
	    {
	    	CerService.post("/imagenes-predisenadas/tipo/administrador")
	        .then(response => {
	          	if(response.imagenes)
	          	{
	            	this.imagenes = response.imagenes;
	            	this.totalRows = this.imagenes.length;
	          	}
	        })
	        .catch(error => {
	          	this.mensaje("error","Ha ocurrido un error inesperado");
	        }); 
	    },
	    obtenercategorias()
	    {
	    	CerService.post("/categorias/todos")
	        .then(response => {
	          	if(response.categorias)
	          	{
	            	this.categorias = response.categorias;
                this.categorias.push({id:"",nombre:"Sin categoría"});
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
        this.imagen.url='';
        this.imagen.src='';
      },
      openInputFile() 
      {
          let elem = this.$refs.imagenInput
          elem.click()
      },
      tamanhovalido()
      {
        if(this.imagen.tamanho<=5)//menor a 5MB
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