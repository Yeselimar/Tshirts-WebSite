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
        
        <div class="text-right">
          <a class="btn btn-xs btn-danger" @click="filtro='todos'">Todos</a>
          <a class="btn btn-xs btn-danger" @click="filtro='disenables'">Diseñables</a>
          <a class="btn btn-xs btn-danger" @click="filtro='nodisenables'">No Diseñables</a>
        </div>

        <div class="card">

            <div class="card-title">
              <h4>
                <strong>
                  Artículos
                  <template v-if="filtro=='todos'">Todos</template>
                  <template v-else-if="filtro=='disenables'">Diseñables</template>
                  <template v-else-if="filtro=='nodisenables'">No Diseñables</template>
                </strong>
              </h4>
              <div class="pull-right">
                <a class="btn btn-sm btn-danger" @click=" $router.push({ name: 'nuevoArticulo' })">Nuevo Artículo</a>
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
                  :items="articulos"
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
                {{row.item.id}}
              </template>

              <template slot="nombre" slot-scope="row">
                {{row.item.nombre}}
              </template>

              <template slot="rubros" slot-scope="row">
                {{row.item.rubros}}
              </template>

              <template slot="precio" slot-scope="row">
                {{row.item.precio}}
              </template>

              <template slot="cantidad" slot-scope="row">
                {{row.item.cantidad}}
              </template>

              <template slot="estado" slot-scope="row">
                {{row.item.publicado}}
              </template>

              <template slot="actions" slot-scope="row">
                <button  class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
              </template>

              </b-table>

              <b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

            </div>
        </div>

      </div>
    </div>

   

</template>

<script>
  import CerService from "../../../../plugins/CerService";
  import loading from "../../../../components/layouts/loading.vue";
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        isLoading: false,
        filtro:'',
        articulos:[],
        fields: 
        [
          { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
          { key: 'imagen', label: 'Imagen', sortable: true, 'class': 'text-center' },
          { key: 'nombre', label: 'Nombre', sortable: true, 'class': 'text-left' },
          { key: 'rubros', label: 'Rubros', sortable: true, 'class': 'text-left' },
          { key: 'precio', label: 'Precio', sortable: true, 'class': 'text-center' },
          { key: 'estado', label: 'Estado', sortable: true, 'class': 'text-center' },
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
      }
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
      this.filtro='disenables';
      this.todos();

    },
    methods:
    {
      onFiltered(filteredItems)
      {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
      },
      todos()
      {
        CerService.post("/articulos/todos")
        .then(response => {
          if(response.articulos)
          {
            this.articulos = response.articulos;
            this.totalRows = this.articulos.length;
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
    },
    watch: {
      filtro: function(){
        this.$store.dispatch('cambiarFiltroArticulo', this.filtro)
      }
  }
}

</script>