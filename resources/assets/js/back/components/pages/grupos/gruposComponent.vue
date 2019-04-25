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
                        <h4>Grupo</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center">ID</th>
                                        <th>Nombre</th>
                                        <th class="text-center">Cant. Características</th>
                                        <th class="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="grupo in grupos">
                                        <td class="text-center">{{grupo.id}}</td>
                                        <td>{{grupo.nombre}}</td>
                                        <td class="text-center">
                                            {{grupo.caracteristicas.length}}  
                                        </td>
                                        <td class="text-center">
                                            <button @click="editar(grupo)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                                            <button @click="eliminarGrupo(grupo)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Modal para crear grupo -->
        <div class="modal" id="crear">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Crear Grupo</strong></h5>
                        <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
        <!-- Modal para crear grupo -->

        <!-- Modal para editar grupo -->
        <div class="modal" id="editar">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Editar Grupo</strong></h5>
                        <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="control-label h6" for="nombre">Nombre</label>
                                <input type="text" name="nombre" class="form-control input-sm" v-model="grupo.nombre">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-primary pull-right" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-xs btn-inverse pull-right" @click="actualizar()">Guardar</button>
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
                        <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="col-lg-12">
                            <p>¿Está seguro que desea eliminar el grupo <strong>{{this.grupo.nombre}}</strong> de forma permanente? </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-xs btn-primary pull-right" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-xs btn-inverse pull-right" @click="eliminar()">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal para eliminar grupo -->
    </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";

export default {
    data () {
        return {
            grupos:[],
            grupo:
            {
                id:'',
                nombre:''
            }
        }
    },
    created()
    {
        this.todos();
    },
    methods:
    {
        crear()
        {
            this.grupo.nombre = '';
            $('#crear').modal('show');
        },
        editar(grupo)
        {
            this.grupo.id = grupo.id;
            this.grupo.nombre = grupo.nombre;
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
            var dataform = new FormData();
            dataform.append("nombre", this.grupo.nombre);
            $('#crear').modal('hide');
            CerService.post("/grupos/guardar",dataform)
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
        },
        actualizar()
        {
            $('#editar').modal('hide');
            var dataform = new FormData();
            dataform.append("nombre", this.grupo.nombre);
            var url = '/grupos/:id/actualizar';
            url = url.replace(':id', this.grupo.id);
            CerService.post(url,dataform)
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
                        type: "error",
                        title: response.msg
                    });
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
        todos()
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
        }

    }
}
</script>
