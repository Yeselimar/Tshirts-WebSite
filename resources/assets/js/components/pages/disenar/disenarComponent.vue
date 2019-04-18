<template>
<div>
    <!-- header-->
        <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM" @searchK="searchK"></header-component>
    <!--end header -->
    <!-- title --->
    <migajas-component titulo="Diseñar > Personalizar"></migajas-component>
    <!-- end title --->
    <!-- section disenar --->
    <div class="container mt-5 d-flex flex-wrap justify-content-center">
    <!-- Lado 1 --->
    <div class="panel-diseno-l1 justify-content-center">
        <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
            <div class="panel-btn d-flex"> <i class="fa fa-check-circle-o"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Producto</div></div>
            <div class="panel-btn d-flex"> <i class="fa fa-file-image-o"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Imagen</div></div>
            <div class="panel-btn d-flex"> <i class="fa fa-info-circle"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Instrucciones</div></div>
        </div>
        <div class="container-disenar justify-content-center d-flex flex-wrap scroll-barna">
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
    </div>
    <!-- Lado 2 --->
    <div class="panel-diseno-l2 justify-content-center">
        <div class="scroll-barna d-flex justify-content-center title-panel-diseno">
            <div class="panel-btn d-flex"> <i class="fa fa-eye"></i><div class="sm-none-barna align-content-center d-flex flex-wrap letras-panel">&nbsp;Vista previa</div></div>
            <div class="d-flex align-items-center panel-btn letras-panel">Frontal</div>
            <div class="d-flex align-items-center panel-btn letras-panel">Reverso</div>
    <!--   <div class="quantity"><div class="pro-qty mb-1"><input class="pb-1" type="text" value="2"></div></div> -->
            <div class="align-items-center d-flex form__field">
                <div class="align-items-center d-flex">Color:</div><swatches  :swatch-style="{width: '22px', height: '22px'}" :trigger-style="{width: '22px', height: '22px', marginTop:'20%'}" v-model="color" :colors="colors" row-length="4" shapes="circles"
                show-border popover-to="left"></swatches>
            </div>
        </div>
        <div class="container-disenar-l2">
            <div class="parent" style="background-image: url('http://localhost:8000/img/product/12.jpg');background-position: center;background-repeat: no-repeat; background-size: cover; /* Resize the background image to cover the entire container */; width:-webkit-fill-available;height:-webkit-fill-available; position:relative" >
                    <vue-draggable-resizable :resizable="true" :parent="'parent'">
                        <p>You can drag me around and resize me as you wish.</p>
                        {{url}}
                    </vue-draggable-resizable>
            </div>
        </div>

    </div>

    </div>


    <!-- end section disenar --->
</div>

</template>

<script>
import headerComponent from "../../../components/layouts/headerComponent.vue";
import migajasComponent from "../../../components/layouts/migajasComponent.vue";
import Swatches from 'vue-swatches'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
    // Import the styles too, globally
    import "vue-swatches/dist/vue-swatches.min.css"
    export default
    {
        name:'disenarComponent',
        components:
        {
            headerComponent,
            migajasComponent,
            Swatches,
            VueDraggableResizable
        },
        props:
        {
            url:{
                type:String,
                require:true
                }
        },
        data() {
            return {
                isLoading: false,
                isDesign: false,
                numCart: 0,
                numBag: 0,
                isAuth: false,
                search: '',
                rubro: '',
                color: '#1CA085',
                colors: ['#F64272', '#F6648B', '#F493A7', '#F891A6', '#FFCCD5', ''],
                width: 0,
                height: 0,
                x: 0,
                y: 0,
              
            }
        },
        methods:
        {
            loginM(e)
            {

            },
            designM(e)
            {

            },
            searchM(e)
            {

            },
            searchK(e){

            },
        },
    }
</script>