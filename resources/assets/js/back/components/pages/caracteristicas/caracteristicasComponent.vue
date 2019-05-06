<style>
.hu-color-picker
{
    background: #e9ecef !important;
    border: 1px solid #ced4da !important;
    box-shadow: none !important;
}
.colors,.color-show
{
  display: none !important;
}
.input-group-append
{
  height: 30px !important;
}
.input-group-text
{
  border-radius: 0px 25px 25px 0px !important;
  height: 35px !important;
  padding: 10px 12px !important;
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
              <button type="button" class="btn btn-danger"  @click=" $router.push({ name: 'grupos'})">
                Ver Grupos
              </button>
	            <button type="button" class="btn btn-danger" @click="crear" :class="[{'disabled': !grupo.id}]">
	              Crear Característica
	            </button>
	        </div>

	        <div  classs="col-lg-12">
	            <div class="card">
	                <div class="card-title">

	                   <h4 v-if="grupo" class="h4">Características del Grupo <strong>{{grupo.nombre}}</strong></h4>
                     <h4 v-else class="text-center h4 texto-rojo">El grupo no fue encontrado</h4>
	                </div>
	                <div class="card-body" v-if="grupo">
                      <div class="align-items-center align-items-sm-end d-flex dataTables_length flex-column flex-sm-row justify-content-center justify-content-sm-between pb-3">

                            <label class="d-flex align-items-center">Mostrar 
                                <select v-model="perPage" class="custom-select custom-select-sm form-control form-control-sm">
                                    <option v-for="(value, key) in pageOptions" :key="key">
                                      {{value}}
                                    </option>
                                </select> Entradas
                            </label>

                            <div class="d-flex dataTables_filter">
                                <div>
                                    <b-input-group-append>
                                    <label class="d-flex">Buscar:<input type="search" v-model="filter" placeholder="" >
                                      
                                    </label>
                                    </b-input-group-append>
                                </div>
                            </div>

                      </div>

                      <b-table
                            show-empty
                            empty-text ="No hay registros para mostrar"
                            empty-filtered-text="
                            No hay registros que coincidan con su búsqueda"
                            class="table table-hover"
                            :class="{'table-responsive': table_responsive}"
                            :items="caracteristicas"
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

                        <template slot="valor" slot-scope="row">
                            {{row.item.valor}}
                        </template>

                        <template slot="color" slot-scope="row" v-if="es_color()">
                          <div :style="{'background-color':row.item.color+'!important','color':row.item.color,'height':'20px','border':'1px solid #424242'}">
                          </div>
                        </template>

                        <template slot="color_hexadecimal" slot-scope="row" v-if="es_color()">
                          {{row.item.color}}
                        </template>

                        <template slot="cantidad" slot-scope="row">
                          {{row.item.articulos.length}}
                        </template>

                        <template slot="actions" slot-scope="row">
                          <button @click="editar(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                          <button @click="eliminarCaracteristica(row.item)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
                        </template>

                      </b-table>

                      <b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

	                </div>
	            </div>
	        </div>
	    </div>

	    <!-- Modal para crear característica -->
      <div class="modal" id="crear" v-if="grupo.id">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Crear Característica</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                    	<div class="row">
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="nombre">Grupo</label>
                              <input type="text" name="grupo" v-model="grupo.nombre" class="form-control input-sm input-rounded" disabled>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6 " for="nombre">Valor</label>
                              <input type="text" name="valor" class="form-control input-sm input-rounded" v-model="caracteristica.valor"
                                autocomplete="off" 
                                :class="{'error-input': errors.first('valor','form-crear')}"
                                data-vv-scope="form-crear"
                                v-validate
                                data-vv-rules="required:true|min:1"
                                >
                              <span class="error-text" v-if="errors.firstByRule('valor', 'required','form-crear')">Campo requerido.</span>
                              <span class="error-text" v-else-if="errors.firstByRule('valor','min','form-crear')">Mínimo 3 caracteres.</span>
                          </div>
                          <div v-if="es_color()" class="col-12 form-validation">
                              <label class="control-label h6" for="color">Color Hexadecimal</label>

                              <div class="input-group"> 

                                <input type="text" name="color" class="form-control input-sm input-rounded" v-model="caracteristica.color"  @click="focus_color=!focus_color"  readonly 
                                  :class="{'error-input': !esHexadecimal}"
                                >
                                <span class="input-group-append">
                                  <span class="input-group-text colorpicker-input-addon" @click="focus_color=!focus_color" :class="{'error-input': !esHexadecimal}" ><i v-bind:style="{'background-color':caracteristica.color}"></i></span>
                                </span>

                                <color-picker
                                    v-if="focus_color"
                                    ref="colorNuevo"
                                    :color="color"
                                    style="width: 50% !important;"
                                    :sucker-hide="false"
                                    :sucker-canvas="suckerCanvas"
                                    :sucker-area="suckerArea"
                                    @changeColor="updateColor"
                                    @openSucker="openSucker"
                                />

                              </div>

                              <span v-if="!esHexadecimal" class="error-text">Color debe ser hexadecimal</span>

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
      <!-- Modal para crear característica -->

      <!-- Modal para editar característica -->
      <div class="modal" id="editar" v-if="grupo">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Editar Característica</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="row">
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6" for="nombre">Grupo</label>
                              <input type="text" name="grupo" v-model="grupo.nombre" class="form-control input-sm input-rounded" disabled>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 form-validation">
                              <label class="control-label h6 " for="nombre">Valor</label>
                              <input type="text" name="valor" class="form-control input-sm input-rounded" v-model="caracteristica.valor"
                                autocomplete="off" 
                                :class="{'error-input': errors.first('valor','form-actualizar')}"
                                data-vv-scope="form-actualizar"
                                v-validate
                                data-vv-rules="required:true|min:1"
                                >
                              <span class="error-text" v-if="errors.firstByRule('valor', 'required','form-actualizar')">Campo requerido.</span>
                              <span class="error-text" v-else-if="errors.firstByRule('valor','min','form-actualizar')">Mínimo 3 caracteres.</span>
                          </div>
                          <div v-if="es_color()" class="col-12 form-validation">

                              <label class="control-label h6" for="color">Color Hexadecimal</label>

                              <div class="input-group"> 

                                <input type="text" name="color" class="form-control input-sm input-rounded" v-model="caracteristica.color" id="color"  @click="focus_color=!focus_color"  readonly 
                                  :class="{'error-input': !esHexadecimal}"
                                >
                                <span class="input-group-append">
                                  <span class="input-group-text colorpicker-input-addon" @click="focus_color=!focus_color" :class="{'error-input': !esHexadecimal}" ><i v-bind:style="{'background-color':caracteristica.color}"></i></span>
                                </span>

                                <color-picker
                                    v-if="focus_color"
                                    ref="color"
                                    :color="caracteristica.color"
                                    style="width: 50% !important;"
                                    :sucker-hide="false"
                                    :sucker-canvas="suckerCanvas"
                                    :sucker-area="suckerArea"
                                    @changeColor="changeColor"
                                    @openSucker="openSucker"
                                />

                              </div>

                              <span v-if="!esHexadecimal" class="error-text">Color debe ser hexadecimal</span> 
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
      <!-- Modal para editar característica -->

      <!-- Modal para eliminar característica -->
      
      <div class="modal" id="eliminar">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Eliminar Característica</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-lg-12">
                          <p>¿Está seguro que desea eliminar la característica <strong>{{caracteristica.valor}}</strong> del grupo <strong>{{grupo.nombre}}</strong> de forma permanente? </p>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-xs btn-primary pull-right" @click="eliminar()">Eliminar</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- Modal para eliminar característica -->
  </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";
import loading from "../../../../components/layouts/loading.vue";
import colorPicker from '@caohenghu/vue-colorpicker';

export default {
  	data () {
	    return {
        isLoading: false,
        grupo_id: this.$route.params.id,
        focus_color: false,
	    	caracteristica:
	    	{
	    		id:'',
	    		valor:'',
	    		color:'#424242',
	    		grupo:
	    		{
	    			id:'',
	    			nombre:'',
            es_color:''
	    		}
	    	},
	    	caracteristicas:[],
        grupo: {},
        fields:[],
        fields_color:
        [
            { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
            { key: 'valor', label: 'Valor', sortable: true, 'class': 'text-left' },
            { key: 'color', label: 'Color', sortable: true, 'class': 'text-center' },
            { key: 'color_hexadecimal', label: 'Color Hexadecimal', sortable: true, 'class': 'text-center' },
            { key: 'cantidad', label: 'Cant. Artículos', sortable: true, 'class': 'text-center' },
            { key: 'actions', label: 'Acciones', 'class': 'text-center' }
        ],
        fields_sin_color:
        [
            { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
            { key: 'valor', label: 'Valor', sortable: true, 'class': 'text-left' },
            { key: 'cantidad', label: 'Cant. Artículos', sortable: true, 'class': 'text-center' },
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
        color: '#424242',//Es usada para el componente
        suckerCanvas: null,
        suckerArea: [],
        isSucking: false
	    }
   	},
    components:
    {
      loading,
      colorPicker,
    },
    mounted()
    {
      $(window).resize(event =>
      {
          event.preventDefault();
           
          if (document.body.clientWidth <= 500) {
            this.table_responsive = true;
          } else {
            this.table_responsive = false;
          }
      });
    },
    watch:
    {
      
    },
    computed:
    {
      esHexadecimal()
      {
        var str = this.caracteristica.color;
        var res = str.substring(1, this.caracteristica.color.length);
        if(!this.isHexaColor(res))
        {
          return false;
        }
        return true;
      },
      sortOptions()
      {
          // Create an options list from our fields
          return this.fields.filter(f => f.sortable).map(f => {
              return { text: f.label, value: f.key };
            });
      }
    },
   	created()
   	{
      this.obtenergrupo(this.grupo_id);//obtengo información de un grupo determinado
   		this.obtenercaracteristicas(this.grupo_id); //obtengo las características de un grupo determinado
   	},
   	methods:
   	{
      updateColor(color)
      {
        const {rgba: {r, g, b, a}} = color;
        this.caracteristica.color = this.$refs.colorNuevo.modelHex;//guardo en mi variable
        this.validando();//valido mi color: Sino es un hexadecimal asigna el color por defecto #424242
      },
      changeColor(color)
      {
          const {rgba: {r, g, b, a}} = color;
          this.caracteristica.color = this.$refs.color.modelHex;//guardo en mi variable
          this.validando();//valido mi color: Sino es un hexadecimal asigna el color por defecto #424242
      },
      openSucker(isOpen)
      {
          if (isOpen){
              // ... canvas be created
              // this.suckerCanvas = canvas
              // this.suckerArea = [x1, y1, x2, y2]
          } else {
              // this.suckerCanvas && this.suckerCanvas.remove
          }
      },
      es_color()
      {
        return this.grupo.es_color==1;
      },
      validarcolor()
      {
        if( this.caracteristica.color.length>=7 )
        {
          var str = this.caracteristica.color;
          var res = str.substring(1, this.caracteristica.color.length);
          if(!this.isHexaColor(res))
          {
            this.caracteristica.color = "#424242";
          }
          else
          {
            this.caracteristica.color = this.caracteristica.color;
          }
        }
        this.caracteristica.color = this.caracteristica.color.toUpperCase();
      },
      validando()
      {
        var str = this.caracteristica.color;
        var res = str.substring(1, this.caracteristica.color.length);
        if(!this.isHexaColor(res))//sino es un hexadecimal asigno un color por defecto
        {
          this.caracteristica.color = "#424242".toUpperCase();
        }
        else
        {
          this.caracteristica.color = this.caracteristica.color.toUpperCase();
        }
      },
      isHexaColor(sNum)
      {
        return (typeof sNum === "string") && sNum.length === 6 
               && ! isNaN( parseInt(sNum, 16) );
      },
      onFiltered(filteredItems)
      {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
   		crear()
   		{
        this.caracteristica.color = "#424242".toUpperCase();
   			this.caracteristica.valor = '';
        this.focus_color = false;
        $('#crear').modal('show');
   		},
   		editar(caracteristica)
   		{
        this.focus_color = false;
        this.caracteristica.id=caracteristica.id;
        this.caracteristica.valor=caracteristica.valor;
        this.caracteristica.color=caracteristica.color;
        this.caracteristica.grupo.id=caracteristica.grupo.id;
        this.caracteristica.grupo.nombre=caracteristica.grupo.nombre;
        $('#editar').modal('show');
   		},
   		eliminarCaracteristica(caracteristica)
   		{
        this.caracteristica.id=caracteristica.id;
        this.caracteristica.valor=caracteristica.valor;
        this.caracteristica.color=caracteristica.color;
        this.caracteristica.grupo.id=caracteristica.grupo.id;
        this.caracteristica.grupo.nombre=caracteristica.grupo.nombre;
        $('#eliminar').modal('show');
   		},
   		guardar()
   		{
        this.$validator.validateAll("form-crear").then(resp => 
        {
          if (resp)
          {
            $('#crear').modal('hide');
            var dataform = new FormData();
            dataform.append("grupo_id", this.grupo.id);
            dataform.append("es_color", this.grupo.es_color);
            dataform.append("valor", this.caracteristica.valor);
            dataform.append("color", this.caracteristica.color);
            CerService.post("/caracteristicas/guardar",dataform)
            .then(response => 
            {
              this.obtenercaracteristicas(this.grupo_id);
              this.mensaje("success",response.msg);
            })
            .catch(error => {
              this.mensaje("error","Ha ocurrido un error inesperado");
            });
          }
          else
          {
            this.mensaje("warning","Por favor verifique los campos");
          }
        });
   		},
   		actualizar()
   		{
          this.$validator.validateAll("form-actualizar").then(resp => 
          {
            if (resp)
            {
              $('#editar').modal('hide');
              var dataform = new FormData();
              dataform.append("grupo_id", this.grupo.id);
              dataform.append("es_color", this.grupo.es_color);
              dataform.append("valor", this.caracteristica.valor);
              dataform.append("color", this.caracteristica.color);
              var url = '/caracteristicas/:id/actualizar';
              url = url.replace(':id', this.caracteristica.id);
              CerService.post(url,dataform)
              .then(response => 
              {
                  this.obtenercaracteristicas(this.grupo_id);
                  this.mensaje("success",response.msg);
              })
              .catch(error => {
                this.mensaje("error","Ha ocurrido un error inesperado");
              });
            }
            else
            {
              this.mensaje("warning","Por favor verifique los campos");
            }
          });
   		},
   		eliminar()
   		{
        $('#eliminar').modal('hide');
        var url = '/caracteristicas/:id/eliminar';
        url = url.replace(':id', this.caracteristica.id);
        CerService.post(url)
        .then(response => 
        {
            this.obtenercaracteristicas(this.grupo_id);
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
   		obtenergrupo(id)
      {
        var url = '/grupos/:id/detalles';
        url = url.replace(':id', id);
        CerService.post(url)
        .then(response => {
          if(response.grupo)
          {
            this.grupo = response.grupo;
            if(this.es_color())
            {
              this.fields = this.fields_color;
            }
            else
            {
              this.fields = this.fields_sin_color;
            }
          }
          else
          {
            this.$router.push({ name: 'no.encontrado' });
          }
        })
        .catch(error => {
          this.mensaje("error","Ha ocurrido un error inesperado");
        }); 
      },
      obtenercaracteristicas(id)
      {
        var url = '/grupo/:id/caracteristicas';
        url = url.replace(':id', id);
        CerService.post(url)
        .then(response => {
          if(response.caracteristicas)
          {
            this.caracteristicas = response.caracteristicas;
            this.totalRows = this.caracteristicas.length;
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
      }
      
   	}
}
</script>