<style lang="scss" scope>
    .col-center
    {
        float: none;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<template>
    <div>
        <template v-if="busqueda.length!=0">
            <div class="row">
                <template v-for="(articulo,i) in busqueda">
                    <articulo-component :title="articulo.nombre" :price="articulo.precio" :image="articulo.image" :url="url" :isDesign="articulo.isDesign"></articulo-component>
                </template>
                <div class="text-center w-100 pt-3">
                    <button class="site-btn sb-line sb-dark">VER MÁS...</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="col-lg-l2">
                 <div style="min-height: 50vh; position: relative;">
                    <div class="center-element no-found-search" >
                        <strong>No hay resultados</strong>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
	import articuloComponent from "../../../components/pages/share/articuloComponent.vue";

    export default
    {
        name:'misarticulosComponent',
        components:
        {
		    articuloComponent
		},
        props:
        {
            url:
            {
                type: String,
                require: true
            },
            rubro:
            {
                type: String,
                require: false
            },
            titulop:
            {
                type: String,
                require: false
            },
            isdesignp:
            {
                type: Boolean,
                require: false
            }
        },
        data()
        {
            return {
                titulo: this.titulop,
                isDesign: this.isdesignp,
                rubrox: this.rubro,
                articulos:
                [
                    {
                        "id": 1,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 1.00,
                        "image":'/img/product/1.jpg',
                        "isDesign": true,
                        "rubros": ["hombre","mujer","niño"],
                    },
                    {
                        "id": 2,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 2.00,
                        "image":'/img/product/2.jpg',
                        "isDesign": true,
                        "rubros": ["hombre","niño"],
                    },
                    {
                        "id": 3,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 3.00,
                        "image":'/img/product/3.jpg',
                        "isDesign": true,
                        "rubros": ["hombre"],
                    },
                    {
                        "id": 4,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 4.00,
                        "image":'/img/product/4.jpg',
                        "isDesign": true,
                        "rubros": ["mujer"],
                    },
                    {
                        "id": 5,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 5.00,
                        "image":'/img/product/5.jpg',
                        "isDesign": true,
                        "rubros": ["mujer","niña"],
                    },
                    {
                        "id": 6,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 6.00,
                        "image":'/img/product/6.jpg',
                        "isDesign": true,
                        "rubros": ["niño"],
                    },
                    {
                        "id": 7,
                        "nombre": 'Black and White Stripes',
                        "precio": 7.00,
                        "image":'/img/product/7.jpg',
                        "isDesign": true,
                        "rubros": ["niño"],
                    },
                    {
                        "id": 8,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 8.00,
                        "image":'/img/product/8.jpg',
                        "isDesign": true,
                        "rubros": ["niña"],
                    },
                    {
                        "id": 9,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 9.00,
                        "image":'/img/product/9.jpg',
                        "isDesign": true,
                        "rubros": ["hombre"],
                    }
                ]
            }
        },
        mounted()
        {
            this.isDesign = this.isdesignp
            this.titulo = this.titulop
            this.rubrox = this.rubro
        },
        computed: 
        {
            busqueda: function() 
            {
                let auxiliar = [];
                if(this.articulos  && this.articulos.length)
                {
                    this.articulos.forEach(function(articulo,index)
                    {
                        if( this.titulo.trim()!="" )
                        {
                            //todas las categorias y con algo en el buscador
                            if(this.rubrox.trim()=='')
                            {
                                if((articulo.nombre.toLowerCase().indexOf(this.titulo.toLowerCase())>=0) )
                                {
                                    auxiliar.push(articulo);
                                }
                            }
                            else
                            {
                                //selecciona una categoria y con algo en el buscador
                                if(this.buscarcategoria(articulo,this.rubrox) && (articulo.nombre.toLowerCase().indexOf(this.titulo.toLowerCase())>=0) )
                                {
                                    auxiliar.push(articulo);
                                }
                            }
                        }
                        else
                        {
                            if(this.rubrox.trim()=='')
                            {
                                //todas las categorias y sin nada en el buscador
                                auxiliar.push(articulo);
                            }
                            else
                            {
                                //selecciona una categoria y sin nada en el buscador
                                if(this.buscarcategoria(articulo,this.rubrox) )
                                {
                                    auxiliar.push(articulo);
                                }
                            }
                        }
                    },this);
                }
                //this.totalRowsMovil = auxiliar.length;
                return auxiliar;
            }
        },
        watch:
        {
            isdesignp: function()
            {
                this.isDesign = this.isdesignp
            },
            titulop: function()
            {
                this.titulo = this.titulop
            },
            rubro: function()
            {
                this.rubrox = this.rubro
            }
        },
        methods:
        {
            buscarcategoria(articulo, rubro)
            {
                //función para determinar si un artículo pertenece a una determinada categoría
                var encontrado = false;
                var i = 0;
                for (var i = 0; i < articulo.rubros.length; i++)
                {
                    if(articulo.rubros[i].toLowerCase()==rubro.toLowerCase())
                    {
                        encontrado = true;
                    }
                }
                if(encontrado)
                {
                    return true;
                }
                return false;
            }
        }
    }
</script>
