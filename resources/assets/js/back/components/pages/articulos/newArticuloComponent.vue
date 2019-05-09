<style>
#nuevoArticulo  .btn {
  color: #fff !important;
}

#nuevoArticulo  .profile-tab li a.nav-link.active {
  background: #5c4ac7 none repeat scroll 0 0 !important;
  border-color: #5c4ac7 !important;
  color: white !important;
}
#nuevoArticulo  .tab-content {
  border-radius: 1px;
  box-shadow: 0 0 5px #ddd;
  background: #fff;
  padding: 15px;
}
.ppbb-2 {
  padding-bottom: 1rem;
}
#modalImg .modal-dialog {
    transform: translateY(-50%) translateX(-50%) !important;
    left: 50% !important;
    margin: 0px !important;
}
.color-blue {
  color: blue;
}
#nuevoArticulo  .hover-pic:hover {
  color: blue !important;
  cursor: pointer !important;
}
#nuevoArticulo  .error-text {
  right: 10px !important
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
#nuevoArticulo  .checkmark {
  left: 45%;
  border: 1px solid #dadada;
}
#nuevoArticulo .min-w120,.mw-120{
  min-width: 120px;
}
#nuevoArticulo  .mw-150{
  min-width: 150px;
}
#nuevoArticulo .form-control {
    height: 42px !important;
}
.error-input-multi{
  border-radius: 7px
}
#nuevoArticulo .form-control{
  height: auto !important
}
#nuevoArticulo .tab-contentGlobal{
  min-height: 50vh
}
</style>
<template>
  <div class="page-wrapper" id="nuevoArticulo">
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

    <div class="container-fluid"  v-if="!isLoading">
      <div class="card">
        <div class="card-title">
          <h4>
            <strong v-if="!isEdit">Nuevo Artículo</strong>
            <strong v-else>Editar Artículo</strong>
          </h4>
          <div class="pull-right">
            <a class="btn btn-sm btn-danger" @click=" $router.push({ name: 'articulos' })">Ir a Listado de Artículos</a>
          </div>
        </div>

        <div class="card-body">
          <div class="d-flex">
            <div class="position-relative basis-33 pb-3" >
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
          <div class="row" id="tabcontent">
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
                <div class="tab-content tab-contentGlobal">
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
                             v-validate data-vv-rules="required" 
                             data-vv-scope="form-ajustes"
                              data-vv-name="rubro"
                              data-vv-value-path="rubro"
                             :class="{'error-input error-input-multi': errors.first('rubro','form-ajustes')}"

                            >
                             <template slot="option" slot-scope="props">
                                <div class="option__desc"><span class="option__title">{{ props.option.nombre }}</span></div>
                              </template>

                                <span slot="noResult">
                                  No se encontraron resultados</span>
                                  <span slot="noOptions">
                                  Lista vacía</span>
                                  

                          </multiselect>
                                      
                                    <span
                                            class="error-text"
                                            v-if="errors.first('rubro','form-ajustes')"
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
                          >
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
                            v-validate data-vv-rules="required" 
                             data-vv-scope="form-ajustes"
                              data-vv-name="tipo"
                              data-vv-value-path="tipo"
                             :class="{'error-input error-input-multi': errors.first('tipo','form-ajustes')}"

                            >
                                <span slot="noResult">
                                  No se encontraron resultados</span>
                                    <span slot="noOptions">
                                  Lista vacía</span>
                          </multiselect>
                          
                            <span
                                    class="error-text"
                                    v-if="errors.first('tipo','form-ajustes')"
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
                            >Monto invalido</p>
                          </div>
                        </div>
                      </div>
                        <div class="align-items-center form-body d-flex justify-content-between flex-column flex-md-row mt-3 pb-2 div-price">
                        <div class="w-100 position-relative ppbb-2">

                            <textarea
                                name="descripcion"
                                id="descripcion"
                                row="5"
                                class="form-control input-rounded h-auto"
                                v-model="articulo.descripcion"
                                autocomplete="off"
                                :class="{'error-input': errors.first('descripcion','form-ajustes')}"
                                data-vv-scope="form-ajustes"
                                v-validate
                                data-vv-rules="required:true|min:3"
                                placeholder="Ingrese Descripción"
                              > 
                            </textarea>
                              <span
                                class="error-text"
                                v-if="errors.firstByRule('descripcion', 'required','form-ajustes')"
                              >Campo requerido.</span>
                              <span
                                class="error-text"
                                v-else-if="errors.firstByRule('descripcion','min','form-ajustes')"
                              >Mínimo 3 caracteres.</span>
                            </div>
                        </div>
                      <!--subir imagenes -->
                      <!-- agregar otras imagenes-->

                      <div v-if="isEdit">
                          <div class="text-center">
                            <h4>Imagenes del articulo actualmente almacenadas</h4>
                            <hr>
                          </div>
                          <span class="projects justify-content-start align-items-center" :class="{'justify-content-center': imagenesarticulos.length == 0}" style="padding:10px;min-height: 30vh; position: relative;">
                            <div class="project" v-for="(file) in imagenesarticulos" :key="file.id">
                                <div class="pi-pic">
                                  <img v-if="file.url" :src="getUrl+file.url" width="125" height="125" />
                                  <span v-else>No Image</span>
                                  <div class="pi-links">
                                    <a class="cursor mr-2" @click="openModalImg(file.url)"><i class="fa fa-eye"></i></a>
                                    <a class="cursor" @click.prevent="removeImageServer(file)">
                                      <i class="fa fa-trash"></i>
                                    </a>
                                  </div>
                                </div>
                            </div>
                          </span>

                      </div>
                      <div class="text-center" v-if="!isEdit">
                        <h3>Subir imagenes de artículo</h3>
                        <hr>
                      </div>
                      <div class="text-center" v-else>
                        <h3>Agregar otras imagenes al artículo</h3>
                        <hr>

                      </div>
                          <span class="projects justify-content-start align-items-center" id="ajustesbasicosIMG" :class="{'justify-content-center': files.length == 0}" style="padding:10px;min-height: 30vh; position: relative;">
                            <div class="project" v-for="(file) in files" :key="file.id">
                                <div class="pi-pic">
                                  <img v-if="file.thumb" :src="file.thumb" width="125" height="125" />
                                  <span v-else>No Image</span>
                                  <div class="pi-links">
                                    <a class="cursor mr-2" @click="openModalImg(file.blob)"><i class="fa fa-eye"></i></a>
                                    <a class="cursor" @click.prevent="removeImg(file)">
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
                      <div class="form-body d-flex justify-content-between flex-column flex-md-row wrap-f">
                        <div class="basis-46 position-relative ppbb-2" v-if="((selectedTipo !== null) && selectedTipo.toUpperCase() == 'ROPA')">
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
                             @remove="eventRemoveTalle" 
                             track-by="valor"
                             v-validate data-vv-rules="required" 
                             data-vv-scope="form-disponibilidad"
                              data-vv-name="talles"
                              data-vv-value-path="talles"
                             :class="{'error-input error-input-multi': errors.first('talles','form-disponibilidad')}" 
                            >
                              <template slot="option" slot-scope="props">
                                <div class="option__desc"><span class="option__title">{{ props.option.valor }}</span></div>
                              </template>
                                <span slot="noResult">
                                  No se encontraron resultados</span>
                                  <span slot="noOptions">
                                  Lista vacía</span>
                          </multiselect>
                          <span
                                    class="error-text"
                                    v-if="errors.first('talles','form-disponibilidad')"
                            >Campo requerido.</span>
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
                            @select="eventSelectColor"
                            @remove="eventRemoveColor"
                             v-validate data-vv-rules="required" 
                             data-vv-scope="form-disponibilidad"
                              data-vv-name="colores"
                              data-vv-value-path="colores"
                             :class="{'error-input': errors.first('colores','form-disponibilidad')}" 
                            >
                              <template slot="option" slot-scope="props">
                                <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                              </template>
                                <span slot="noResult">
                                  No se encontraron resultados</span>

                          </multiselect>
                          <span
                                    class="error-text"
                                    v-if="errors.first('colores','form-disponibilidad')"
                            >Campo requerido.</span>
                        </div>
                        <div class="basis-46 position-relative ppbb-2">
                          <multiselect
                            v-model="selectedCantidad"
                            :options="['General','Por Variante']"
                            selectLabel =""
                            selectedLabel = ""
                            placeholder="Tipo Cantidad"
                            deselectLabel = ""
                            open-direction="bottom"
                            :multiple="false"
                            :hideSelected = "true"
                            v-validate data-vv-rules="required" 
                             data-vv-scope="form-disponibilidad"
                              data-vv-name="tipoCantidad"
                              data-vv-value-path="tipoCantidad"
                             :class="{'error-input error-input-multi': errors.first('tipoCantidad','form-disponibilidad')}" 

                            >
                                <span slot="noResult">
                                  No se encontraron resultados</span>
                                <span slot="noOptions">
                                  Lista vacía</span>
                          </multiselect>
                          <span
                                    class="error-text"
                                    v-if="errors.first('tipoCantidad','form-disponibilidad')"
                            >Campo requerido.</span>
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
                            <span
                              class="error-text"
                              v-if="errors.firstByRule('cantidad', 'required', 'form-disponibilidad')"
                            >Requerido</span>
                            <span
                              class="error-text"
                              v-else-if="errors.firstByRule('cantidad', 'cantidadvv', 'form-disponibilidad')"
                            >Cantidad Invalida</span>
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
                                <th class="text-center"  v-if="((selectedTipo !== null) && selectedTipo.toUpperCase() == 'ROPA')">Talle</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-center">Precio</th>
                                <th class="text-center">Acciones</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-if="!filesVariantes.length">
                                <td :colspan="((selectedTipo !== null) && selectedTipo.toUpperCase() == 'ROPA')? 5:4">
                                  <div class="text-center p-5">
                                    <button  @click.stop.prevent="addVariante" class="cursor btn btn-primary"><i class="fa fa-plus cursor pr-2"></i>Agregar Variante</button>
                                  </div>
                                </td>
                              </tr>
                              <tr v-for="(fileV,index) in filesVariantes" :key="index">
                                <td class="text-center position-relative pb-3 min-w120" >
                                    <multiselect
                                      v-model="fileV.selectedColorVariante"
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
                                      v-bind:class="{'error-input error-input-multi': fileV.selectedColorVariante==''||fileV.selectedColorVariante==null}"
                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>
                                            <span slot="noOptions">
                                              Lista vacía</span>

                                    </multiselect>
                                    <span
                                      class="error-text"
                                      v-if=" fileV.selectedColorVariante==''||fileV.selectedColorVariante==null"
                                      >Campo requerido.</span>
                                </td>
                                <td class="text-center position-relative pb-3 min-w120" v-if="((selectedTipo !== null) && selectedTipo.toUpperCase() == 'ROPA')">
                                  <multiselect
                                      v-model="fileV.selectedTalleVariante"
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
                                       v-bind:class="{'error-input error-input-multi': fileV.selectedTalleVariante==''||fileV.selectedTalleVariante==null}"

                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc"><span class="option__title">{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>
                                            <span slot="noOptions">
                                             Lista vacía</span>

                                    </multiselect>
                                    <span
                                      class="error-text"
                                      v-if=" fileV.selectedTalleVariante==''||fileV.selectedTalleVariante==null"
                                      >Campo requerido.</span>
                                </td>
                                <td class="text-center position-relative pb-3 mw-120">
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
                                      <span
                                          class="error-text"
                                          v-if="errors.firstByRule('cantidadV'+index, 'required', 'form-disponibilidad')"
                                        >Requerido</span>
                                        <span
                                          class="error-text"
                                          v-else-if="errors.first('cantidadV'+index, 'form-disponibilidad')"
                                        >Cantidad invalida</span>
                                </td>
                                <td class="text-center position-relative pb-3 mw-150">
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
                                      <span
                                        class="error-text"
                                        v-if="errors.firstByRule('amountV'+index, 'required', 'form-disponibilidad')"
                                      >Requerido</span>
                                      <span
                                        class="error-text"
                                        v-else-if="errors.first('amountV'+index, 'form-disponibilidad')"
                                      >Monto Invalido</span>

                                </td>

                                <td class="text-center position-relative pb-3">
                                     <button class="cursor btn btn-inverse" @click="deleteVariante(index)"><i class="fa fa-trash cursor"></i></button>
                                     <template v-if="(selectedTipo.toUpperCase() == 'ROPA')">
                                        <button v-if="index == filesVariantes.length-1 && fileV.selectedTalleVariante!='' && fileV.selectedTalleVariante!=null && fileV.selectedColorVariante!='' && fileV.selectedColorVariante!=null" class="cursor btn btn-primary" @click="addVariante()"><i class="fa fa-plus cursor"></i></button>
                                         <button v-else-if="index == filesVariantes.length-1 && (fileV.selectedTalleVariante=='' || fileV.selectedTalleVariante==null || fileV.selectedColorVariante=='' || fileV.selectedColorVariante==null)" class="cursor btn btn-primary disabled" @click="msgAlert('Los campos color y talle son requeridos en la tabla','warning')"><i class="fa fa-plus cursor"></i></button>
                                    </template>
                                  
                                      
                                    <template v-else>
                                       <button v-if="index == filesVariantes.length-1 && fileV.selectedColorVariante!='' && fileV.selectedColorVariante!=null" class="cursor btn btn-primary" @click="addVariante()"><i class="fa fa-plus cursor"></i></button>
                                         <button v-else-if="index == filesVariantes.length-1 && (fileV.selectedColorVariante=='' || fileV.selectedColorVariante==null)" class="cursor btn btn-primary disabled" @click="msgAlert('El campo color es requrido en la tabla','warning')"><i class="fa fa-plus cursor"></i></button>
                                    </template>
                                      

                                    

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
                                    <button  @click.stop.prevent="addRelacion" class="cursor btn btn-primary"><i class="fa fa-plus cursor pr-2"></i>Agregar Relación Imagen-Color</button>
                                  </div>
                                </td>
                              </tr>
                              <tr v-for="(fileIC,index) in filesImagesColor" :key="index">
                                 <td class="text-center position-relative pb-3">
                                      <img v-if="filesImagesColor[index].file !== null &&  Object.keys(filesImagesColor[index].file).length !== 0 && filesImagesColor[index].file.thumb" :src="filesImagesColor[index].file.thumb" style="width:50px;height:50px"/>  
                                     <button v-else  class="cursor btn btn-danger" data-dismiss="modal" @click.stop.prevent="openModalImagenesCargadas(index)"><i class="fa fa-image cursor pr-1"></i>Seleccionar</button>
                                    
                                </td>
                                <td class="text-center position-relative pb-3">
                                    <multiselect
                                      v-model="fileIC.selectedColorRelacion"
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
                                        v-bind:class="{'error-input error-input-multi': fileIC.selectedColorRelacion==''||fileIC.selectedColorRelacion==null}"

                                      >
                                        <template slot="option" slot-scope="props">
                                          <div class="option__desc d-flex align-items-center"><span class="option__title d-flex align-items-center"><div class="mr-2" :style="'width:25px;height:25px;border: 1px solid black;background:'+props.option.color" ></div>{{ props.option.valor }}</span></div>
                                        </template>
                                          <span slot="noResult">
                                            No se encontraron resultados</span>
                                            <span slot="noOptions">
                                              Lista vacía</span>

                                    </multiselect>
                                     <span
                                      class="error-text"
                                      v-if="fileIC.selectedColorRelacion==''||fileIC.selectedColorRelacion==null"
                                      >Campo requerido.</span>

                                </td>
                               
                                
                                  <td class="text-center position-relative pb-4">  
                                      <label class="contenido">
                                        <input type="radio" @change="cambiarEsPrincipal(index)" :id="'radio_'+index" name="radio">
                                        <span class="checkmark"></span>
                                      </label>
                                  </td>

                                <td class="text-center position-relative pb-3">
                                     <button class="cursor btn btn-inverse" @click="deleteRelacion(index)"><i class="fa fa-trash cursor"></i></button>
                                    <button v-if="((index == filesImagesColor.length-1) && (fileIC.file) && (fileIC.file !== null) && (Object.keys(fileIC.file).length !== 0) && fileIC.selectedColorRelacion!='' && fileIC.selectedColorRelacion!=null && fileIC.posicionRelacion!='' && fileIC.posicionRelacion!=null)" class="cursor btn btn-primary" @click="addRelacion()"><i class="fa fa-plus cursor"></i></button>
                                   <button v-else-if="index == filesImagesColor.length-1 && (fileIC.selectedColorRelacion=='' || fileIC.selectedColorRelacion==null || fileIC.posicionRelacion=='' || fileIC.posicionRelacion==null)"  class="cursor btn btn-primary disabled" @click="msgAlert('Hay campos requeridos','warning')"><i class="fa fa-plus cursor"></i></button>

                                      <button v-else-if="index == filesImagesColor.length-1 && (fileIC.file == null || Object.keys(fileIC.file).length == 0)"  class="cursor btn btn-primary disabled" @click="msgAlert('La imagen es requerida','warning')"><i class="fa fa-plus cursor"></i></button>


                                </td>
                             
                              
                              </tr>
                            </tbody>
                          </table>
                        </div> 

                

                  </div>
                </div>

                <div class="tab-content d-flex justify-content-between align-items-center">
                  <label class="contenido basis-33">
                    Publicado
                    <input type="checkbox"  id="publicado" v-model="articulo.publicado" name="publicado">
                    <span class="checkmark"></span>
                  </label>
                  <label class="contenido basis-33">
                    Destacado
                    <input type="checkbox"  id="destacado" v-model="articulo.destacado" name="destacado">
                    <span class="checkmark"></span>
                  </label>
                  
                  <label class="contenido basis-33">
                     <button type="button" @click="saveAll" class="btn btn-primary  m-b-10 pull-right">Guardar</button>
                   </label>

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

                      <img v-if="isEdit" :src="selectedImg" style="width:100%;height:100%"/>  
                      <img v-else :src="getUrl+selectedImg" style="width:100%;height:100%"/>  

          
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
                            <div class="project" v-for="(file) in files" :key="file.id" v-if="file.selectedImagen != true">
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
  <loading v-if="isLoading"></loading>
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
import Loading from "../../layouts/loadingComponent"


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
      optionColors: [],
      optionTalles: [
      ],
      optionsPosicion: [],
      optionRubros: [
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
      imagenesarticulos: [],
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
        imagenes: [],
        mask_precio: '',
        rubros: [],
        talles: [],
        colores: [],
        talles_colores: [],
        imagenes_colores: [],
        tipo: '',
        tipo_cantidad: '',
        cantidad: 0,
        descripcion: '',
        destacado: false,
        publicado:false
      },
      posicionColor: [],
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
      },
      isEdit: false
    };
  },
  components: {
    FileUpload,
    Multiselect,
    Loading
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
    if(this.$route.name=='nuevoArticulo'){
       
      this.isEdit = false
      this.getColores()
      this.getRubros()
      this.getTalles()
      this.getPosicion()
    } else {
      if(Object.keys(this.$route.params).length !== 0){
        this.isEdit = true
        this.serviceArticulo(this.$route.params.id)
      }
    }
    
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
    serviceArticulo(id){
       this.isLoading = true
      CerService.post("/articulo/no-disenable/"+id+"/editar")
      .then(response => 
      {
        if(response.res == 1){
          this.imagenesarticulos = response.articulo.imagenesarticulos
          this.articulo.nombre = response.articulo.nombre
          this.articulo.marca = response.articulo.marca
          this.articulo.descripcion = response.articulo.descripcion
          this.selectedRubros = response.articulo.rubros
          this.articulo.publicado = response.articulo.publicado
          this.articulo.destacado = response.articulo.destacado
          if(response.articulo.tipo == 'ropa') {
            this.selectedTipo = 'Ropa'
          } else {
            this.selectedTio = 'Otros'
          }
          this.articulo.precioGeneral = response.articulo.precioGeneral
          this.maskAmount = response.articulo.mask_precio
          this.maskCantidad = response.articulo.mask_cantidad
          this.articulo.otros = response.articulo.otros
          this.selectedTallas = response.articulo.talles
          this.selectedColores = response.articulo.colores
          this.articulo.cantidad = parseInt(response.articulo.cantidad)
          if(response.articulo.tipo_cantidad == 'por_variante') {
            this.selectedCantidad = 'Por Variante'
          } else {
            this.selectedCantidad = 'General'
          }
          response.articulo.tallescolores.forEach(function(file,i){
            let aux = {
                selectedColorVariante: file.color,
                selectedTalleVariante: (this.selectedTipo === 'Ropa') ? file.talle: {},
                colorVarianteAux: {
                  colorOld: '',
                  colorNew: '',
                },
                cantidadVariante: file.cantidad,
                precioVariante: parseFloat(file.precio)

              }
              this.filesVariantes.push(
              {...aux}
              )
          },this)
          response.articulo.imagenes_colores.foreach(function(file,i){
            let aux = {
                  selectedColorRelacion: file.color,
                  file: {
                      id: file.id,
                      thumb: '',
                      url: file.url
                  },
                  es_principal: file.principal,
                  posicionRelacion: {
                    id:'frontal',
                    nombre: 'Frontal'
                  }
                }
              this.filesImagesColor.push(
              {...aux}
              )
          },this)
          this.getColores()
          this.getRubros()
          this.getTalles()
          this.getPosicion()
        }else{
          this.msgAlert(response.msg,'error')
          this.$router.push({ name: 'no.encontrado' });
        }
      })
      .catch(error => {
        console.log('Ha ocurrido un error inesperado')
        this.isLoading = false
      });
    },
    removeImageServer(file){

    },
    eventSelectColor(selectedOption, id){
      let aux = {
        color: selectedOption,
        position: {
            existFrontal: false,
            existReverso: false
        }
      }
      this.posicionColor.push({...aux})
    },
    eventRemoveColor(removedOption, id){
     this.filesImagesColor.forEach((file,id) =>{
        if(removedOption == file.selectedColorRelacion){
          this.filesImagesColor[id].selectedColorRelacion = ""
        }
      },this)
     this.filesVariantes.forEach((file,id) =>{
        if(removedOption == file.selectedColorVariante){
          this.filesVariantes[id].selectedColorVariante = ""
        }
      },this)
      this.posicionColor.splice(id,1)
    },
     eventRemoveTalle(removedOption, id){
        this.filesVariantes.forEach((file,id) =>{
          if(removedOption == file.selectedTalleVariante){
            this.filesVariantes[id].selectedTalleVariante = ""
          }
        },this)
     },
    getPosicion(){
      this.isLoading = true
        CerService.post("/imagenes-articulos/posicion-imagen")
        .then(response => 
        {
            if(response.posicion)
            {
              this.optionsPosicion = response.posicion
            }
            this.isLoading = false
        })
        .catch(error => {
          console.log('Ha ocurrido un error inesperado')
          this.isLoading = false
        });
    },
    getColores(){
      this.isLoading = true
        CerService.post("/grupos/colores/api")
        .then(response => 
        {
            if(response.colores)
            {
              this.optionColors = response.colores
            }
            this.isLoading = false
        })
        .catch(error => {
          console.log('Ha ocurrido un error inesperado')
          this.isLoading = false
        });
    },
    getTalles(){
      this.isLoading = true
      CerService.post("/grupos/talles/api")
      .then(response => 
      {
          if(response.talles)
          {
           this.optionTalles = response.talles
          }
          this.isLoading = false
          
      })
      .catch(error => {
        console.log('Ha ocurrido un error inesperado')
        this.isLoading = false
      });
    },
    getRubros(){
      this.isLoading = true
      CerService.post("/rubros/todos/api")
      .then(response => 
      {
          if(response.rubros)
          {
            this.optionRubros = response.rubros
          }
          
      })
      .catch(error => {
        console.log('Ha ocurrido un error inesperado')
        this.isLoading = false
      });

    },
    cambiarEsPrincipal(index){
      this.filesImagesColor.forEach((file,id) =>{
        if(id == index){
          this.filesImagesColor[id].es_principal = true
           $("#radio_"+id).prop("checked", true);

        }else {
          this.filesImagesColor[id].es_principal = false
           $("#radio_"+id).prop("checked", false);

        }
      },this)
    },
    removeImg(file){
      // se borra las imagenes que han sido borrada para la relación imagen-color
      const resultado = this.filesImagesColor.findIndex( fileIC => fileIC.file === file );
      if(resultado !== -1){
        //si esta check como principal
        let mainP = false
        if(this.filesImagesColor[resultado].es_principal){
          $("#radio_"+resultado).prop("checked", false);
          mainP = true
        }
        this.filesImagesColor.splice(resultado,1)
         if(mainP && this.filesImagesColor.length){
            setTimeout(e => {
              $("#radio_0").prop("checked", true);
            },10) 
            this.filesImagesColor[0].es_principal = true
          }
      }
      this.$refs.upload.remove(file)
    },
    deleteVariante(index){
      this.filesVariantes.splice(index,1)
    },
    deleteRelacion(index){
      //buscar la imagen para quitar el seleccionado 
      let fileAux = this.filesImagesColor[index].file
      const resultado = this.files.findIndex( file => file === fileAux );
      if( resultado !== -1)
      {
        this.files[resultado].selectedImagen = false

      }
      //si esta check como principal
      let mainP = false
      if(this.filesImagesColor[index].es_principal){
        $("#radio_"+index).prop("checked", false);
        mainP = true
      }
      // borra la imagen de la relación
      
      this.filesImagesColor.splice(index,1)
      if(mainP && this.filesImagesColor.length){
        setTimeout(e => {
          $("#radio_0").prop("checked", true);
        },10)         
        this.filesImagesColor[0].es_principal = true
      }
    },
    addVariante()
    {
      let aux = {
          selectedColorVariante: "",
          selectedTalleVariante: "",
          colorVarianteAux: {
            colorOld: '',
            colorNew: '',
          },
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
          es_principal: false,
          posicionRelacion: {
            id:'frontal',
            nombre: 'Frontal'
          }
        }
      this.filesImagesColor.push(
      {...aux}
      )
       if (this.filesImagesColor.length === 1){
          this.filesImagesColor[0].es_principal = true
          setTimeout(e => {
            $("#radio_0").prop("checked", true);
          },10)
      }
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
    customLabelPosicion({nombre}){
      return `${nombre}`
    },
    validatorImagenRelacion(){
      let validator = true
      this.filesImagesColor.forEach(e => {
        if(Object.keys(e.file).length == 0){
          validator = false
        }
      })
      return validator;
    },
    validatorDisponibilidad(){
      let validator = true
      this.filesVariantes.forEach(e => {
        if((e.selectedColorVariante == '' || e.selectedColorVariante == null)){
          validator = false
          if(this.selectedTipo.toUpperCase() == 'ROPA' &&  (e.selectedTalleVariante == '' || e.selectedTalleVariante == null)){
            validator = false
          }
        }
      })
      return validator;
    },
    validatorRelacion(){
      let validator = true
      this.filesImagesColor.forEach(e => {
        if(e.selectedColorRelacion == '' || e.selectedColorRelacion == null || e.posicionRelacion == '' || e.posicionRelacion == null ){
          validator = false
        }
      })
      return validator;
    },
    saveAll(){
       this.$validator.validateAll("form-create").then(resp => 
        {
          if (resp)
          {
             this.$validator.validateAll("form-ajustes").then(resA => 
              {
                    if (resA){
                      if(this.files.length){
                        this.$validator.validateAll("form-disponibilidad").then(resD => 
                      {
                        if (resD && this.validatorDisponibilidad()){
                            if (this.validatorImagenRelacion()){
                                if (this.validatorRelacion()){
                                    this.articulo.imagenes = this.files
                                    this.articulo.rubros = this.selectedRubro
                                    this.articulo.tipo = this.selectedTipo
                                    this.articulo.talles = this.selectedTallas
                                    this.articulo.colores = this.selectedColores
                                    this.articulo.tipo_cantidad = this.selectedCantidad
                                    this.articulo.talles_colores = this.filesVariantes
                                    this.articulo.imagenes_colores = this.filesImagesColor
                                    this.articulo.mask_precio = this.maskAmount
                                    this.articulo.mask_cantidad = this.maskCantidad
                                    var dataform = new FormData();
                                    for( var i = 0; i < this.files.length; i++ ){
                                        let file = this.files[i].file;
                                        dataform.append('imagenes[' + i + ']', file);
                                    }
                                    let data = JSON.stringify({
                                            articulo: this.articulo,
                                        });
                                    dataform.append('articulo',data)
                                    console.log(dataform);
                                    this.isLoading=true
                                    CerService.post("/articulo/no-disenable/guardar",dataform,{
                                    headers:
                                      {
                                          'Content-Type': 'application/json',
                                      }
                                    })
                                    .then(response => 
                                    {
                                        console.log(response)
                                        if(response.res == 1){
                                          this.msgAlert(response.msg,'success')
                                          this.$router.push({ name: 'articulos' });

                                        } else {
                                          this.msgAlert(response.msg,'warning')
                                        }
                                        this.isLoading=false
                                    })
                                    .catch(error => {
                                      this.msgAlert('Ha ocurrido un error inesperado','error')
                                        this.isLoading=false

                                    });
                                  } else {
                                    let element = document.getElementById("tabcontent");
                                      var options = {
                                          offset: 0,
                                          force: true
                                     };
                                    this.$scrollTo(element, 0, options);
                                    $('.nav-tabs a[href="#relacion"]').tab('show');
                                    this.msgAlert('Por favor verifique el tab relacion Imagen-Color','warning')

                                  }
                           } else {
                                      let element = document.getElementById("tabcontent");
                                      var options = {
                                          offset: 0,
                                          force: true
                                     };
                                    this.$scrollTo(element, 0, options);
                                    $('.nav-tabs a[href="#relacion"]').tab('show');
                                      this.msgAlert('La imagen es requerida en la relación Imagen-Color','warning')
                            }
                        } else {
                          let element = document.getElementById("tabcontent");
                            var options = {
                                offset: 0,
                                force: true
                           };
                          this.$scrollTo(element, 0, options);
                          $('.nav-tabs a[href="#disponibilidad"]').tab('show');
                          this.msgAlert('Por favor verifique el tab disponibilidad','warning')
                        }
                        })
                      }else {
                        let element = document.getElementById("ajustesbasicosIMG");
                          var options = {
                              offset: 0,
                              force: true
                         };
                        this.$scrollTo(element, 0, options);
                        $('.nav-tabs a[href="#ajustesbasicos"]').tab('show');
                        this.msgAlert('Debe subir por lo menos una imagen del articulo en ajustes básicos','warning')

                      }
                      
                } else {
                  let element = document.getElementById("tabcontent");
                    var options = {
                        offset: 0,
                        force: true
                   };
                  this.$scrollTo(element, 0, options);
                  $('.nav-tabs a[href="#ajustesbasicos"]').tab('show');
                  this.msgAlert('Por favor verifique el tab ajustes básicos','warning')

                }
              })
          }
          else
          {
            let element = document.getElementById("nuevoArticulo");
                    var options = {
                        offset: 0,
                        force: true
             };
            this.$scrollTo(element, 0, options);
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
            timer: 4000
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
                selectedImagen: false, //esto es agregado nuevo
                es_principal: false //tambien es nuevo
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
            this.$refs.upload.update(newFile, { error: "size",  selectedImagen: false, es_principal: false /*agregado personal*/});
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
      if(this.selectedCantidad == null || this.selectedCantidad.toUpperCase()!= 'GENERAL'){
          this.filesVariantes = []
          this.articulo.cantidad = 0
          this.maskCantidad = ""
        }
    },
    filesImagesColor: function(){
      if (this.filesImagesColor.length === 1){
          this.filesImagesColor[0].es_principal = true
          setTimeout(e => {
            $("#radio_0").prop("checked", true);
          },10)      }
    }
    
    
  }
};
</script>