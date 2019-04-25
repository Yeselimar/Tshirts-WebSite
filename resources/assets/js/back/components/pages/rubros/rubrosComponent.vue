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
          Crear Rubro
        </button>
      </div>

      <div classs="col-lg-12">
        <div class="card">
          <div class="card-title">
            <h4>Rubros</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
          		<table class="table table-hover">
                <thead>
                  <tr>
                    <th class="text-center">ID</th>
                    <th>Nombre</th>
                    <th class="text-center">Visible</th>
                    <th class="text-center">Cant. Artículos</th>
                    <th class="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="rubro in rubros">
                    <td class="text-center">{{rubro.id}}</td>
                    <td>{{rubro.nombre}}</td>
                    <td class="text-center">
                      <span v-if="rubro.principal" class="badge badge-pill badge-success">Si</span>
                      <span v-else class="badge badge-pill badge-success">No</span>
                    </td>
                    <td class="text-center">
                      {{rubro.articulos.length}}
                    </td>
                    <td class="text-center">
                      <button @click="editar(rubro)" class="btn btn-xs btn-primary"><i class="fa fa-pencil"></i></button>
                      <button @click="eliminarRubro(rubro)" class="btn btn-xs btn-primary"><i class="fa fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear rubro -->
    <div class="modal" id="crear">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left"><strong>Crear Rubro</strong></h5>
                <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
            </div>
            <div class="modal-body">
              <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label h6" for="nombre">Nombre</label>
                    <input type="text" name="nombre" class="form-control input-sm" v-model="rubro.nombre">
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:15px">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="principal" v-model="rubro.principal">
                      <label class="control-label" for="principal">Visible en la Página Principal</label>
                    </div>
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
    <!-- Modal para crear rubro -->

    <!-- Modal para editar rubro -->
    <div class="modal" id="editar">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left"><strong>Editar Rubro</strong></h5>
                <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
            </div>
            <div class="modal-body">
              <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label class="control-label h6" for="nombre">Nombre</label>
                    <input type="text" name="nombre" class="form-control input-sm" v-model="rubro.nombre">
                  </div>
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin-top:15px">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="principal" v-model="rubro.principal">
                      <label class="control-label" for="principal">Visible en la Página Principal</label>
                    </div>
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
    <!-- Modal para editar rubro -->

    <!-- Modal para eliminar rubro -->
    <div class="modal" id="eliminar">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left"><strong>Eliminar Rubro</strong></h5>
                <a class="pull-right mr-1" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
            </div>
            <div class="modal-body">
              <div class="col-lg-12">
                <p>¿Está seguro que desea eliminar el rubro <strong>{{this.rubro.nombre}}</strong> de forma permanente? </p>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-xs btn-primary pull-right" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-xs btn-inverse pull-right" @click="eliminar()">Eliminar</button>
            </div>
        </div>
      </div>
    </div>
    <!-- Modal para eliminar rubro -->
	</div>
</template>

<script>
import CerService from "../../../../plugins/CerService";

export default {
  data () {
    return {
      rubro:
      {
        id:'',
        nombre:'',
        principal:'',
      },
      rubros:[]
    }
  },
  created: function()
  {
    this.todos();
  },
  methods:
  {
    crear()
    {
      this.rubro.nombre = '';
      this.rubro.principal = false;
      $('#crear').modal('show');
    },
    editar(rubro)
    {
      this.rubro.id = rubro.id;
      this.rubro.nombre = rubro.nombre;
      this.rubro.principal = (rubro.principal==0 ? false : true);
      $('#editar').modal('show');
    },
    eliminarRubro(rubro)
    {
      this.rubro.id = rubro.id;
      this.rubro.nombre = rubro.nombre;
      $('#eliminar').modal('show');
    },
    eliminar()
    {
      $('#eliminar').modal('hide');
      var url = '/rubros/:id/eliminar';
      url = url.replace(':id', this.rubro.id);
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
    guardar()
    {
      var dataform = new FormData();
      dataform.append("nombre", this.rubro.nombre);
      dataform.append("principal", this.rubro.principal);
      $('#crear').modal('hide');
      CerService.post("/rubros/guardar",dataform)
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
      dataform.append("nombre", this.rubro.nombre);
      dataform.append("principal", this.rubro.principal);
      var url = '/rubros/:id/actualizar';
      url = url.replace(':id', this.rubro.id);
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
    todos()
    {
      CerService.post("/rubros/todos")
      .then(response => {
        if(response.rubros)
        {
          this.rubros = response.rubros;
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
    fechayhora(fecha)
    {
      var dia = new Date (fecha);
      return moment(dia).format('DD/MM/YYYY hh:mm A');
    }
  }
}
</script>