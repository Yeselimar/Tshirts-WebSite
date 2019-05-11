<template>

    <div class="col-lg-4 col-sm-6">
    	<div class="product-item border-items">
    		<div class="pi-pic">
                <!---->
    			<!--<div class="tag-sale">ON SALE</div>---><!--Fue comentado por si llegara a utilizar-->
                <div class="box-barna">
                        <img :src="getUrl+image" alt="">
                </div>
    			<div class="pi-links">
                    <a  v-if="getIsDesign" @click="disenar(id)" class="add-card add-bag cursor">
                        <i class="fa fa-magic"></i><span>Diseñar</span>
                    </a>
                    <a  v-else class="add-card cursor" @click="verDetalle(id)" >
                        <i class="fa fa-eye"></i><span>Ver Detalle</span>
                    </a>
    			</div>
    		</div>
    		<div class="pi-text">
    			<h6>${{formatearmoneda(price)}}</h6>
    			<p>{{title}}</p>
    		</div>
    	</div>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name:'articuloComponent',
        props:
        {
            id : {
                type: Number,
                require: true
            },
            title:
            {
	            type: String,
	            require:true
        	},
            price:
            {
                type: Number,
                require:true
            },
            image:
            {
                type: String,
                require:true
            }
        },
         computed: 
        {
            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getUrl']),
        },
        mounted()
        {

        },
        methods:
        {
            disenar (idProd){
                this.$router.push({ name: 'detalleComprar', params: { id: idProd } })
            },
            verDetalle (idProd){
                this.$router.push({ name: 'detalleComprar', params: { id: idProd } })
            },
            formatearmoneda(monto)
            {
                return monto.toFixed(2);
            }
        }
    }
</script>
