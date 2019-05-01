<template>
<div>

    <!-- title --->
    <migajas-component titulo="Diseñar > Personalizar"></migajas-component>

    <!-- end title --->
    <!-- section disenar --->
    <div class="container mt-5 d-flex flex-wrap justify-content-center">
    <!-- Lado 1 --->
    <div class="panel-diseno-l1 justify-content-center">
        <!-- Header Lado 1 --->
        <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
            <div class="panel-btn d-flex" :class="[{'panel-btn-active pulse animated': activo === 'Productos'}]" @click="showProductsPanel('Productos')"> <i class="fa fa-check-circle-o">&nbsp;</i>
            <div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Productos</div>
            </div>

            <div class="panel-btn d-flex" :class="[{'panel-btn-active pulse animated': activo === 'Imagen'}]" @click="showImagePanel('Imagen')"> <i class="fa fa-file-image-o">&nbsp;</i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Imágen</div></div>

            <div class="panel-btn d-flex":class="[{'panel-btn-active pulse animated': activo === 'Info'}]" @click="showInfoPanel('Info')"> <i class="fa fa-info-circle">&nbsp;</i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">Instrucciones</div></div>
        </div>
        <!--Contenedor del Lado 1 -->
        <div class="container-disenar justify-content-center d-flex flex-wrap scroll-barna" >
                <!--Contenedor Productos del Lado 1 -->
                <div class="justify-content-center d-flex flex-wrap" v-if="showProducts">
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
                                </div>
                                <div class="pd-text"><p>Blusa jackets </p>
                                </div>
                            </div>
                        </div>
                        <div class="productos-disenar">
                            <div class="product-item">
                                <div class="pi-pic"><img src="http://localhost:8000/img/product/12.jpg" alt="">
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
                    <img class="img-fluid py-2" v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="newImagenUrl" width="100" height="100">
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
                                    <div class="pi-pic"><img  @click="imagenPredisenadaFrontal(imagen)" style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" :src="imagen" alt="">
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
                    <img class="img-fluid py-2" v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="newImagenUrlRV" width="100" height="100">
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
                                    <div class="pi-pic"><img  @click="imagenPredisenadaReverso(imagen)" style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" :src="imagen" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Contenedor Info del Lado 1 -->
                <div v-else-if="showInfo">
                        HOLA INFO
                </div>
        </div>
        <!--Fin contenedor lado 1 -->
    </div>
    <!-- Lado 2 --->
    <div class="panel-diseno-l2 justify-content-center">
        <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
            <div class="panel-btn d-flex"  @click=showVistaPrevia> <i class="fa fa-eye"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Vista previa</div></div>
            <div class="d-flex align-items-center panel-btn letras-panel" :class="[{'panel-btn-active pulse animated': activofb === 'Frontal'}]" @click="showFrontalPanel('Frontal')">Frontal</div>

            <div class="d-flex align-items-center panel-btn letras-panel" :class="[{'panel-btn-active pulse animated': activofb === 'Reverso'}]" @click="showReversePanel('Reverso')">Reverso</div>
    <!--   <div class="quantity"><div class="pro-qty mb-1"><input class="pb-1" type="text" value="2"></div></div> -->
            <div class="align-items-center d-flex form__field">
                <div class="align-items-center d-flex">Color:</div><swatches  :swatch-style="{width: '22px', height: '22px'}" :trigger-style="{width: '22px', height: '22px', marginTop:'20%'}" v-model="color" :colors="colors" row-length="4" shapes="circles"
                show-border popover-to="left"></swatches>
            </div>
        </div>
        <div class="container-imagen-a-disenar" id="contenedor" v-show="showFrontal">
           <img style="width: -webkit-fill-available;" src="http://localhost:8000/img/product/frontal.png">
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
                    :w="50"
                    :h="50"
                    :x="0"
                    :y="0"
                    >
                        <img style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="newImagenUrl">
                    </VueDragResize>
            </div>
          <!--   <p>Frente:Top:{{top}} Left:{{left}}</p>
            <p>Frente:Width:{{width}} Height:{{height}}</p>
            <p>Reverso:Top:{{toprv}} Left:{{leftrv}}</p>
            <p>Reverso:width:{{widthrv}} heigh:{{heightrv}}</p> -->
        </div>
        <div class="container-imagen-a-disenar-rv" id="contenedor" v-show="showReverse">
        <img style="width: -webkit-fill-available;" src="http://localhost:8000/img/product/reverso.png">
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
                    :w="50"
                    :h="50"
                    :x="0"
                    :y="0">
                        <img style="width: -webkit-fill-available; height: -webkit-fill-available;" class="img-fluid" v-if="newImagenUrlRV != null && newImagenUrlRV != '' && newImagenUrlRV!='image'" :src="newImagenUrlRV">
                    </VueDragResize2>
            </div>
            <!-- <p>Frente:Top:{{top}} Left:{{left}}</p>
            <p>Frente:Width:{{width}} Height:{{height}}</p>
            <p>Reverso:Top:{{toprv}} Left:{{leftrv}}</p>
            <p>Reverso:width:{{widthrv}} heigh:{{heightrv}}</p> -->
        </div>
    </div>

    </div>
    <!-- end section disenar --->
    <!-- Modal VistaPrevia -->


        <div class="modal fade" id="ModalVistaPrevia">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title pull-left"><strong>Vista previa del Diseño</strong></h5>
                        <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="container-imagen-a-disenar">
                        <img style="width: -webkit-fill-available;" src="http://localhost:8000/img/product/frontal.png">
                            <div class="container-area-de-diseno" :style="'width:'+w_result+'px;'+'top:'+top_result+'%;'+'height:'+h_result+'px;'+'left:'+left_result+'%;'">
                                <img :style="'width:'+width+'px;'+'top:'+top+'%;'+'height:'+height+'px;'+'left:'+left+'%;'+'position:absolute'" class="img-fluid"   v-if="newImagenUrl != null && newImagenUrl != '' && newImagenUrl!='image'" :src="newImagenUrl">
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm pull-right" data-dismiss="modal" >Volver</button>
                          <!--   <button type="submit" class="btn btn-sm pull-right">Guardar</button> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

</div>

</template>

<script>
import migajasComponent from "../../../components/layouts/migajasComponent.vue";
import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"
import VueDragResize from 'vue-drag-resize';
import VueDragResize2 from 'vue-drag-resize';

    export default
    {
        name:'disenarComponent',
        components:
        {
            migajasComponent,
            Swatches,

            VueDragResize,
            VueDragResize2

        },
        mounted(){
           this.dimensionesFrontal()
            $(window).resize(event => {
                event.preventDefault();
                this.dimensionesFrontal();
            });
            this.dimensionesReverso()
            $(window).resize(event => {
                event.preventDefault();
                this.dimensionesReverso();
            });
        },

        data() {
            return {

                imagenes_predisenadas:['img/predisenadas/1.jpg', 'http://localhost:8000/img/predisenadas/2.png', 'http://localhost:8000/img/predisenadas/3.jpg', 'http://localhost:8000/img/predisenadas/6.jpg', 'http://localhost:8000/img/predisenadas/7.png', 'http://localhost:8000/img/predisenadas/8.png', 'http://localhost:8000/img/predisenadas/9.png', 'http://localhost:8000/img/predisenadas/10.png', 'http://localhost:8000/img/predisenadas/11.png', 'http://localhost:8000/img/predisenadas/12.png', 'http://localhost:8000/img/predisenadas/13.png', 'http://localhost:8000/img/predisenadas/4.jpg', 'http://localhost:8000/img/predisenadas/5.png', 'http://localhost:8000/img/predisenadas/14.png'],
                /*Variables para el componente del Frente*/
                width: 0, //variable del componente
                height: 0, //variable del componente
                top: 0, //variable del componente
                left: 0, //variable del componente
                /* Variables para definir el contenedor frontal*/
                top_px:95,//top en px que definio el admin
                left_px:150,//left en px que definio el admin
                top_result:0,
                left_result:0,
                w_content_actual: 0, //width del container a usar
                h_content_actual: 0, //height del container a usar
                w_content_admin: 500, //width del container donde diseno el admin
                h_content_admin: 500, //height del container donde diseno el admin
                w_admin:200, //width del area de diseno q definio el admin
                h_admin:200, //height del area de diseno q definio el admin
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
                top_result_rv:0,
                left_result_rv:0,
                w_content_actual_rv: 0, //width del container a usar
                h_content_actual_rv: 0, //height del container a usar
                w_content_admin_rv: 500, //width del container donde diseno el admin
                h_content_admin_rv: 500, //height del container donde diseno el admin
                w_admin_rv:150, //width del area de diseno q definio el admin
                h_admin_rv:300, //height del area de diseno q definio el admin
                w_content_actual_int_rv: 0, //width del container a usar
                h_content_actual_int_rv: 0, //height del container a usar
                w_result_rv:0, //width final que tendra el area de diseno
                h_result_rv:0, //width final que tendra el area de diseno
                widthrv: 0, //variable del componente
                heightrv: 0, //variable del componente
                toprv: 0, //variable del componente
                leftrv: 0, //variable del componente
                /*(w_admin * w_content_actual)/w_content_admin */
                previewImage:null,
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
                newImagenUrlRV: '',
                newImagenRV:'' ,
                //Borrar
                color_btn_borde: '#ddd',
                isActiverv: true,
                w_result_container: 0,
                h_result_container: 0,
                w_result_container_rv: 0,
                h_result_container_rv: 0,

            }
        },

        methods:
        {
            /*Metodos del componente DragResize*/
            resize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            },
            onActivated(event){
                this.isActive=true
                //this.$store.dispatch('rect/setActive', {id: index});

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
                    this.w_content_actual=$('#contenedor').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                    this.h_content_actual=$('#contenedor').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                    let w=this.w_content_actual.split('px')[0] //le quito la palabra px
                    let h=this.h_content_actual.split('px')[0] //le quito la palabra px
                    this.w_content_actual_int=parseFloat(w) //lo convierto de cadena a float
                    this.h_content_actual_int=parseFloat(h) //lo convierto de cadena a float
                    this.h_result=(this.h_admin * this.h_content_actual_int/this.h_content_admin)//calculo el nuevo height
                    this.w_result=(this.w_admin * this.w_content_actual_int/this.w_content_admin)//calculo el nuevo width
               /*  $('#container-area-diseno-padre').css('width', this.w_result) //cambio el estilo dinamicamente
                $('#container-area-diseno-padre').css('height', this.h_result) //cambio el estilo dinamicamente
 */
                /*Calculo del top y left del area de diseno dinamicamente*/
                this.top_result=(this.top_px*100/this.h_content_admin)
                this.left_result=(this.left_px*100/this.h_content_admin)
                this.w_result_container= this.w_result+5
                this.h_result_container= this.h_result+5
               /*  $('#container-area-diseno-padre').css('top', this.top_result+'%') //cambio el estilo dinamicamente
                $('#container-area-diseno-padre').css('left', this.left_result+'%') //cambio el estilo dinamicamente */
                },600)
            },
            dimensionesReverso(){
                setTimeout(e =>{
                /*Calculo del width y heigh del area de diseno dinamicamente*/
                    this.w_content_actual_rv=$('#contenedor').css('width')//Calculo el width del contenedor principal (donde va la imagen del producto)
                    this.h_content_actual_rv=$('#contenedor').css('height') //Calculo el height del contenedor principal (donde va la imagen del producto)
                    let w_rv=this.w_content_actual_rv.split('px')[0] //le quito la palabra px
                    let h_rv=this.h_content_actual_rv.split('px')[0] //le quito la palabra px
                    this.w_content_actual_int_rv=parseFloat(w_rv) //lo convierto de cadena a float
                    this.h_content_actual_int_rv=parseFloat(h_rv) //lo convierto de cadena a float
                    this.h_result_rv=(this.h_admin_rv * this.h_content_actual_int_rv/this.h_content_admin_rv)//calculo el nuevo height
                    this.w_result_rv=(this.w_admin_rv * this.w_content_actual_int_rv/this.w_content_admin_rv) //calculo el nuevo width
                /* $('#container-area-disenorv-padre').css('width', this.w_result_rv+5) //cambio el estilo dinamicamente
                $('#container-area-disenorv-padre').css('height', this.h_result_rv+5) //cambio el estilo dinamicamente
 */
                /*Calculo del top y left del area de diseno dinamicamente*/
                this.top_result_rv=(this.top_px_rv*100/this.h_content_admin_rv)
                this.left_result_rv=(this.left_px_rv*100/this.h_content_admin_rv)
                this.w_result_container_rv= this.w_result_rv+5
                this.h_result_container_rv= this.h_result_rv+5
                /* $('#container-area-disenorv-padre').css('top', this.top_result_rv+'%') //cambio el estilo dinamicamente
                $('#container-area-disenorv-padre').css('left', this.left_result_rv+'%') //cambio el estilo dinamicamente */
                },600)
            },
            /*Modal de vista previa*/
            showVistaPrevia()
            {
                $('#ModalVistaPrevia').modal('show');
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