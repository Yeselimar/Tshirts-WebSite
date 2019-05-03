<style>
.btn {
  color: #fff !important;
}

.profile-tab li a.nav-link.active {
  background: #5c4ac7 none repeat scroll 0 0 !important;
  border-color: #5c4ac7 !important;
  color: white !important;
}
.tab-content {
  border-radius: 1px;
  box-shadow: 0 0 5px #ddd;
  background: #fff;
  padding: 15px;
}
.ppbb-2 {
  padding-bottom: 2.1rem;
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
      <div class="card">
        <div class="card-title">
          <h4>
            <strong>Nuevo Artículo</strong>
          </h4>
          <div class="pull-right">
            <a class="btn btn-sm btn-danger" @click=" $router.push({ name: 'articulos' })">Ir a Listado de Artículos</a>
          </div>
        </div>

        <div class="card-body">
          <div class="d-flex">
            <div class="position-relative basis-33 pb-3">
              <input
                name="nombre"
                id="nombre"
                type="text"
                placeholder="Nombre del Artículo"
                class="form-control input-rounded input-sm"
                v-model="articulo.nombre"
                autocomplete="off"
                :class="{'error-input': errors.first('nombre','form-create')}"
                data-vv-scope="form-create"
                v-validate
                data-vv-rules="required:true|min:3"
              >
              <span
                class="error-text"
                v-if="errors.firstByRule('nombre', 'required','form-create')"
              >Campo requerido.</span>
              <span
                class="error-text"
                v-else-if="errors.firstByRule('nombre','min','form-create')"
              >Mínimo 3 caracteres.</span>
            </div>
            <!--<div class="basis-33">
                        <button type="button" class="btn btn-primary btn-flat btn-addon btn-sm ml-3"><i class="fa fa-eye"></i>Vista Previa</button>
                      </div>
            -->
          </div>
          <hr>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs profile-tab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active show"
                      data-toggle="tab"
                      href="#ajustesbasicos"
                      role="tab"
                      aria-selected="false"
                    >Ajustes Básicos</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#disponibilidad"
                      role="tab"
                      aria-selected="false"
                    >Disponibilidad</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#relacion"
                      role="tab"
                      aria-selected="true"
                    >Relación Imagen-Color</a>
                  </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                  <div class="tab-pane active show" id="ajustesbasicos" role="tabpanel">
                    <div class="card-body mt-4">
                      <div class="form-body d-flex justify-content-between flex-column flex-md-row">
                        <div class="basis-30">
                          <v-select
                            placeholder="Seleccione Rubro"
                            multiple
                            v-model="selectedRubro"
                            :options="['Mujer','Hombre','Niño','Niña']"
                          ></v-select>
                        </div>
                        <div class="basis-30" :class="{'basis-15':selectedTipo.toUpperCase() == 'OTROS'}">
                          <v-select
                            placeholder="Seleccione Tipo"
                            v-model="selectedTipo"
                            :options="['Ropa','Otros']"
                          ></v-select>
                        </div>
                        <div class="basis-15" v-if="selectedTipo.toUpperCase() == 'OTROS'">
                          <input
                            name="otros"
                            id="otros"
                            type="text"
                            placeholder="Calzado, Tazas..."
                            class="form-control input-rounded input-sm"
                            v-model="articulo.otros"
                            autocomplete="off"
                          >
                        </div>
                        <div class="basis-30">
                          <input
                            name="marca"
                            id="marca"
                            type="text"
                            placeholder="Ingrese Marca"
                            class="form-control input-rounded input-sm"
                            v-model="articulo.marca"
                            autocomplete="off"
                          >
                        </div>
                      </div>
                      <div class="align-items-baseline d-flex mt-3 pb-2 div-price">
                        <label class="mr-2 mb-0">Precio General:</label>
                        <div class="position-relative basis-17 ppbb-2">
                          <input
                            type="text"
                            id="amount"
                            name="amount"
                            spellcheck="false"
                            placeholder="Ingrese Precio General"
                            v-model="maskAmount"
                            v-validate
                            data-vv-scope="form-ajustes"
                            data-vv-rules="required|amountvv"
                            class="form-control input-rounded input-sm"
                            autocomplete="off"
                            v-bind:class="{'error-input': errors.first('amount','form-ajustes')}"
                            @keyup="setPaymentAmount()"
                            v-money="money"
                          >
                          <p
                            class="error-text"
                            v-if="errors.firstByRule('amount', 'required', 'form-ajustes')"
                          >Requerido</p>
                          <p
                            class="error-text"
                            v-else-if="errors.firstByRule('amount', 'amountvv', 'form-ajustes')"
                          >Monto Invalido</p>
                        </div>
                      </div>
                      <!--subir imagenes -->
                      <div class="text-center">
                        <h3>Subir Imagenes de Artículo</h3>
                        <hr>
                      </div>
                          <span class="projects justify-content-start align-items-center" :class="{'justify-content-center': files.length == 0}" style="padding:10px;min-height: 30vh; position: relative;">
                            <div class="project" v-for="(file) in files" :key="file.id">
                                <div class="pi-pic">
                                  <img v-if="file.thumb" :src="file.thumb" width="125" height="125" />
                                  <span v-else>No Image</span>
                                  <div class="pi-links">
                                    <a class="cursor mr-2" @click="openModalImg(file.blob)"><i class="fa fa-eye"></i></a>
                                    <a class="cursor" @click.prevent="$refs.upload.remove(file)">
                                      <i class="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </div>
                            </div>
                            <div class="ml-3">
                              <file-upload
                                class="btn btn-primary cursor"
                                :post-action="postAction"
                                :put-action="putAction"
                                :extensions="extensions"
                                :accept="accept"
                                :multiple="multiple"
                                :directory="directory"
                                :size="size || 0"
                                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                                :headers="headers"
                                :data="data"
                                :drop="drop"
                                :drop-directory="dropDirectory"
                                :add-index="addIndex"
                                v-model="files"
                                @input-filter="inputFilter"
                                @input-file="inputFile"
                                ref="upload"
                              >
                                <i class="fa fa-plus cursor"></i> <span v-if="files.length == 0">Agregar Imagenes</span>
                              </file-upload>
                            </div>
                          </span>
                          <!---->
                      <!--end subir imagenes -->
                    </div>
                  </div>
                  <!--second tab-->
                  <div class="tab-pane" id="disponibilidad" role="tabpanel">Como</div>
                  <div class="tab-pane" id="relacion" role="tabpanel">Estas</div>
                </div>

                <div class="tab-content">
                                  <button type="button" class="btn btn-primary  m-b-10 pull-right">Guardar</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal" id="modalImg" @click.stop.prevent="closeModalImg">
      <div class="modal-dialog modal-lg"  @click.stop.prevent="">
          <div class="modal-content modal-content-barna" >
              <div class="modal-header modal-header-barna">
                  <h5 class="modal-title pull-left"><strong>Visualización de Imagen</strong></h5>
                  <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" @click.stop.prevent="closeModalImg" ><i class="fa fa-remove"></i></a>
              </div>
              <div class="modal-body">
                  <div class="d-flex flex-wrap ingresar justify-content-center">

                      <img :src="selectedImg" style="width:100%;height:100%"/>  
          
                  </div>
                  
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-inverse  m-b-10 pull-right" data-dismiss="modal" @click.stop.prevent="closeModalImg">Cerrar</button>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";
import { mapGetters } from "vuex";
import "vue-select/dist/vue-select.css";
import { Validator } from "vee-validate";
import ImageCompressor from "@xkeshi/image-compressor";
import FileUpload from "vue-upload-component";

// obtener el valor decimal del monto
function amountSplitDecimal(val) {
  let amount = 0;
  let object = null;
  if (val !== null && typeof val !== "undefined") {
    object = val.split(",");
    amount = object[1];
    object = amount.split(" ");
    amount = object[0];
  }
  return amount;
}
// validacion del monto valido
const amountvv = {
  getMessage: field => "Monto invalido",
  validate: value => amountSplitDecimal(value) >= 0 && value[0] !== "-"
};

Validator.extend("amountvv", amountvv);

export default {
  data() {
    return {
      isLoading: false,
      isDesign: false,
      selectedImg: '',
      articulo: {
        nombre: "",
        marca: "",
        precioGeneral: 0.0,
        otros: ''
      },
      selectedRubro: "",
      selectedTipo: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: " $",
        precision: 2,
        masked: false
      },
      maskAmount: "",
      files: [],
      accept: "image/png,image/gif,image/jpeg,image/webp",
      extensions: "gif,jpg,jpeg,png,webp",
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      addIndex: false,
      thread: 3,
      name: "file",
      postAction: "/upload/post",
      putAction: "/upload/put",
      headers: {
        "X-Csrf-Token": "xxxx"
      },
      data: {
        _csrf_token: "xxxxxx"
      },
      autoCompress: 1024 * 1024,
      uploadAuto: false,
      isOption: false,
      addData: {
        show: false,
        name: "",
        type: "",
        content: ""
      },
      editFile: {
        show: false,
        name: ""
      }
    };
  },
  components: {
    FileUpload
  },
  computed: {
    ...mapGetters(["getIsAuth", "getUrl", "getFiltroArticulo"])
  },
  mounted() {},
  created: function() {
    if (this.getFiltroArticulo === "disenables") {
      this.isDesign = true;
    } else {
      this.isDesign = false;
    }
  },
  methods: {
    saveAll(){
       /* this.$validator.validateAll("form-crear").then(resp => 
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
                this.msgAlert('Ha ocurrido un error inesperado','error')
            })
          }
          else
          {
            this.msgAlert('Por favor verifique los campos','warning')
          }
        });
        */
    },
    msgAlert(msg,type){
      this.$swal
        .mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000
        })
        .fire({
            type: type,
            title: msg
        });
    },
    closeModalImg(){
      console.log('aja')
        $('#modalImg').modal('hide')

    },
    openModalImg(img){
        this.selectedImg=img;
        $('#modalImg').modal('show')
    },
    setPaymentAmount() {
      let amount = this.maskAmount;
      amount = amount.replace(this.money.suffix, "");
      amount = amount.split(this.money.thousands).join("");
      amount = amount.replace(",", ".");
      this.articulo.precioGeneral = parseFloat(amount);
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // Automatic compression
        // 自动压缩
        if (
          newFile.file &&
          newFile.type.substr(0, 6) === "image/" &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = "compressing";
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512
          });
          imageCompressor
            .compress(newFile.file)
            .then(file => {
              this.$refs.upload.update(newFile, {
                error: "",
                file,
                size: file.size,
                type: file.type
              });
            })
            .catch(err => {
              this.$refs.upload.update(newFile, {
                error: err.message || "compress"
              });
            });
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = "";
        if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
          newFile.thumb = newFile.blob;
        }
      }
    },
    // add, update, remove File Event
    inputFile(newFile, oldFile) {
      if (newFile && oldFile) {
        // update
        if (newFile.active && !oldFile.active) {
          // beforeSend
          // min size
          if (
            newFile.size >= 0 &&
            this.minSize > 0 &&
            newFile.size < this.minSize
          ) {
            this.$refs.upload.update(newFile, { error: "size" });
          }
        }
        if (newFile.progress !== oldFile.progress) {
          // progress
        }
        if (newFile.error && !oldFile.error) {
          // error
        }
        if (newFile.success && !oldFile.success) {
          // success
        }
      }
      if (!newFile && oldFile) {
        // remove
        if (oldFile.success && oldFile.response.id) {
          // $.ajax({
          //   type: 'DELETE',
          //   url: '/upload/delete?id=' + oldFile.response.id,
          // })
        }
      }
      // Automatically activate upload
      if (
        Boolean(newFile) !== Boolean(oldFile) ||
        oldFile.error !== newFile.error
      ) {
        if (this.uploadAuto && !this.$refs.upload.active) {
          this.$refs.upload.active = true;
        }
      }
    },
  },
  watch: {
    selectedTipo: function(){
        if(this.selectedTipo.toLocaleLowerCase()!= 'OTROS'){
          this.articulo.otros = ''
        }
      }
  }
};
</script>