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
                    <articulo-component :title="articulo.nombre" :id="articulo.id" :price="articulo.precio" :image="articulo.image"></articulo-component>
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
    import { mapGetters } from 'vuex'

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
                titulo: this.titulop,
                isDesign: this.isdesignp,
                rubrox: this.rubro,
                articulos:
                [
                    {
                        "id": 1,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 1.00,
                        "image":'img/product/1.jpg',
                        "isDesign": false,
                        "rubros": ["hombre","mujer","niño"],
                    },
                    {
                        "id": 2,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 2.00,
                        "image":'img/product/2.jpg',
                        "isDesign": true,
                        "rubros": ["hombre","niño"],
                    },
                    {
                        "id": 3,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 3.00,
                        "image":'img/product/3.jpg',
                        "isDesign": true,
                        "rubros": ["hombre"],
                    },
                    {
                        "id": 4,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 4.00,
                        "image":'img/product/4.jpg',
                        "isDesign": true,
                        "rubros": ["mujer"],
                    },
                    {
                        "id": 5,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 5.00,
                        "image":'img/product/5.jpg',
                        "isDesign": true,
                        "rubros": ["mujer","niña"],
                    },
                    {
                        "id": 6,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 6.00,
                        "image":'img/product/6.jpg',
                        "isDesign": true,
                        "rubros": ["niño"],
                    },
                    {
                        "id": 7,
                        "nombre": 'Black and White Stripes',
                        "precio": 7.00,
                        "image":'img/product/7.jpg',
                        "isDesign": true,
                        "rubros": ["niño"],
                    },
                    {
                        "id": 8,
                        "nombre": 'Flamboyant Pink Top',
                        "precio": 8.00,
                        "image":'img/product/8.jpg',
                        "isDesign": true,
                        "rubros": ["niña"],
                    },
                    {
                        "id": 9,
                        "nombre": 'Black and White Stripes Dress',
                        "precio": 9.00,
                        "image":'img/product/9.jpg',
                        "isDesign": true,
                        "rubros": ["hombre"],
                    }
                ]
            }
        },
        created()
        {
            this.isDesign = this.getIsDesign
            this.titulo = this.getSearch
            this.rubrox = this.getRubro
        },
        computed: 
        {
            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth']),
            busqueda: function() 
            {
                let auxiliar = [];
                if(this.articulos  && this.articulos.length)
                {
                    this.articulos.forEach(function(articulo,index)
                    {
                        if(this.isDesign==articulo.isDesign)//Si es diseñable
                        {
                            if((typeof(this.titulo) === 'string') && this.titulo.trim()!="" )
                            {
                                //todas las categorias y con algo en el buscador
                                if((typeof(this.rubrox) === 'string') && this.rubrox.trim()=='')
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
                                if((typeof(this.rubrox) === 'string') && this.rubrox.trim()=='')
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
                        }
                    },this);
                }
                //this.totalRowsMovil = auxiliar.length;
                return auxiliar;
            }
        },
        watch:
        {
            getIsDesign: function(){
                console.log("es diseñable: "+this.isDesign );
              this.isDesign = this.$store.getters.getIsDesign
            },
            getRubro: function(){
              this.rubrox = this.$store.getters.getRubro
            },
            getSearch: function(){
              this.titulo = this.$store.getters.getSearch
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
