<style>
    .checkout-cart .price-list li 
    {
        font-size: 14px !important;
    }
</style>
<template>
	<div>
		
			<div class="checkout-cart">
				<h3>Mi Carrito</h3>
				<ul class="product-list">
					<template v-for="articulo in articulos">
						<li>
							<div class="pl-thumb"><img :src="getUrl+articulo.imagen" alt=""></div>
							<h6>{{articulo.nombre}}</h6>
                            <p>X {{articulo.cantidad}}</p>
							<p>${{formatearmoneda(articulo.precio)}}</p>
						</li>
					</template>
				</ul>
				<ul class="price-list">
					<li>Total<span>${{formatearmoneda(sumar(articulos))}}</span></li>
					<li>Total de Productos<span>{{totalproductos(articulos)}}</span></li>
					<li>Envío <span>Gratis</span></li>
					<li class="total">Total<span>${{formatearmoneda(sumar(articulos))}}</span></li>
				</ul>
			</div>
		
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

    export default
    {
        name:'detallescarritoComponent',
        props:
        {
        },
        data()
        {
            return {
            articulos:
            [
                {
                    "id": 1,
                    "nombre": 'Black and White Stripes Dress',
                    "cantidad": 2,
                    "precio": 25.05,
                    "imagen":'img/cart/1.jpg',
                    "isDesign": true,
                },
                {
                    "id": 2,
                    "nombre": 'Flamboyant Pink Top',
                    "cantidad": 5,
                    "precio": 30.50,
                    "imagen":'img/cart/2.jpg',
                    "isDesign": true,
                }
            ]
            }
        },
        mounted()
        {

        },
         computed: 
        {
            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getUrl']),
        },
        methods: 
        {
        	sumar(articulos)
        	{
        		var i;
        		var total = 0;
				for (i = 0; i < articulos.length; i++)
				{ 
				  	total = total + (articulos[i].cantidad*articulos[i].precio);
				}
				return total;
        	},
        	formatearmoneda(monto)
        	{
        		return monto.toFixed(2);
        	},
            totalproductos(articulos)
            {
                var i;
                var total = 0;
                for (i = 0; i < articulos.length; i++)
                { 
                    total = total + articulos[i].cantidad;
                }
                return total;
            }
        }
    }
</script>