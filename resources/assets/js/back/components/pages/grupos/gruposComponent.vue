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
                  Crear Grupo
                </button>
            </div>

            <div classs="col-lg-12">
                <div class="card">
                    <div class="card-title">
                        <h4>Grupos</h4>
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
                            :items="grupos"
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

                        <template slot="nombre" slot-scope="row">
                            {{row.item.nombre}}
                        </template>

                        <template slot="color" slot-scope="row">
                            <span v-if="row.item.es_color" class="badge badge-pill badge-success">Si</span>
                            <span v-else class="badge badge-pill badge-danger">No</span>
                        </template>

                        <template slot="cantidad" slot-scope="row">
                            {{row.item.caracteristicas.length}}
                        </template>

                        <template slot="actions" slot-scope="row">
                            <button @click="editar(row.item)" class="btn btn-xs btn-primary">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button @click="eliminarGrupo(row.item)" class="btn btn-xs btn-primary">
                                <i class="fa fa-trash"></i>
                            </button>
                            <button @click=" $router.push({ name: 'grupo.caracteristicas',  params: { id: row.item.id }})" class="btn btn-xs btn-primary">
                                <i class="fa fa-plus"></i>
                            </button>
                        </template>

                        </b-table>
                        
                        <b-pagination :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pull-right pt-3"/>

                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para crear grupo -->
        <div class="modal" id="crear" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Crear Grupo</strong></h5>
                        <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-validation">
                                <label class="control-label h6" for="nombre">Nombre</label>
                                <input type="text" name="nombre" class="form-control input-sm input-rounded" v-model="grupo.nombre" 
                                autocomplete="off" 
                                :class="{'error-input': errors.first('nombre','form-crear')}"
                                data-vv-scope="form-crear"
                                v-validate
                                data-vv-rules="required:true|min:3"
                                >
                                <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-crear')">Campo requerido.</span>

                                <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-crear')">Mínimo 3 caracteres.</span>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="es_color" v-model="grupo.es_color">
                                    <label class="custom-control-label" for="es_color">Es un color</label>
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
        <!-- Modal para crear grupo -->

        <!-- Modal para editar grupo -->
        <div class="modal" id="editar">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Editar Grupo</strong></h5>
                        <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-validation">
                                <label class="control-label h6" for="nombre">Nombre</label>
                                <input type="text" name="nombre" class="form-control input-sm input-rounded" v-model="grupo.nombre"
                                autocomplete="off" 
                                :class="{'error-input': errors.first('nombre','form-actualizar')}"
                                data-vv-scope="form-actualizar"
                                v-validate
                                data-vv-rules="required:true|min:3"
                                >
                                <span class="error-text" v-if="errors.firstByRule('nombre', 'required','form-actualizar')">Campo requerido.</span>

                                <span class="error-text" v-else-if="errors.firstByRule('nombre','min','form-actualizar')">Mínimo 3 caracteres.</span>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="es_color" v-model="grupo.es_color">
                                    <label class="custom-control-label" for="es_color">Check this custom checkbox</label>
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
        <!-- Modal para editar grupo -->

        <!-- Modal para eliminar grupo -->
        <div class="modal" id="eliminar">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Eliminar Grupo</strong></h5>
                        <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12">
                            <p>¿Está seguro que desea eliminar el grupo <strong>{{this.grupo.nombre}}</strong> de forma permanente? </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-xs btn-primary pull-right" @click="eliminar()">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para eliminar grupo -->
    </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";
import loading from "../../../../components/layouts/loading.vue";

export default {
    data () {
        return {
            isLoading: false,
            grupos:[],
            grupo:
            {
                id:'',
                nombre:'',
                es_color:'',
            },
            fields:
            [
                { key: 'id', label: 'ID', sortable: true, 'class': 'text-center' },
                { key: 'nombre', label: 'Nombre', sortable: true, 'class': 'text-left' },
                { key: 'color', label: 'Color', sortable: true, 'class': 'text-center' },
                { key: 'cantidad', label: 'Cant. Características', sortable: true, 'class': 'text-center' },
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
        loading
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
    computed:
    {
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
        crear()
        {
            this.grupo.id = null;
            this.grupo.nombre = '';
            this.grupo.es_color = false;
            $('#crear').modal('show');
        },
        editar(grupo)
        {
            this.grupo.id = grupo.id;
            this.grupo.nombre = grupo.nombre;
            this.grupo.es_color = (grupo.es_color==1) ? true : false;
            $('#editar').modal('show');
        },
        eliminarGrupo(grupo)
        {
            this.grupo.id = grupo.id;
            this.grupo.nombre = grupo.nombre;
            $('#eliminar').modal('show');
        },
        guardar()
        {
            this.$validator.validateAll("form-crear").then(resp => 
            {
                if (resp)
                {
                    var dataform = new FormData();
                    dataform.append("nombre", this.grupo.nombre);
                    dataform.append("es_color", this.grupo.es_color);
                    $('#crear').modal('hide');
                    CerService.post("/grupos/guardar",dataform)
                    .then(response => 
                    {
                        this.todos();
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
                    dataform.append("nombre", this.grupo.nombre);
                    dataform.append("es_color", this.grupo.es_color);
                    var url = '/grupos/:id/actualizar';
                    url = url.replace(':id', this.grupo.id);
                    CerService.post(url,dataform)
                    .then(response => 
                    {
                        this.todos();
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
            var url = '/grupos/:id/eliminar';
            url = url.replace(':id', this.grupo.id);
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
        todos()
        {
            CerService.post("/grupos/todos")
            .then(response => {
                if(response.grupos)
                {
                    this.grupos = response.grupos;
                    this.totalRows = this.grupos.length;
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
