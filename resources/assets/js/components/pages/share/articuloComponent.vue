<template>

    <div class="col-lg-4 col-sm-6">
    	<div class="product-item">
    		<div class="pi-pic">
                <!---->
    			<!--<div class="tag-sale">ON SALE</div>---><!--Fue comentado por si llegara a utilizar-->
    			<img :src="url+image" alt="">
    			<div class="pi-links">
                    <a  v-if="isDesign" class="add-card"><i class="fa fa-shopping-bag"></i><span>Agregar a la Cesta</span></a>
                    <a  v-else class="add-card"><i class="fa fa-shopping-cart"></i><span>Agregar al carrito</span></a>
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
    export default {
        name:'articuloComponent',
        props:
        {
            url:
            {
                type: String,
                require:true
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
            },
            isDesign:
            {
                type: Boolean,
                require:true
            }
        },
        mounted()
        {

        },
        methods:
        {
            formatearmoneda(monto)
            {
                return monto.toFixed(2);
            }
        }
    }
</script>
