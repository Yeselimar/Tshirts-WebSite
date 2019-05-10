<template>
        <div>

            <!-- title --->
            <migajas-component titulo="Diseñar > Personalizar"></migajas-component>

            <!-- end title --->
            <!-- section disenar --->
        <div class="container mt-5 d-flex flex-wrap justify-content-center">
            <!-- Lado 1 --->
            <div class="panel-diseno-l1">
                <!-- Header Lado 1 --->
                <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
                    <div class="panel-btn d-flex" :class="[{'panel-btn-active pulse animated': activo === 'Productos'}]" @click="showProductsPanel('Productos')"> <i class="fa fa-check-circle-o">&nbsp;</i>
                    <div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Productos</div>
                    </div>

                    <div class="panel-btn d-flex" :class="[{'panel-btn-active pulse animated': activo === 'Imagen'}]" @click="showImagePanel('Imagen')"> <i class="fa fa-file-image-o">&nbsp;</i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Imágen</div></div>

                    <div class="panel-btn d-flex" :class="[{'panel-btn-active pulse animated': activo === 'Info'}]" @click="showInfoPanel('Info')"> <i class="fa fa-info-circle">&nbsp;</i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Instrucciones</div></div>
                </div>
                <!--Contenedor del Lado 1 -->
                <div class="container-disenar justify-content-center d-flex flex-wrap scroll-barna" >
                        <!--Contenedor Productos del Lado 1 -->
                    <div class="justify-content-center d-flex flex-wrap" v-if="showProducts">
                        <div v-for="imagenProducto in articulos" class="productos-disenar">
                            <div class="product-item cursor" @click="showCambioArticulo(imagenProducto.id)">
                                <div class="pi-pic"><img :src="getUrl+imagenProducto.principal" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!--Contenedor Imagen Frontal del Lado 1 -->
                        <div v-else-if="showImage && activofb=='Frontal'">
                            <div class="d-flex justify-content-center align-items-center m-3">
                            <h5 class="text-center">Imagen Seleccionada:  </h5>
                            <button class="btn-upload" v-if="newImagenUrl == '' &&  newImagen == ''" @click="openInputFile()">Subir</button>
                            <img class="img-fluid py-2" v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="getUrl+newImagenUrl" width="100" height="100">
                            <input accept="image/*" v-if="newImagenUrl == '' &&  newImagen == ''" class="d-none" type="file" ref="imagenInput" @change="AdjuntarImagenFrontal($event)">
                            <button class="btn-delete" v-else @click="newImagenUrl='';newImagen=''"><i class="fa fa-trash"></i></button>
                            </div>
                            <!--Imagenes predisenadas-->
                            <hr>
                            <div class=" justify-content-center d-flex flex-wrap pt-2"><h5>Imagenes Prediseñadas:  </h5><br></div>

                            <div class="justify-content-center d-flex flex-wrap">
                                <div v-for="imagen in imagenes_predisenadas">
                                    <div class="imagenes-predisenadas">
                                        <div class="product-item">
                                            <div class="pi-pic"><img  @click="imagenPredisenadaFrontal(imagen)" style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" :src="getUrl+imagen" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--Contenedor Imagen Reverso del Lado 1 -->
                        <div v-else-if="showImage && activofb=='Reverso'">
                            <div class="d-flex justify-content-center align-items-center m-3">
                            <h5 class="text-center">Imagen Seleccionada:  </h5>
                            <button class="btn-upload" v-if="newImagenUrlRV == '' &&  newImagenRV == ''" @click="openInputFile()">Subir</button>
                            <img class="img-fluid py-2" v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="getUrl+newImagenUrlRV" width="100" height="100">
                            <input accept="image/*" v-if="newImagenUrlRV == '' &&  newImagenRV == ''" class="d-none" type="file" ref="imagenInput" @change="AdjuntarImagenReverso($event)">
                            <button class="btn-delete" v-else @click="newImagenUrlRV='';newImagenRV=''"><i class="fa fa-trash"></i></button>
                            </div>
                            <!--Imagenes predisenadas-->
                            <hr>
                            <div class=" justify-content-center d-flex flex-wrap pt-2"><h5>Imagenes Prediseñadas:  </h5><br></div>
                            <div class="justify-content-center d-flex flex-wrap">
                                <div v-for="imagen in imagenes_predisenadas">
                                    <div class="imagenes-predisenadas">
                                        <div class="product-item">
                                            <div class="pi-pic"><img  @click="imagenPredisenadaReverso(imagen)" style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" :src="getUrl+imagen" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--Contenedor Info del Lado 1 -->
                        <div v-else-if="showInfo">
                            <div class="px-5 py-3">
                                <ul>
                                    <li>Selecciona el Producto a personalizar</li>
                                    <li>Selecciona el color de tu producto</li>
                                    <li>Inserta la Imagen en el lado Frontal</li>
                                    <li>Inserta la Imagen en el lado Reverso</li>
                                    <li>Ubica la Imagen en la posicion de tu gusto</li>
                                    <li>Seleeciona el Talle o Tamaño</li>
                                    <li>Envia tu Pedido</li>
                                </ul>
                                <br>
                                <h6>Una vez enviado tu pedido, este pasara por un proceso de revision. Una vez aprobado podrás proceder a realizar el pago.</h6>
                            </div>
                        </div>
                </div>

                <!--Fin contenedor lado 1 -->
            </div>
            <!-- Lado 2 --->
            <div class="panel-diseno-l2 justify-content-center">
                <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
                    <div class="panel-btn d-flex"  @click="showVistaPrevia()"> <i class="fa fa-eye"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Vista previa</div></div>
                    <div class="d-flex align-items-center panel-btn letras-panel" :class="[{'panel-btn-active pulse animated': activofb === 'Frontal'}]" @click="showFrontalPanel('Frontal')">Frontal</div>

                    <div class="d-flex align-items-center panel-btn letras-panel" :class="[{'panel-btn-active pulse animated': activofb === 'Reverso'}]" @click="showReversePanel('Reverso')">Reverso</div>
            <!--   <div class="quantity"><div class="pro-qty mb-1"><input class="pb-1" type="text" value="2"></div></div> -->
                    <div class="align-items-center d-flex form__field">
                        <div class="align-items-center d-flex">Color:</div><swatches  :swatch-style="{width: '22px', height: '22px'}" :trigger-style="{width: '22px', height: '22px', marginTop:'20%'}" v-model="color" :colors="colors" row-length="4" shapes="circles"
                        show-border popover-to="left"></swatches>
                    </div>
                </div>
                <div class="container-imagen-a-disenar" id="contenedor-frontal" v-show="showFrontal">
                <img style="width:100%; height:100%" :src="getUrl+imgFrontal">
                    <div class="container-area-de-diseno" :style="'width:'+w_result_container+'px;'+'top:'+top_result+'%;'+'height:'+h_result_container+'px;'+'left:'+left_result+'%;'">

                            <VueDragResize id="frontal" style="border: 0px"
                            @clicked="onActivated"
                            @activated="onActivated"
                            @deactivated="onDeactivated"
                            @dragstop="resize"
                            @resizing="resize"
                            @dragging="resize"
                            :isActive=isActive
                            :parentW=w_result
                            :parentH=h_result
                            :parentLimitation="true"
                            :w="30"
                            :h="30"
                            :x="0"
                            :y="0"
                            >
                                <img style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="getUrl+newImagenUrl">
                            </VueDragResize>
                    </div>
                <!--   <p>Frente:Top:{{top}} Left:{{left}}</p>
                    <p>Frente:Width:{{width}} Height:{{height}}</p>
                    <p>Reverso:Top:{{toprv}} Left:{{leftrv}}</p>
                    <p>Reverso:width:{{widthrv}} heigh:{{heightrv}}</p> -->
                </div>
                <div class="container-imagen-a-disenar-rv" id="contenedor-reverso" v-show="showReverse">
                <img style="width:100%; height:100%" :src="getUrl+imgReverso">
                    <div class="container-area-de-diseno-rv" :style="'width:'+w_result_container_rv+'px;'+'top:'+top_result_rv+'%;'+'height:'+h_result_container_rv+'px;'+'left:'+left_result_rv+'%;'">
                            <VueDragResize2 id="reverso" style="border: 0px"
                            @clicked="onActivatedRV"
                            @activated="onActivatedRV"
                            @deactivated="onDeactivatedRV"
                            @dragstop="resizeRV"
                            @resizing="resizeRV"
                            @dragging="resizeRV"
                            :isActive=isActiverv
                            :parentW=w_result_rv
                            :parentH=h_result_rv
                            :parentLimitation="true"
                            :w="30"
                            :h="30"
                            :x="0"
                            :y="0">
                                <img style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="getUrl+newImagenUrlRV">
                            </VueDragResize2>
                    </div>
                    <!-- <p>Frente:Top:{{top}} Left:{{left}}</p>
                    <p>Frente:Width:{{width}} Height:{{height}}</p>
                    <p>Reverso:Top:{{toprv}} Left:{{leftrv}}</p>
                    <p>Reverso:width:{{widthrv}} heigh:{{heightrv}}</p> -->
                </div>
            <!--     <div class="d-flex justify-content-center m-2 p-1">
                    <button class="btn-upload" @click="showConfirmacion()"> Enviar Pedido</button>
                    <a class="btn-upload" :href="disenoUsuario64" download="diseño.png">Ver Diseño</a>
                </div> -->
            </div>
        </div>
            <!--Detalles del pedido -->
            <div class="container d-flex flex-wrap justify-content-around">
                    <div class="product-details panel-detalles">
                                <div id="accordion" class="accordion-area" style="margin-top: 5px !important">
                                    <div class="panel">
                                        <div class="panel-header" id="headingOne">
                                            <button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">Descripción</button>
                                        </div>
                                        <div id="collapse1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                            <div class="panel-body">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
                                                <p>Approx length 66cm/26" (Based on a UK size 8 sample)</p>
                                                <p>Mixed fibres</p>
                                                <p>The Model wears a UK size 8/ EU size 36/ US size 4 and her height is 5'8"</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel">
                                        <div class="panel-header" id="headingThree">
                                            <button class="panel-link" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">shipping & Returns</button>
                                        </div>
                                        <div id="collapse3" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div class="panel-body">
                                                <h4>7 Days Returns</h4>
                                                <p>Cash on Delivery Available<br>Home Delivery <span>3 - 4 days</span></p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    <div class="product-details panel-detalles">
                            <h2 class="p-title">Remera Deportiva Roja</h2>
                            <h3 class="p-price">$19.90</h3>
                            <h4 class="p-stock">Disponibilidad: <span>In Stock</span></h4>
                            <div class="fw-size-choose">
                                <p>Talle</p>
                                <div class="sc-item">
                                    <input type="radio" name="sc" id="xs-size">
                                    <label for="xs-size">32</label>
                                </div>
                                <div class="sc-item">
                                    <input type="radio" name="sc" id="s-size">
                                    <label for="s-size">34</label>
                                </div>
                                <div class="sc-item">
                                    <input type="radio" name="sc" id="m-size" checked="">
                                    <label for="m-size">36</label>
                                </div>
                                <div class="sc-item">
                                    <input type="radio" name="sc" id="l-size">
                                    <label for="l-size">38</label>
                                </div>
                                <div class="sc-item disable">
                                    <input type="radio" name="sc" id="xl-size" disabled>
                                    <label for="xl-size">40</label>
                                </div>
                                <div class="sc-item">
                                    <input type="radio" name="sc" id="xxl-size">
                                    <label for="xxl-size">42</label>
                                </div>
                            </div>
                            <div class="quantity">
                                <p>Cantidad</p>
                                <div class="pro-qty">
                                    <input type="text" value="1">
                                </div>
                            </div>
                            <div class="d-flex justify-content-center m-2 p-1">
                                    <button class="btn-upload" @click="showConfirmacion()"> Enviar Pedido</button>

                            </div>
                    </div>
                </div>
            <!-- end section disenar --->
            <!-- Modal VistaPrevia -->
            <div class="modal fade" id="ModalCambioArticulo">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title pull-left"><strong>Cambio de Articulo</strong></h5>
                            <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                        </div>
                        <div class="modal-body">

                            <div class="d-flex justify-content-center pt-3 text-center"><h5>¿Esta Seguro que desea cambiar el articulo? Los cambios realizados serán borrados.</h5></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-upload pull-right" style="background: grey !important" data-dismiss="modal" >No</button>
                            <button type="submit" class="btn btn-upload pull-right" data-dismiss="modal" @click="setId()">Si</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal VistaPrevia -->
                <div class="modal fade" id="ModalVistaPrevia">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title pull-left"><strong>Vista previa del Diseño</strong></h5>
                                <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                            </div>
                            <div class="modal-body">
                                <div  class="container-imagen-a-disenar"  id="contenedor-preview-frontal" v-show="showFrontal">
                                <img style="width: -webkit-fill-available" :src="getUrl+imgFrontal">
                                    <div class="container-area-de-diseno" style="border:0px !important" :style="'width:'+w_result_preview+'px;'+'top:'+top_result_preview+'%;'+'height:'+h_result_preview+'px;'+'left:'+left_result_preview+'%;'">
                                        <img :style="'width:'+width_preview+'%;'+'top:'+top_preview+'%;'+'height:'+height_preview+'%;'+'left:'+left_preview+'%;'+'position:absolute'" class="img-fluid"   v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="getUrl+newImagenUrl">
                                    </div>
                                </div>
                                <div class="container-imagen-a-disenar-rv"  id="contenedor-preview-reverso" v-show="showReverse">
                                <img style="width: -webkit-fill-available;" :src="getUrl+imgReverso">
                                    <div class="container-area-de-diseno-rv" style="border:0px !important" :style="'width:'+w_result_preview_rv+'px;'+'top:'+top_result_preview_rv+'%;'+'height:'+h_result_preview_rv+'px;'+'left:'+left_result_preview_rv+'%;'">
                                        <img :style="'width:'+width_preview_rv+'%;'+'top:'+top_preview_rv+'%;'+'height:'+height_preview_rv+'%;'+'left:'+left_preview_rv+'%;'+'position:absolute'" class="img-fluid"  v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="getUrl+newImagenUrlRV">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-sm pull-right" data-dismiss="modal" >Volver</button>
                            <!--   <button type="submit" class="btn btn-sm pull-right">Guardar</button> -->
                            </div>
                        </div>
                    </div>
                </div>
        <!-- Modal Confirmacion -->
                    <div class="modal fade" id="ModalConfirmacion">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title pull-left"><strong>Confirmacion del Pedido</strong></h5>
                                    <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                                </div>
                                <div class="d-flex justify-content-center pt-3 text-center"><h5>Por favor revise su pedido, ya que una vez enviado este no podrá ser modificado.</h5></div>
                                <div class="modal-body d-flex" id="disenosDelUsuario">
                                    <div  class="container-imagen-confirmacion" id="contenedor-confirmacion-frontal">
                                    <img style="width: -webkit-fill-available;" :src="getUrl+imgFrontal">
                                        <div class="container-area-de-diseno" style="border:0px !important" :style="'width:'+w_result_confirmacion+'px;'+'top:'+top_result_confirmacion+'%;'+'height:'+h_result_confirmacion+'px;'+'left:'+left_result_confirmacion+'%;'">
                                            <img :style="'width:'+width_confirmacion+'%;'+'top:'+top_confirmacion+'%;'+'height:'+height_confirmacion+'%;'+'left:'+left_confirmacion+'%;'+'position:absolute'" class="img-fluid"   v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="getUrl+newImagenUrl">
                                        </div>
                                    </div>
                                    <div class="container-imagen-confirmacion-rv" id="contenedor-confirmacion-reverso">
                                    <img style="width: -webkit-fill-available;" :src="getUrl+imgReverso">
                                        <div class="container-area-de-diseno-rv" style="border:0px !important" :style="'width:'+w_result_confirmacion_rv+'px;'+'top:'+top_result_confirmacion_rv+'%;'+'height:'+h_result_confirmacion_rv+'px;'+'left:'+left_result_confirmacion_rv+'%;'">
                                            <img :style="'width:'+width_confirmacion_rv+'%;'+'top:'+top_confirmacion_rv+'%;'+'height:'+height_confirmacion_rv+'%;'+'left:'+left_confirmacion_rv+'%;'+'position:absolute'" class="img-fluid"  v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="getUrl+newImagenUrlRV">
                                        </div>
                                    </div>
                                </div>
                                <div class="container-fluid" style="width:95% !important">
                                        <h4>Remera Deportiva Roja</h4>
                                        <h5>$19.90</h5>
                                        <hr>
                                        <div class="d-flex justify-content-around">
                                            <p style="font-size: 20px !important"><b>Talle:</b> XL</p>
                                            <p style="font-size: 20px !important"><b>Cantidad:</b> 2</p>
                                            <p style="font-size: 20px !important"><b>Color:</b> Rojo</p>
                                        </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-upload pull-right" style="background: grey !important" data-dismiss="modal" >Volver</button>
                                    <button type="submit" class="btn btn-upload pull-right"  @click="saveDisenos()">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="container-area-de-diseno-rv" :style="'width:'+w_result_preview_rv+'px;'+'top:'+top_result_preview_rv+'%;'+'height:'+h_result_preview_rv+'px;'+'left:'+left_result_preview_rv+'%;'">
                        <p>HOLA LA IMAGEN GENERADA ES:</p>
                    <img class="img-fluid" :src="disenoFrontal64">
                    </div> -->


        </div>

        </template>

        <script>
        import migajasComponent from "../../../components/layouts/migajasComponent.vue";
        import Swatches from 'vue-swatches'
        import "vue-swatches/dist/vue-swatches.min.css"
        import VueDragResize from 'vue-drag-resize';
        import VueDragResize2 from 'vue-drag-resize';
        import html2canvas from 'html2canvas';
        import { mapGetters } from 'vuex'
        import CerService from "../../../plugins/CerService";

            export default
            {
                name:'disenarComponent',
                components:
                {
                    migajasComponent,
                    Swatches,
                    VueDragResize,
                    VueDragResize2,
                },
                computed:{
                    ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getCart','getBag','getUrl']),
                },
                created(){
                    this.articuloId=this.$route.params.id,
                    this.articulos_info()
                    this.articulo_actual()

                },
                mounted(){
                this.dimensionesFrontal()
                this.dimensionesReverso()
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesFrontal();
                    });
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesReverso();
                    });
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesPreviewFrontal();
                    });
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesPreviewReverso();
                    });
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesConfirmacionFrontal();
                    });
                    $(window).resize(event => {
                        event.preventDefault();
                        this.dimensionesConfirmacionReverso();
                    });
                },

                data() {
                    return {

                        tempId:'',
                        articuloId: '',
                        output: null,
                        imagenes_predisenadas:['img/predisenadas/1.jpg', 'img/predisenadas/2.png', 'img/predisenadas/3.jpg', 'img/predisenadas/6.jpg', 'img/predisenadas/7.png', 'img/predisenadas/8.png', 'img/predisenadas/9.png', 'img/predisenadas/10.png', 'img/predisenadas/11.png', 'img/predisenadas/12.png', 'img/predisenadas/13.png', 'img/predisenadas/4.jpg', 'img/predisenadas/5.png', 'img/predisenadas/14.png'],
                        imagenes_productos2:['img/product/1.jpg','img/product/2.jpg','img/product/3.jpg','img/product/4.jpg','img/product/5.jpg','img/product/6.jpg','img/product/7.jpg','img/product/8.jpg','img/product/10.jpg', 'img/product/11.jpg', 'img/product/12.jpg'],
                        articulos:[{
                            id:'',
                            nombre:'',
                            cantidad:'',
                            principal:'',
                            tallesColores:{
                                talle_id:'',
                                color_id:'',
                                cantidad:'',
                                precio:'',
                            },
                            imagenesarticulos:[{
                            url:'',
                            id:'',
                            articulo_id:'',
                            coordenada_id:'',
                            caracteristica_id:'', //color
                            posicion:'', //Forntal o reverso
                            principal:'',
                            }]
                        }],
                        /*Variables para el componente del Frente*/
                        width: 30, //variable del componente
                        height: 30, //variable del componente
                        top: 0, //variable del componente
                        left: 0, //variable del componente
                        /* Variables para definir el contenedor frontal*/
                        top_px:95,//top en px que definio el admin
                        left_px:150,//left en px que definio el admin
                        w_admin:200, //width del area de diseno q definio el admin
                        h_admin:200, //height del area de diseno q definio el admin
                        w_content_admin: 500, //width del container donde diseno el admin
                        h_content_admin: 500, //height del container donde diseno el admin
                        top_result:0,
                        left_result:0,
                        w_content_actual: 0, //width del container a usar
                        h_content_actual: 0, //height del container a usar
                        w_content_actual_int: 0, //width del container a usar
                        h_content_actual_int: 0, //height del container a usar
                        w_result:0, //width final que tendra el area de diseno
                        h_result:0, //width final que tendra el area de diseno
                        newImagenUrl: '',
                        newImagen: '',
                        isActive: true,


                /* Variables para definir el contenedor Reverso*/
                        top_px_rv:95,//top en px que definio el admin
                        left_px_rv:170,//left en px que definio el admin
                        w_admin_rv:150, //width del area de diseno q definio el admin
                        h_admin_rv:300, //height del area de diseno q definio el admin
                        w_content_admin_rv: 500, //width del container donde diseno el admin
                        h_content_admin_rv: 500, //height del container donde diseno el admin
                        top_result_rv:0,
                        left_result_rv:0,
                        w_content_actual_rv: 0, //width del container a usar
                        h_content_actual_rv: 0, //height del container a usar
                        w_content_actual_int_rv: 0, //width del container a usar
                        h_content_actual_int_rv: 0, //height del container a usar
                        w_result_rv:0, //width final que tendra el area de diseno
                        h_result_rv:0, //width final que tendra el area de diseno
                        widthrv: 30, //variable  del componente (width inicial)
                        heightrv: 30, //variable del componente (height inicial)
                        toprv: 0, //variable del componente
                        leftrv: 0, //variable del componente
                        /*(w_admin * w_content_actual)/w_content_admin */
                        /*Variables para el contenedor de la vista previa frontal*/
                        w_content_preview: 0,
                        h_content_preview: 0,
                        w_content_preview_int:0,
                        h_content_preview_int: 0,
                        h_result_preview:0,
                        w_result_preview:0,
                        top_result_preview:0,
                        left_result_preview:0,
                        top_preview:0, //top de la imagen
                        left_preview:0, //left de la imagen
                        width_preview:0,
                        height_preview:0,
                        /*Variables para el contenedor de la vista previa reverso*/
                        w_content_preview_rv: 0,
                        h_content_preview_rv: 0,
                        w_content_preview_rv_int:0,
                        h_content_preview_rv_int: 0,
                        h_result_preview_rv:0,
                        w_result_preview_rv:0,
                        top_result_preview_rv:0,
                        left_result_preview_rv:0,
                        top_preview_rv:0, //top de la imagen
                        left_preview_rv:0, //left de la imagen
                        width_preview_rv:0,
                        height_preview_rv:0,
                        previewImage:null,
                        /*Variables para el contenedor de la vista de confirmacion frontal*/
                        w_content_preview: 0,
                        h_content_preview: 0,
                        w_content_preview_int:0,
                        h_content_preview_int: 0,
                        h_result_preview:0,
                        w_result_preview:0,
                        top_result_preview:0,
                        left_result_preview:0,
                        top_preview:0, //top de la imagen
                        left_preview:0, //left de la imagen
                        width_preview:0,
                        height_preview:0,
                        /*Variables de componentes globales*/
                        isLoading: false,
                        isDesign: false,
                        numCart: 0,
                        numBag: 0,
                        isAuth: false,
                        search: '',
                        rubro: '',
                        /*Variables del selector de colores*/
                        color: '#1CA085',
                        colors: ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5', ''],
                        //Productos
                        showProductsOut:false,
                        showProducts: true,
                        activo:'Productos',
                        //Imagen
                        showImageOut: true,
                        showImage: false,
                        //Imagen
                        showInfoOut: true,
                        showInfo: false,
                        //Frontal y Reverso
                        activofb:'Frontal',
                        showFrontalOut: true,
                        showFrontal: true,
                        showReverse: false,
                        showReverseOut: true,
                        showImageReverse: false,
                        showImageReverseOut: true,
                        imgReverso: '',
                        imgFrontal: '',
                        newImagenUrlRV: '',
                        newImagenRV:'' ,
                        //Borrar
                        color_btn_borde: '#ddd',
                        isActiverv: true,
                        w_result_container: 0,
                        h_result_container: 0,
                        w_result_container_rv: 0,
                        h_result_container_rv: 0,
                        //guardar imagen
                        disenoFrontal:'',
                        disenoFrontal64:'',
                        disenoReverso64:'',
                        disenoReverso:'',
                        disenoUsuario64:'',
                        disenoUsuario:'',
                        /*Variables para el contenedor de la vista de confirmacion frontal*/
                        w_content_confirmacion: 0,
                        h_content_confirmacion: 0,
                        w_content_confirmacion_int:0,
                        h_content_confirmacion_int: 0,
                        h_result_confirmacion:0,
                        w_result_confirmacion:0,
                        top_result_confirmacion:0,
                        left_result_confirmacion:0,
                        top_confirmacion:0, //top de la imagen
                        left_confirmacion:0, //left de la imagen
                        width_confirmacion:0,
                        height_confirmacion:0,
                        /*Variables para el contenedor de la confirmacion reverso*/
                        w_content_confirmacion_rv: 0,
                        h_content_confirmacion_rv: 0,
                        w_content_confirmacion_rv_int:0,
                        h_content_confirmacion_rv_int: 0,
                        h_result_confirmacion_rv:0,
                        w_result_confirmacion_rv:0,
                        top_result_confirmacion_rv:0,
                        left_result_confirmacion_rv:0,
                        top_confirmacion_rv:0, //top de la imagen
                        left_confirmacion_rv:0, //left de la imagen
                        width_confirmacion_rv:0,
                        height_confirmacion_rv:0,
                        articulos:'',



                    }
                },

                methods:
                {
                    setId(){
                        this.articuloId=this.tempId
                        this.$router.push({ name: 'disenar', params: { id: this.articuloId } })
                       this.articulo_actual()

                    },
                    articulo_actual(){
                        setTimeout(e =>{
                            this.articulos.forEach(function(articulo, indexi)
                            {
                                //Buscando la Imagen a disenar del articulo seleccionado
                                articulo.imagenesarticulos.forEach(function(imagenarticulo, indexj)
                                {
                                    if(imagenarticulo.articulo_id==this.articuloId){

                                        if(imagenarticulo.posicion=='frontal'){
                                        this.imgFrontal=imagenarticulo.url
                                        }
                                        else{
                                        this.imgReverso=imagenarticulo.url
                                        }
                                    }
                                },this);
                            },this);
                        },1500)
                    },

                    articulos_info(){
                        console.log('ID info:',this.articuloId)
                        CerService.post("/articulos/disenables/todos")
                        .then(response => {
                            if(response.articulos_d)
                            {
                                this.articulos = response.articulos_d;
                                console.log(this.articulos)
                            }
                        })
                        .catch(error => {
                            this.mensaje("error","Ha ocurrido un error inesperado");
                        });
                        //console.log('HOLA Articulos es aqui:', this.articulos)
                    console.log('ArticuloID:',  this.articuloId)
                    },
                    //return a promise that resolves with a File instance
                    dataURLtoFile(imagen, filename) {

                        console.log('FILENAME es:', filename)
                        console.log('IMAGEN ES:', imagen)
                            var arr = imagen.split(','),
                            mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);
                            while(n--){
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            return new File([u8arr], filename, {type:mime});
                    },

                    saveDisenos(){
                    //Diseño del Usuario
                        html2canvas(document.querySelector("#disenosDelUsuario")).then(canvas => {
                        this.disenoUsuario64= canvas.toDataURL("image/png").replace("image/png, image/octet-stream");
                        })
                        setTimeout(e =>{
                            this.disenoUsuario = this.dataURLtoFile(this.disenoUsuario64, 'ili.png');
                        },5000)

                    /*    //Diseño Frontal
                        html2canvas(document.querySelector("#contenedor-confirmacion-frontal")).then(canvas => {
                        this.disenoFrontal64= canvas.toDataURL("image/png").replace("image/png, image/octet-stream");
                        })
                        //Diseño reverso
                    html2canvas(document.querySelector("#contenedor-confirmacion-reverso")).then(canvas2 => {
                        this.disenoReverso64= canvas2.toDataURL("image/png").replace("image/png, image/octet-stream");
                        })
                        setTimeout(e =>{
                            this.disenoFrontal = this.dataURLtoFile(this.disenoFrontal64, 'ili.png');
                            this.disenoReverso = this.dataURLtoFile(this.disenoReverso64, 'ilia.png');
                            console.log('de vuelta:', this.disenoFrontal);
                        },4000) */
                    },


                    /*Metodos del componente DragResize*/
                    resize(newRect) {
                        this.width = newRect.width;
                        this.height = newRect.height;
                        this.top = newRect.top;
                        this.left = newRect.left;
                    },
                    onActivated(event){
                        this.isActive=true

                    },
                    onDeactivated(event){
                        this.isActive=false
                    },
                    resizeRV(event) {
                        this.widthrv = event.width;
                        this.heightrv = event.height;
                        this.toprv = event.top;
                        this.leftrv = event.left;

                    },
                    onActivatedRV(event){

                        this.isActiverv=true

                    },
                    onDeactivatedRV(event){
                        this.isActiverv=false
                    },
                    dimensionesFrontal(){
                        setTimeout(e =>{
                        /*Calculo del width y heigh del area de diseno dinamicamente*/
                            this.w_content_actual=$('#contenedor-frontal').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                            this.h_content_actual=$('#contenedor-frontal').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                            let w=this.w_content_actual.split('%')[0] //le quito la palabra %
                            let h=this.h_content_actual.split('%')[0] //le quito la palabra %
                            this.w_content_actual_int=parseFloat(w) //lo convierto de cadena a float
                            this.h_content_actual_int=parseFloat(h) //lo convierto de cadena a float
                            this.h_result=(this.h_admin * this.h_content_actual_int/this.h_content_admin)//nuevo height
                            this.w_result=(this.w_admin * this.w_content_actual_int/this.w_content_admin)//nuevo width
                            this.top_result=(this.top_px*100/this.h_content_admin)//nuevo top
                            this.left_result=(this.left_px*100/this.w_content_admin)//nuevo left
                            this.w_result_container= this.w_result+5
                            this.h_result_container= this.h_result+5

                        },1200)
                    },
                    dimensionesReverso(){
                        setTimeout(e =>{
                        /*Calculo del width y heigh del area de diseno dinamicamente*/
                        this.w_content_actual_rv=$('#contenedor-reverso').css('width')//width del contenedor donde va la imagen del producto
                        this.h_content_actual_rv=$('#contenedor-reverso').css('height') //height del contenedor principal (donde va la imagen del producto)
                        let w_rv=this.w_content_actual_rv.split('%')[0] //quito la palabra %
                        let h_rv=this.h_content_actual_rv.split('%')[0] //quito la palabra %
                        this.w_content_actual_int_rv=parseFloat(w_rv) //convierto de cadena a float
                        this.h_content_actual_int_rv=parseFloat(h_rv) //convierto de cadena a float
                        this.h_result_rv=(this.h_admin_rv * this.h_content_actual_int_rv/this.h_content_admin_rv)//nuevo height
                        this.w_result_rv=(this.w_admin_rv * this.w_content_actual_int_rv/this.w_content_admin_rv) //nuevo width
                        this.top_result_rv=(this.top_px_rv*100/this.h_content_admin_rv)//nuevo top
                        this.left_result_rv=(this.left_px_rv*100/this.w_content_admin_rv) //nuevo left
                        this.w_result_container_rv= this.w_result_rv+5
                        this.h_result_container_rv= this.h_result_rv+5
            /* $('#container-area-disenorv-padre').css('width', this.w_result_rv+5) //cambio el estilo dinamicamente
            $('#container-area-disenorv-padre').css('height', this.h_result_rv+5) //cambio el estilo dinamicamente*/
            /* $('#container-area-disenorv-padre').css('top', this.top_result_rv+'%') //cambio el estilo dinamicamente
            $('#container-area-disenorv-padre').css('left', this.left_result_rv+'%') //cambio el estilo dinamicamente */
                        },1200)
                    },
                    dimensionesPreviewFrontal(){
                        setTimeout(e =>{
                            /*Calculo del width y heigh del area de diseno dinamicamente*/
                            this.w_content_preview=$('#contenedor-preview-frontal').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                            this.h_content_preview=$('#contenedor-preview-frontal').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                            let w_preview=this.w_content_preview.split('px')[0] //le quito la palabra px
                            let h_preview=this.h_content_preview.split('px')[0] //le quito la palabra px
                            this.w_content_preview_int=parseFloat(w_preview) //lo convierto de cadena a float
                            this.h_content_preview_int=parseFloat(h_preview) //lo convierto de cadena a float

                            this.h_result_preview=(this.h_admin * this.h_content_preview_int/this.h_content_admin)//nuevo height
                            this.w_result_preview=(this.w_admin * this.w_content_preview_int/this.w_content_admin)//nuevo width
                            this.top_result_preview=(this.top_px*100/this.h_content_admin)//nuevo top
                            this.left_result_preview=(this.left_px*100/this.h_content_admin)//nuevo left

                            /*Calculo del top y left de la imagen colocada por el usuario*/
                            this.width_preview=(this.width*100/this.w_result)
                            this.height_preview=(this.height*100/this.h_result)
                            this.top_preview=(this.top*100/this.h_result)
                            this.left_preview=(this.left*100/this.w_result)

                            },600)
                    },
                    dimensionesPreviewReverso(){
                        setTimeout(e =>{
                            /*Calculo del width y heigh del area de diseno dinamicamente*/
                            this.w_content_preview_rv=$('#contenedor-preview-reverso').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                            this.h_content_preview_rv=$('#contenedor-preview-reverso').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                            let w_preview_rv=this.w_content_preview_rv.split('px')[0] //le quito la palabra px
                            let h_preview_rv=this.h_content_preview_rv.split('px')[0] //le quito la palabra px
                            this.w_content_preview_rv_int=parseFloat(w_preview_rv) //lo convierto de cadena a float
                            this.h_content_preview_rv_int=parseFloat(h_preview_rv) //lo convierto de cadena a float

                            //Calculo el width y height del area punteada
                            this.h_result_preview_rv=(this.h_admin_rv * this.h_content_preview_rv_int/this.h_content_admin_rv)//nuevo height
                            this.w_result_preview_rv=(this.w_admin_rv * this.w_content_preview_rv_int/this.w_content_admin_rv)//nuevo width
                            this.top_result_preview_rv=(this.top_px_rv*100/this.h_content_admin_rv)//nuevo top
                            this.left_result_preview_rv=(this.left_px_rv*100/this.w_content_admin_rv)//nuevo left

                            /*Calculo del top y left de la imagen colocada por el usuario*/
                            this.width_preview_rv=(this.widthrv*100/this.w_result_rv)
                            this.height_preview_rv=(this.heightrv*100/this.h_result_rv)
                            this.top_preview_rv=(this.toprv*100/this.h_result_rv)
                            this.left_preview_rv=(this.leftrv*100/this.w_result_rv)

                            },600)
                    },
                    dimensionesConfirmacionFrontal(){
                        setTimeout(e =>{
                            /*Calculo del width y heigh del area de diseno dinamicamente*/
                            this.w_content_confirmacion=$('#contenedor-confirmacion-frontal').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                            this.h_content_confirmacion=$('#contenedor-confirmacion-frontal').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)

                            let w_confirmacion=this.w_content_confirmacion.split('px')[0] //le quito la palabra px
                            let h_confirmacion=this.h_content_confirmacion.split('px')[0] //le quito la palabra px
                            this.w_content_confirmacion_int=parseFloat(w_confirmacion) //lo convierto de cadena a float
                            this.h_content_confirmacion_int=parseFloat(h_confirmacion) //lo convierto de cadena a float
                        /*  console.log('HOLA ILI ESTE ES EL W:', this.w_content_confirmacion_int)
                            console.log('HOLA ILI ESTE ES EL H:', this.h_content_confirmacion_int) */
                            //Calculo el width y height del area punteada
                            this.h_result_confirmacion=(this.h_admin * this.h_content_confirmacion_int/this.h_content_admin)//nuevo height
                            this.w_result_confirmacion=(this.w_admin * this.w_content_confirmacion_int/this.w_content_admin)//nuevo width
                            this.top_result_confirmacion=(this.top_px*100/this.h_content_admin)//nuevo top
                            this.left_result_confirmacion=(this.left_px*100/this.h_content_admin)//nuevo left

                            /*Calculo del top y left de la imagen colocada por el usuario*/
                            this.width_confirmacion=(this.width*100/this.w_result)
                            this.height_confirmacion=(this.height*100/this.h_result)
                            this.top_confirmacion=(this.top*100/this.h_result)
                            this.left_confirmacion=(this.left*100/this.w_result)

                            },600)
                    },
                    dimensionesConfirmacionReverso(){
                        setTimeout(e =>{
                            /*Calculo del width y heigh del area de diseno dinamicamente*/
                            this.w_content_confirmacion_rv=$('#contenedor-confirmacion-reverso').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                            this.h_content_confirmacion_rv=$('#contenedor-confirmacion-reverso').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                            let w_confirmacion_rv=this.w_content_confirmacion_rv.split('px')[0] //le quito la palabra px
                            let h_confirmacion_rv=this.h_content_confirmacion_rv.split('px')[0] //le quito la palabra px
                            this.w_content_confirmacion_rv_int=parseFloat(w_confirmacion_rv) //lo convierto de cadena a float
                            this.h_content_confirmacion_rv_int=parseFloat(h_confirmacion_rv) //lo convierto de cadena a float

                            //Calculo el width y height del area punteada
                            this.h_result_confirmacion_rv=(this.h_admin_rv * this.h_content_confirmacion_rv_int/this.h_content_admin_rv)//nuevo height
                            this.w_result_confirmacion_rv=(this.w_admin_rv * this.w_content_confirmacion_rv_int/this.w_content_admin_rv)//nuevo width
                            this.top_result_confirmacion_rv=(this.top_px_rv*100/this.h_content_admin_rv)//nuevo top
                            this.left_result_confirmacion_rv=(this.left_px_rv*100/this.w_content_admin_rv)//nuevo left

                            /*Calculo del top y left de la imagen colocada por el usuario*/
                            this.width_confirmacion_rv=(this.widthrv*100/this.w_result_rv)
                            this.height_confirmacion_rv=(this.heightrv*100/this.h_result_rv)
                            this.top_confirmacion_rv=(this.toprv*100/this.h_result_rv)
                            this.left_confirmacion_rv=(this.leftrv*100/this.w_result_rv)

                            },600)
                    },
                    /*Modal de cambio de Articulo*/
                    showCambioArticulo(id)
                    {
                        this.tempId=id
                        $('#ModalCambioArticulo').modal('show');
                    },
                    /*Modal de vista previa*/
                    showVistaPrevia()
                    {

                        $('#ModalVistaPrevia').modal('show');
                        this.dimensionesPreviewFrontal()
                        this.dimensionesPreviewReverso()
                    },
                    /*Modal de vista previa*/
                    showConfirmacion()
                    {
                        $('#ModalConfirmacion').modal('show');
                        this.dimensionesConfirmacionFrontal()
                        this.dimensionesConfirmacionReverso()
                    },
                    /*Metodos para la carga de Archivos*/
                    openInputFile () {
                    let elem = this.$refs.imagenInput
                    elem.click()
                    },
                    AdjuntarImagenFrontal (event) {
                    if (event.target.files[0].size / (1024*3) <= (1024*3) && event.target.files[0].type.split('/')[0] === 'image') {
                        this.newImagen = event.target.files[0]
                        var reader = new FileReader()
                        reader.readAsDataURL(event.target.files[0])
                        reader.onload = function () {
                        this.newImagenUrl = reader.result
                        }.bind(this)
                        reader.onerror = function (error) {
                        }
                    } else {
                        toastr.error('Error. La imagen supera los 3 Mb.')
                    }
                    },
                    AdjuntarImagenReverso (event) {
                    if (event.target.files[0].size / (1024*3) <= (1024*3) && event.target.files[0].type.split('/')[0] === 'image') {
                        this.newImagenRV = event.target.files[0]
                        var reader = new FileReader()
                        reader.readAsDataURL(event.target.files[0])
                        reader.onload = function () {
                        this.newImagenUrlRV = reader.result
                        }.bind(this)
                        reader.onerror = function (error) {
                        }
                    } else {
                        toastr.error('Error. La imagen supera los 3 Mb.')
                    }
                    },
                    imagenPredisenadaFrontal(imagen){
                        this.newImagenUrl=imagen
                    },
                    imagenPredisenadaReverso(imagen){
                        this.newImagenUrlRV=imagen
                    },
                    /*Metodos para el cambio de pestanas*/
                    showFrontalPanel(activo) {
                        if (this.showFrontal) {
                            this.showFrontalOut = false;
                            this.showFrontal = true;
                            this.showReverseOut = true;
                            this.showReverse = false;
                            this.activofb = activo;


                        } else {
                            this.showFrontalOut = false;
                            this.showFrontal = true;
                            this.showReverseOut = true;
                            this.showReverse = false;
                            this.activofb = activo;
                        }

                    },
                    showReversePanel(activo) {
                        if (this.showReverse) {
                            this.showFrontalOut = true;
                            this.showFrontal = false;
                            this.showReverseOut = false;
                            this.showReverse = true;
                            this.activofb = activo;

                        } else {
                            this.showFrontalOut = true;
                            this.showFrontal = false;
                            this.showReverseOut = false;
                            this.showReverse = true;

                            this.activofb = activo;
                        }

                    },
                    showProductsPanel(activo) {
                        if (this.showProducts) {
                            this.showProductsOut = false;
                            this.showProducts = true;
                            this.showImageOut = true;
                            this.showImage = false;
                            this.activo = activo;
                            this.showInfoOut = true;
                            this.showInfo = false;


                        } else {
                            this.showProductsOut = false;
                            this.showProducts = true;
                            this.showImageOut = true;
                            this.showImage = false;
                            this.showInfoOut = true;
                            this.showInfo = false;
                            this.activo = activo;
                        }

                    },
                    showImagePanel(activo) {
                        if (this.showImage) {
                            this.showImageOut = false;
                            this.showImage = true;
                            this.showProductsOut = true;
                            this.showProducts = false;
                            this.showInfoOut = true;
                            this.showInfo = false;
                            this.activo = activo;

                        } else {
                            this.showImageOut = false;
                            this.showImage = true;
                            this.showProductsOut = true;
                            this.showProducts = false;
                            this.showInfoOut = true;
                            this.showInfo = false;
                            this.activo = activo;
                        }
                    },
                    showInfoPanel(activo) {
                        if (this.showInfo) {
                            this.showInfoOut = false;
                            this.showInfo = true;
                            this.showImageOut = true;
                            this.showImage = false;
                            this.showProductsOut = true;
                            this.showProducts = false;
                            this.activo = activo;
                        } else {
                            this.showInfoOut = false;
                            this.showInfo = true;
                            this.showImageOut = true;
                            this.showImage = false;
                            this.showProductsOut = true;
                            this.showProducts = false;
                            this.activo = activo;
                        }
                    },


                },
            }
        </script>