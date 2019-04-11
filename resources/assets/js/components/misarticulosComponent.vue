<template>
	<div id="articuloC" >
        <div class="row">
            <template v-for="articulo in articulos">
                <articulo-component :title="articulo.nombre" :price="articulo.precio" :image="articulo.image"></articulo-component>
            </template>
            <div class="text-center w-100 pt-3">
                <button class="site-btn sb-line sb-dark">VER MÁS...</button>
            </div>
        </div>
    </div>
</template>

<script>
	import articuloComponent from "../components/articuloComponent.vue";

    export default
    {
        name:'misarticulosComponent',
        components:
        {
		    articuloComponent
		},
        data()
        {
            return {
            articulos:
            [
                {
                    "id": 1,
                    "nombre": 'Black and White Stripes Dress',
                    "precio": '35.00',
                    "image":'/img/product/1.jpg'
                },
                {
                    "id": 2,
                    "nombre": 'Flamboyant Pink Top',
                    "precio": '30.50',
                    "image":'/img/product/2.jpg'
                },
                {
                    "id": 3,
                    "nombre": 'Black and White Stripes Dress',
                    "precio": '60.50',
                    "image":'/img/product/3.jpg'
                },
                {
                    "id": 4,
                    "nombre": 'Flamboyant Pink Top',
                    "precio": '60.50',
                    "image":'/img/product/4.jpg'
                },
                {
                    "id": 5,
                    "nombre": 'Black and White Stripes Dress',
                    "precio": '10.50',
                    "image":'/img/product/5.jpg'
                },
                {
                    "id": 6,
                    "nombre": 'Flamboyant Pink Top',
                    "precio": '60.50',
                    "image":'/img/product/6.jpg'
                },
                {
                    "id": 7,
                    "nombre": 'Black and White Stripes',
                    "precio": '20.50',
                    "image":'/img/product/7.jpg'
                },
                {
                    "id": 8,
                    "nombre": 'Flamboyant Pink Top',
                    "precio": '60.50',
                    "image":'/img/product/8.jpg'
                },
                {
                    "id": 9,
                    "nombre": 'Black and White Stripes Dress',
                    "precio": '30.50',
                    "image":'/img/product/9.jpg'
                }
            ]
            }
        },
        mounted()
        {

        }
    }
</script>
