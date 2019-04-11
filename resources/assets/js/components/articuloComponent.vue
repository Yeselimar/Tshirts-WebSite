<template>

    <div class="col-lg-4 col-sm-6">
    	<div class="product-item">
    		<div class="pi-pic">
    			<div class="tag-sale">ON SALE</div>
    			<img :src="image" alt="">
    			<div class="pi-links">
    				<a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART </span></a>
    				<a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
    			</div>
    		</div>
    		<div class="pi-text">
    			<h6>${{price}}</h6>
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
            title:
            {
	            type: String,
	            require:true
        	},
            price:
            {
                type: String,
                require:true
            },
            image:
            {
                type: String,
                require:true
            }
        },
        mounted()
        {

        }
    }
</script>
