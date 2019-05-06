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
#modalImg .modal-dialog {
    transform: translateY(-50%) translateX(-50%) !important;
    left: 50% !important;
    margin: 0px !important;
}
.color-blue {
  color: blue;
}
.hover-pic:hover {
  color: blue !important;
  cursor: pointer !important;
}
/*.hover-pic:hover:after {
  position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    left: 0;
    top: 0px;
    background: rgba(0,0,0,.3)!important;
    z-index: 9999999;
}*/
.checkmark {
  left: 40%;
  border: 1px solid #dadada;
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
                        <div class="basis-46 position-relative ppbb-2">
                        
                           <multiselect
                            v-model="selectedRubro"
                            :options="optionRubros"
                            selectLabel =""
                            selectedLabel = ""
                            placeholder="Agregar rubro"
                            open-direction="bottom"
                            :multiple="true"
                            :clearOnSelect="true"
                            :hideSelected = "true"
                            :custom-label="customLabelRubro" 
                            :show-labels="false"
                             label="nombre" 
                             track-by="nombre" 
                             :class="{'error-input': selectedRubroValidation}"
                            >
                             <template slot="option" slot-scope="props">
                                <div class="option__desc"><span class="option__title">{{ props.option.nombre }}</span></div>
                              </template>

                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                                      
                                    <span
                                            class="error-text"
                                            v-if="selectedRubroValidation"
                                    >Campo requerido.</span>
                        </div>
                        
                        <div class="basis-46 position-relative ppbb-2">
                          <input
                            name="marca"
                            id="marca"
                            type="text"
                            placeholder="Ingrese Marca"
                            class="form-control input-rounded input-sm"
                            v-model="articulo.marca"
                            autocomplete="off"
                            :class="{'error-input': errors.first('marca','form-ajustes')}"
                            data-vv-scope="form-ajustes"
                            v-validate
                            data-vv-rules="required:true|min:3"
                          >
                          <span
                            class="error-text"
                            v-if="errors.firstByRule('marca', 'required','form-ajustes')"
                          >Campo requerido.</span>
                          <span
                            class="error-text"
                            v-else-if="errors.firstByRule('marca','min','form-ajustes')"
                          >Mínimo 3 caracteres.</span>
                        </div>
                      </div>
                      <div class="align-items-center form-body d-flex justify-content-between flex-column flex-md-row mt-3 pb-2 div-price">
                        <div class="basis-46 position-relative ppbb-2" :class="{'basis-23':((selectedTipo !== null) && selectedTipo.toUpperCase() == 'OTROS')}">
                         
                           <multiselect
                            v-model="selectedTipo"
                            :options="['Ropa','Otros']"
                            selectLabel =""
                            :hideSelected = "true"
                            selectedLabel = ""
                            placeholder="Seleccione tipo"
                            deselectLabel = ""
                            open-direction="bottom"
                            :multiple="false"
                             :class="{'error-input': selectedTipoValidation}"

                            >
                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                          
                           <span
                              class="error-text"
                              v-if="selectedTipoValidation"
                            >Campo requerido.</span>
                        </div>
                        <div class="basis-23 position-relative ppbb-2" v-if="((selectedTipo !== null) && selectedTipo.toUpperCase() == 'OTROS')">
                          <input
                            name="otros"
                            id="otros"
                            type="text"
                            placeholder="Calzado, Tazas..."
                            class="form-control input-rounded input-sm"
                            v-model="articulo.otros"
                            autocomplete="off"
                            :class="{'error-input': errors.first('otros','form-ajustes')}"
                            data-vv-scope="form-ajustes"
                            v-validate
                            data-vv-rules="required:true|min:3"
                          >
                          <span
                            class="error-text"
                            v-if="errors.firstByRule('otros', 'required','form-ajustes')"
                          >Campo requerido.</span>
                          <span
                            class="error-text"
                            v-else-if="errors.firstByRule('otros','min','form-ajustes')"
                          >Mínimo 3 caracteres.</span>
                        </div>
                        <div class="basis-46 d-flex align-items-baseline">
                          <label class="mr-2 mb-0">Precio General:</label>
                          <div class="position-relative ppbb-2">
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
                  <!--second tab (Disponibilidad)-->
                  <div class="tab-pane" id="disponibilidad" role="tabpanel">
                    <div class="card-body mt-4" >
                      <div class="form-body d-flex justify-content-between flex-column flex-md-row">
                        <div class="basis-46 position-relative ppbb-2">
                          <multiselect
                            v-model="selectedTallas"
                            :options="optionTalles"
                            selectLabel =""
                            selectedLabel = ""
                            placeholder="Agregar talle"
                            deselectLabel = ""
                            open-direction="bottom"
                            :multiple="true"
                            :hideSelected = "true"
                            :clearOnSelect="true"
                            :custom-label="customLabelTalla" 
                            :show-labels="false"
                             label="valor" 
                             track-by="valor" 
                            >
                              <template slot="option" slot-scope="props">
                                <div class="option__desc"><span class="option__title">{{ props.option.valor }}</span></div>
                              </template>
                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                        </div>
                        <div class="basis-46 position-relative ppbb-2">
                          <multiselect
                            v-model="selectedColores"
                            :options="optionColors"
                            selectLabel =""
                            selectedLabel = ""
                            placeholder="Agregar Color"
                            deselectLabel = ""
                            open-direction="bottom"
                            :multiple="true"
                            :hideSelected = "true"
                            :clearOnSelect="true"
                            :custom-label="customLabelColor" 
                            :show-labels="false"
                            label="valor" 
                            track-by="valor" 
                            >
                              <template slot="option" slot-scope="props">
                                <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                              </template>
                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                        </div>
                      </div>
                       <div class="form-body mt-2 d-flex justify-content-between flex-column flex-md-row">
                        <div class="basis-46 position-relative ppbb-2">
                          <multiselect
                            v-model="selectedCantidad"
                            :options="['General','Por Variante']"
                            selectLabel =""
                            selectedLabel = ""
                            placeholder="Cantidad"
                            deselectLabel = ""
                            open-direction="bottom"
                            :multiple="false"
                            :hideSelected = "true"
                            >
                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                        </div>
                        <div class="basis-46 d-flex align-items-baseline" v-if="((selectedCantidad !== null) && selectedCantidad.toUpperCase() == 'GENERAL')">
                          <label class="mr-2 mb-0">Ingrese Cantidad:</label>
                          <div class="position-relative ppbb-2">
                            <input
                              type="text"
                              id="cantidad"
                              name="cantidad"
                              spellcheck="false"
                              placeholder="Ingrese Cantidad"
                              v-model="maskCantidad"
                              v-validate
                              data-vv-scope="form-disponibilidad"
                              data-vv-rules="required|cantidadvv"
                              class="form-control input-rounded input-sm"
                              autocomplete="off"
                              v-bind:class="{'error-input': errors.first('cantidad','form-disponibilidad')}"
                              @keyup="setCantidad()"
                              v-money="cantidadSinDecimal"
                            />
                            <p
                              class="error-text"
                              v-if="errors.firstByRule('cantidad', 'required', 'form-disponibilidad')"
                            >Requerido</p>
                            <p
                              class="error-text"
                              v-else-if="errors.firstByRule('cantidad', 'cantidadvv', 'form-disponibilidad')"
                            >Cantidad Invalida</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div :class="{'table-responsive': table_responsive}" v-if="((selectedCantidad !== null) && selectedCantidad.toUpperCase() == 'POR VARIANTE')">
                        <div class="text-center">
                          <h3>VARIANTES</h3>
                          <hr>
                        </div>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="text-center">Color</th>
                                <th class="text-center">Talle</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-center">Precio</th>
                                <th class="text-center">Acciones</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="!filesVariantes.length">
                                <td colspan="5">
                                  <div class="text-center p-5">
                                    <button  @click.stop.prevent="addVariante" class="cursor btn btn-primary"><i class="fa fa-plus cursor"></i>Agregar Variante</button>
                                  </div>
                                </td>
                              </tr>
                              <tr v-for="(fileV,index) in filesVariantes" :key="index">
                                <td class="text-center">
                                    <multiselect
                                      v-model="filesVariantes[index].selectedColorVariante"
                                      :options="selectedColores"
                                      selectLabel =""
                                      selectedLabel = ""
                                      placeholder="Color"
                                      deselectLabel = ""
                                      open-direction="bottom"
                                      :multiple="false"
                                      :hideSelected = "true"
                                      :custom-label="customLabelColor" 
                                      :show-labels="false"
                                      label="valor" 
                                      track-by="valor" 
                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>

                                    </multiselect>

                                </td>
                                <td class="text-center">
                                  <multiselect
                                      v-model="filesVariantes[index].selectedTalleVariante"
                                      :options="selectedTallas"
                                      selectLabel =""
                                      selectedLabel = ""
                                      placeholder="Talle"
                                      deselectLabel = ""
                                      open-direction="bottom"
                                      :multiple="false"
                                      :hideSelected = "true"
                                      :custom-label="customLabelTalla" 
                                      :show-labels="false"
                                       label="valor" 
                                       track-by="valor" 
                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc"><span class="option__title">{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>

                                    </multiselect>
                                </td>
                                <td class="text-center">
                                 <div class="position-relative pb-5">
                                    <input
                                        type="number"
                                        :id="'cantidadV'+index"
                                        :name="'cantidadV'+index"
                                        v-model="filesVariantes[index].cantidadVariante"
                                        spellcheck="false"
                                        placeholder="Cantidad"                                       
                                        class="form-control input-rounded input-sm"
                                        min="0" 
                                        v-validate
                                        data-vv-scope="form-disponibilidad"
                                        data-vv-rules="required|min_value:0|decimal:0|numeric"
                                        autocomplete="off"
                                         @keyup="setCantidadVariante(index)"
                                        v-bind:class="{'error-input': errors.first('cantidadV'+index,'form-disponibilidad')}"
                                      />
                                      <p
                                          class="error-text"
                                          v-if="errors.firstByRule('cantidadV'+index, 'required', 'form-disponibilidad')"
                                        >Requerido</p>
                                        <p
                                          class="error-text"
                                          v-else-if="errors.first('cantidadV'+index, 'form-disponibilidad')"
                                        >Cantidad invalida</p>
                                  </div>
                                </td>
                                <td class="text-center">
                                   <div class="position-relative pb-5">
                                     <input
                                        type="number"
                                        :id="'amountV'+index"
                                        :name="'amountV'+index"
                                        spellcheck="false"
                                        placeholder="Precio"
                                        v-model="filesVariantes[index].precioVariante"
                                        v-validate
                                        data-vv-scope="form-disponibilidad"
                                        data-vv-rules="required|min_value:0|decimal:2"
                                        class="form-control input-rounded input-sm"
                                        autocomplete="off"
                                        min="0" 
                                        @keyup="setPaymentAmountVariante(index)"
                                        v-bind:class="{'error-input': errors.first('amountV'+index,'form-disponibilidad')}"
                                      >
                                      <p
                                        class="error-text"
                                        v-if="errors.firstByRule('amountV'+index, 'required', 'form-disponibilidad')"
                                      >Requerido</p>
                                      <p
                                        class="error-text"
                                        v-else-if="errors.first('amountV'+index, 'form-disponibilidad')"
                                      >Monto Invalido</p>
                                   </div>

                                </td>

                                <td class="text-center">
                                     <button class="cursor btn btn-inverse" @click="deleteVariante(index)"><i class="fa fa-trash cursor"></i></button>
                                    <button v-if="index == filesVariantes.length-1" class="cursor btn btn-primary" @click="addVariante()"><i class="fa fa-plus cursor"></i></button>
                                </td>
                             
                              
                              </tr>
                            </tbody>
                          </table>
                        </div> 

                  </div>
                  <div class="tab-pane" id="relacion" role="tabpanel">


                      <div :class="{'table-responsive': table_responsive}" >
                        <div class="text-center">
                          <h3>IMAGEN-COLOR</h3>
                          <hr>
                        </div>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="text-center">Imagen</th>
                                <th class="text-center">Color</th>
                                <th class="text-center">Es Principal</th>
                                <th class="text-center">Acciones</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="!filesImagesColor.length">
                                <td colspan="4">
                                  <div class="text-center p-5">
                                    <button  @click.stop.prevent="addRelacion" class="cursor btn btn-primary"><i class="fa fa-plus cursor"></i>Agregar Relación Imagen-Color</button>
                                  </div>
                                </td>
                              </tr>
                              <tr v-for="(fileIC,index) in filesImagesColor" :key="index">
                                 <td class="text-center">
                                      <img v-if="filesImagesColor[index].file !== null && filesImagesColor[index].file !== {} && filesImagesColor[index].file.thumb" :src="filesImagesColor[index].file.thumb" style="width:50px;height:50px"/>  
                                     <button v-else  class="cursor btn btn-danger" data-dismiss="modal" @click.stop.prevent="openModalImagenesCargadas(index)"><i class="fa fa-image cursor pr-1"></i>Seleccionar</button>
                                    
                                </td>
                                <td class="text-center">
                                    <multiselect
                                      v-model="filesImagesColor[index].selectedColorRelacion"
                                      :options="selectedColores"
                                      selectLabel =""
                                      selectedLabel = ""
                                      placeholder="Color"
                                      deselectLabel = ""
                                      open-direction="bottom"
                                      :multiple="false"
                                      :hideSelected = "true"
                                      :custom-label="customLabelColor" 
                                      :show-labels="false"
                                      label="valor" 
                                      track-by="valor" 
                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>

                                    </multiselect>

                                </td>
                                
                                  <td class="text-center">  
                                      <label class="contenido">
                                        <input type="radio" name="radio">
                                        <span class="checkmark"></span>
                                      </label>
                                  </td>

                                <td class="text-center">
                                     <button class="cursor btn btn-inverse" @click="deleteRelacion(index)"><i class="fa fa-trash cursor"></i></button>
                                    <button v-if="index == filesImagesColor.length-1" class="cursor btn btn-primary" @click="addRelacion()"><i class="fa fa-plus cursor"></i></button>
                                </td>
                             
                              
                              </tr>
                            </tbody>
                          </table>
                        </div> 

                

                  </div>
                </div>

                <div class="tab-content">
                  
                                  <button type="button" @click="saveAll" class="btn btn-primary  m-b-10 pull-right">Guardar</button>

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

     <div class="modal" id="modalImagenesCargadas" @click.stop.prevent="closeModalImagenesCargadas">
      <div class="modal-dialog modal-lg"  @click.stop.prevent="">
          <div class="modal-content modal-content-barna" >
              <div class="modal-header modal-header-barna">
                  <h5 class="modal-title pull-left"><strong>Seleccione Imagen</strong></h5>
                  <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" @click.stop.prevent="closeModalImagenesCargadas" ><i class="fa fa-remove"></i></a>
              </div>
              <div class="modal-body">
                  <span class="projects justify-content-start align-items-center" :class="{'justify-content-center': files.length == 0}" style="padding:10px;min-height: 30vh; position: relative;">
                            <div class="project" v-for="(file) in files" :key="file.id" v-if="!file.selectedImagen">
                                <div class="pi-pic position-relative hover-pic" @click.stop.prevent="seleccionarImg(file)">
                                  <img v-if="file.thumb" :src="file.thumb" width="125" height="125" />
                                  <span v-else>No Image</span>
                                  <div class="pi-links">
                                    <a class="cursor mr-2"><i class="fa fa-check" :class="{'color-blue': file.selectedImagen}"></i></a>
                                  </div>
                                </div>
                            </div>
                  </span>
                  
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-inverse  m-b-10 pull-right" data-dismiss="modal" @click.stop.prevent="closeModalImagenesCargadas">Cerrar</button>
              </div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
import CerService from "../../../../plugins/CerService";
import { mapGetters } from "vuex";
import Multiselect from 'vue-multiselect'
import "vue-select/dist/vue-select.css";
import "vue-multiselect/dist/vue-multiselect.min.css"
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

const cantidadvv = {
  getMessage: field => "Cantidad Invalida",
  validate: value => parseInt(value) >= 0 && value[0] !== "-"
};
Validator.extend("amountvv", amountvv);
Validator.extend("cantidadvv", cantidadvv);


export default {
  data() {
    return {
      optionColors: [{ id:1, valor: 'Negro', color: '#000' },
        { id:2, valor: 'Azul', color: '#fff' },
        { id:3, valor: 'Rojo',  color: '#aaa' },
        { id:4, valor: 'Blanco', color: '#bbb' }],
      optionTalles: [
        { id:1, valor: 'S' },
        { id:2, valor: 'M' },
        { id:3, valor: 'L' },
        { id:4, valor: 'XL' },
        { id:5, valor: 'SS' }
      ],
      optionRubros: [
        { id:1, nombre: 'Mujer' },
        { id:2, nombre: 'Hombre' },
        { id:3, nombre: 'Niño' },
        { id:4, nombre: 'Niña' },
        { id:5, nombre: 'Buzo' }
      ],
      selectedColorVariante: "",
      selectedTalleVariante: "",
      maskCantidadVariante: "",
      cantidadVariante: 0,
      maskAmountVariante: '',
      precioVariante: 0.0,
      isLoading: false,
      isDesign: false,
      selectedImg: '',
      selectedTallas: [],
      selectedColores: [],
      selectedCantidad: "",
      filesVariantes: [],
      filesImagesColor: [],
      maskCantidad: "",
      articulo: {
        nombre: "",
        marca: "",
        precioGeneral: 0.00,
        otros: '',
        files: [],
        rubros: [],
        tipo: '',
        cantidad: 0

      },
      table_responsive: false,
      selectedRubroValidation: false,
      selectedTipoValidation: false,
      selectedRubro: [],
      selectedTipo: "",
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: " $",
        precision: 2,
        masked: false
      },
      cantidadSinDecimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false
      },
      maskAmount: "",
      files: [],
      accept: "image/png,image/gif,image/jpeg,image/webp",
      extensions: "gif,jpg,jpeg,png,webp",
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 1,
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
    FileUpload,
    Multiselect
  },
  computed: {
    ...mapGetters(["getIsAuth", "getUrl", "getFiltroArticulo"])
  },
  mounted() {
      $(window).resize(event => {
        event.preventDefault();
         
        if (document.body.clientWidth <= 900) {
          this.table_responsive = true;
        } else {
          this.table_responsive = false;
        }
      });

  },
  created: function() {
    if (document.body.clientWidth <= 900){
          this.table_responsive = true;
      } else {
        this.table_responsive = false;
      }
    if (this.getFiltroArticulo === "disenables") {
      this.isDesign = true;
    } else {
      this.isDesign = false;
    }
  },
  methods: {
    deleteVariante(index){
      this.filesVariantes.splice(index,1)
    },
    deleteRelacion(index){
      this.filesImagesColor.splice(index,1)
    },
    addVariante()
    {
      let aux = {
          selectedColorVariante: "",
          selectedTalleVariante: "",
          cantidadVariante: 0,
          precioVariante: this.articulo.precioGeneral

        }
      this.filesVariantes.push(
      {...aux}
      )
    },
    addRelacion(){
      let aux = {
          selectedColorRelacion: "",
          file: {},
        }
      this.filesImagesColor.push(
      {...aux}
      )
    },
   seleccionarImg(file){
      file.selectedImagen = true;
      this.filesImagesColor[this.indexRelacion].file = file
      this.closeModalImagenesCargadas()
    },
    customLabelColor ({ valor, color }) {
      return `${valor} – ${color}`
    },
    customLabelTalla({valor}) {
      return `${valor}`
    },
    customLabelRubro({nombre}){
      return `${nombre}`
    },
    saveAll(){
       this.$validator.validateAll("form-create").then(resp => 
        {
          if (resp)
          {
             this.$validator.validateAll("form-ajustes").then(resA => 
              {
                if (resA && this.selectedRubro.length && this.selectedTipo !== ""){
                  this.articulo.files = this.files
                  this.articulo.rubros = this.selectedRubro
                  this.articulo.tipo = this.selectedTipo

                  var dataform = new FormData();
                  for( var i = 0; i < this.files.length; i++ ){
                      let file = this.files[i].file;
                      dataform.append('files[' + i + ']', file);
                  }
                  let data = JSON.stringify({
                          articulo: this.articulo,
                      });
                  dataform.append('articulo',data)

                  CerService.post("/articulo/guardar",dataform,{
                  headers:
                    {
                        'Content-Type': 'application/json',
                    }
                  })
                  .then(response => 
                  {
                      if(response.res){
                        this.msgAlert(response.msg,'success')
                      } else {
                        this.msgAlert(response.msg,'warning')

                      }
                  })
                  .catch(error => {
                     this.msgAlert('Ha ocurrido un error inesperado','error')
                  });
                } else {
                  if(this.selectedRubro.length == 0){
                    this.selectedRubroValidation = true
                  }
                  if(this.selectedTipo == ""){
                    this.selectedTipoValidation = true
                  }
                  this.msgAlert('Por favor verifique el tab ajustes básicos','warning')
                }
              })
          }
          else
          {
            this.msgAlert('Por favor verifique el nombre del artículo','warning')
          }
        });
        
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
        $('#modalImg').modal('hide')

    },
     closeModalImagenesCargadas(){
        $('#modalImagenesCargadas').modal('hide')

    },
    openModalImg(img){
        this.selectedImg=img;
        $('#modalImg').modal('show')
    },
     openModalImagenesCargadas(index){
        this.indexRelacion = index
        $('#modalImagenesCargadas').modal('show')
    },
    setPaymentAmount() {
      let amount = this.maskAmount;
      amount = amount.replace(this.money.suffix, "");
      amount = amount.split(this.money.thousands).join("");
      amount = amount.replace(",", ".");
      this.articulo.precioGeneral = parseFloat(amount);
    },
    setCantidad(){
      let cantidad = this.maskCantidad;
      cantidad = cantidad.replace(this.cantidadSinDecimal.suffix, "");
      cantidad = cantidad.split(this.cantidadSinDecimal.thousands).join("");
      cantidad = cantidad.replace(",", ".");
      this.articulo.cantidad = parseInt(cantidad);
    },
    setCantidadVariante(index){
      let cantidad = this.filesVariantes[index].cantidadVariante;
      if (cantidad !== null && cantidad !== ""){
        this.filesVariantes[index].cantidadVariante = parseInt(cantidad)
      }
    },
     setPaymentAmountVariante(index){
      let cantidad = this.filesVariantes[index].precioVariante;
      if (cantidad !== null && cantidad !== "" && (typeof cantidad =='number' || (cantidad.indexOf('.') !== cantidad.length-1))){
        this.filesVariantes[index].precioVariante = parseFloat(cantidad)
      }
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
                type: file.type,
                selectedImagen: false //esto es agregado nuevo
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
            this.$refs.upload.update(newFile, { error: "size",  selectedImagen: false /*agregado personal*/});
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
        if(this.selectedTipo == null || this.selectedTipo.toUpperCase()!= 'OTROS'){
          this.articulo.otros = ''
        }
        if(this.selectedTipo !== ""){
          this.selectedTipoValidation = false
        }
    },
    selectedRubro: function(){
      if(this.selectedRubro.length > 0){
          this.selectedRubroValidation = false
      }
    },
    selectedCantidad: function(){
      if(this.selectedCantidad == null || this.selectedTipo.toUpperCase()!= 'GENERAL'){
          this.articulo.cantidad = 0
          this.maskCantidad = ""
        }
    }
    
  }
};
</script>