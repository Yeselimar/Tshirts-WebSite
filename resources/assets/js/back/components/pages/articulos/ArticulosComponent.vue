<style>
  .btn
  {
    color:#fff !important;
  }
  .cuadro-negro
  {
    width:15px;
    height:15px;
    background-color:#000;
    margin-left: auto;
    margin-right: auto;
  }
  .imagen-cuadrada
  {
    width:auto;
    height:15px;
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .img-barna-grande
  {
    width:100%;
    height:auto;
    border: 1px solid #ebebeb;
    border-radius: 4px;
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
  .sin-rubros
  {
    height: 15px;
    font-size: 11px;
    background-color: #dc3545;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff !important;
  }
  .icono-verde
  {
    color: #43A047 !important;
  }
  .icono-rojo
  {
    color: #E53935 !important;
  }
  .dropdown-item
  {
    padding: 0px 10px !important;
    font-size: 14px !important;
    text-align: right !important;
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
          <a class="btn btn-xs btn-danger" :class="{'actived-button': filtro == -1}" @click="filtro=-1">Todos</a>
          <a class="btn btn-xs btn-danger" :class="{'actived-button': filtro == 1}" @click="filtro=1">Diseñables</a>
          <a class="btn btn-xs btn-danger" :class="{'actived-button': filtro == 0}" @click="filtro=0">No Diseñables</a>
        </div>

        <div class="card">

            <div class="card-title">
              <h4>
                <strong>
                  Artículos
                  <template v-if="filtro==-1">Todos</template>
                  <template v-else-if="filtro==1">Diseñables</template>
                  <template v-else-if="filtro==0">No Diseñables</template>
                </strong>
              </h4>
              <div class="pull-right">
                <a class="btn btn-sm btn-danger" @click=" $router.push({ name: 'nuevoArticulo' })" :class="[{'disabled': (filtro === -1)}]">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i> Nuevo Artículo
                </a>
              </div>
            </div>

            <div class="card-body">
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
                  :items="articulos_filtro"
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
                <template v-if="row.item.principal">
                  <a class="cursor" @click="ver(row.item)">
                    <img :src="url+row.item.principal.url" class="imagen-cuadrada">
                  </a>
                </template>
                <template v-else>
                  <div class="cuadro-negro">
                  </div>
                </template>
              </template>

              <template slot="nombre" slot-scope="row">
                {{row.item.nombre}}
              </template>

              <template slot="rubros" slot-scope="row">
                <template v-if="row.item.rubros.length>0">
                  <template v-for="rubro in row.item.rubros">
                    <span class="badge badge-pill capsula-rubros">{{rubro.nombre}}</span>
                  </template>
                </template>
                <template v-else>
                  <span class="badge badge-pill sin-rubros">SIN RUBRO</span>
                </template>
              </template>

              <template slot="precio" slot-scope="row">
                {{formatearmoneda(row.item.precio_general)}}
              </template>

              <template slot="cantidad" slot-scope="row">
                {{row.item.cantidad}}
              </template>

              <template slot="publicado" slot-scope="row">
                <i v-if="row.item.publicado" class="fa fa-check icono-verde" aria-hidden="true"></i>
                <i v-else class="fa fa-remove icono-rojo" aria-hidden="true"></i>
              </template>

              <template slot="destacado" slot-scope="row">
                <i v-if="row.item.destacado" class="fa fa-check icono-verde" aria-hidden="true"></i>
                <i v-else class="fa fa-remove icono-rojo" aria-hidden="true"></i>
              </template>

              <template slot="actions" slot-scope="row">
                  <button type="button" class="btn btn-inverse btn-xs" data-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item cursor" @click=" $router.push({ name: 'editArticulo',  params: { id: row.item.id }})">Editar</a>
                      <a class="dropdown-item cursor" @click="eliminarArticulo(row.item)">Eliminar</a>
                      <a class="dropdown-item cursor">Vista Previa</a>
                  </div>
              </template>

              </b-table>

              <b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

            </div>
        </div>

      </div>

      <!-- Modal para eliminar artículo -->
      <div class="modal" id="eliminar">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Artículo</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-lg-12">
                          <p>¿Está seguro que desea eliminar el artículo <strong>{{this.articulo.nombre}}</strong> de forma permanente? </p>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-xs btn-primary pull-right" @click="eliminar()">Eliminar</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- Modal para eliminar artículo -->

      <!-- Modal para ver la imagen -->
      <div class="modal" id="ver">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Artículo: {{this.articulo.nombre}}</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-12">
                        <img :src="url+articulo.imagen" class="img-responsive img-barna-grande">
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
        isLoading: false,
        filtro:null,
        articulo:
        {
          id:'',
          nombre:'',
          imagen:''
        },
        articulos:[],
        articulos_filtro:[],
        fields:
        [
          { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
          { key: 'imagen', label: 'Imagen', sortable: true, 'class': 'text-center' },
          { key: 'nombre', label: 'Nombre', sortable: true, 'class': 'text-left' },
          { key: 'rubros', label: 'Rubros', sortable: true, 'class': 'text-left' },
          { key: 'precio', label: 'Precio', sortable: true, 'class': 'text-center' },
          { key: 'cantidad', label: 'Cantidad', sortable: true, 'class': 'text-center' },
          { key: 'publicado', label: 'Publicado', sortable: true, 'class': 'text-center' },
          { key: 'destacado', label: 'Destacado', sortable: true, 'class': 'text-center' },
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
    created: function()
    {
      if (document.body.clientWidth <= 500){
          this.table_responsive = true;
      } else {
        this.table_responsive = false;
      }
      this.filtro = -1;//inicialmente cargo todos los artículos
      this.todos();//obtengo todos los artículos
      this.url = this.getUrl;//obtengo la url base
    },
    methods:
    {
      onFiltered(filteredItems)
      {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      formatearmoneda(monto)
      {
          return monto.toFixed(2);
      },
      busqueda()
      {
        let resultado = [];
        if(this.articulos  && this.articulos.length)
        {
          this.articulos.forEach(function(articulo,index)
          {
            if(this.filtro==-1)//todos los artículos
            {
              resultado.push(articulo);
            }
            else
            {
              if(this.filtro==1)//Es personalizable o diseñable
              {
                if(articulo.personalizable==1)
                {
                  resultado.push(articulo);
                }
              }
              else
              {
                if(articulo.personalizable==0)//No es personalizable o diseñable
                {
                  resultado.push(articulo);
                }
              }

            }
          },this);
        }
        this.articulos_filtro = resultado;//actualizo mis articulos
        this.totalRows = this.articulos_filtro.length; //actulizo la longitud de mis artículos filtrados
      },
      ver(articulo)
      {
        this.articulo.imagen = articulo.principal.url;
        this.articulo.nombre = articulo.nombre;
        $('#ver').modal('show');
      },
      eliminarArticulo(articulo)
      {
        this.articulo.id = articulo.id;
        this.articulo.nombre = articulo.nombre;
        $('#eliminar').modal('show');
      },
      eliminar()
      {
        $('#eliminar').modal('hide');
        var url = '/articulo/:id/eliminar';
        url = url.replace(':id', this.articulo.id);
        CerService.post(url)
        .then(response => {
          if(response.res==1)
          {
            this.todos();
            this.mensaje("success",response.msg);
          }
          else
          {
            this.mensaje("warning",response.msg);
          }
        })
        .catch(error => {
          this.mensaje("error","Ha ocurrido un error inesperado");
        });
      },
      todos()
      {
        CerService.post("/articulos/todos")
        .then(response => {
          if(response.articulos)
          {
            this.articulos = response.articulos;
            this.articulos_filtro = this.articulos;//inicialmente cargo todos los artículos
            this.totalRows = this.articulos_filtro.length;// total de filas es igual al array de artículos filtro
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
    },
    watch:
    {
      filtro: function()
      {
        this.busqueda();
        this.$store.dispatch('cambiarFiltroArticulo', this.filtro)
      }
    }
  }


</script>