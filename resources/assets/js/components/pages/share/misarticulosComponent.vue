<style lang="scss" scope>
    .col-center
    {
        float: none;
        margin-left: auto;
        margin-right: auto;
    }



    #pagination .page-link:focus {
        box-shadow: inherit !important;
    }
    #pagination .page-item:first-child .page-link {
        margin-left: 0;
        background-color: #ebebeb !important;
        border-top-left-radius: 100% !important;
        border-bottom-left-radius: 100% !important;
        color: #495057 !important

    }

    #pagination .page-item:last-child .page-link {
        margin-left: 0 !important;
        background-color: #ebebeb !important;
        border-top-left-radius: 100% !important;
        border-bottom-left-radius: 100% !important;
        color: #495057 !important

    }
    #pagination .page-item:nth-child(2) .page-link{
            min-width: 35px !important;
            color: #495057 !important
    }
    #pagination .page-item:nth-last-child(2) .page-link
    {
            min-width: 33px !important;
            color: #495057 !important

    }
    
    #pagination .page-link {
        position: relative !important;
        display: block !important;
        padding: .5rem .75rem !important;
        margin-left: -1px !important;
        line-height: 1.25 !important;
        color: #495057 !important;
        background-color: #fff !important;
        border: 1px solid #dee2e6 !important;
        border-radius: 100% !important;
        margin: 0px 5px !important;
    }
        #pagination .page-item.active a{
        color: #fff !important;
        background-color: #ef7a6e !important;
        border-color: #ef7a6e !important;
        border-radius: 100% !important;
        margin: 0px 5px !important;
    }
    #pagination .page-item.disabled {
        cursor: not-allowed !important;

    }
    #pagination .page-item.disabled .page-link {
        color: #cccccc !important;

    }

</style>

<template>
    <div>
        <template v-if="busqueda.length!=0">
            <div class="row">
                <template v-for="(articulo,i) in busqueda" v-if="(i<currentPage*perPage) &&(i>=(currentPage-1)*perPage)">
                    <articulo-component :title="articulo.nombre" :id="articulo.id" :price="articulo.precio_general" :image="articulo.principal ? articulo.principal.url:''"></articulo-component>
                </template>
                <div class="pull-right w-100 pt-3">
                    <b-pagination id="pagination" :totalRows="totalRows" :per-page="perPage" v-model="currentPage" class="pt-3 pull-right"/>
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
    import CerService from "../../../plugins/CerService";

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
                currentPage: 1,
                perPage: 6,
                totalRows: 0,
                pageOptions: [5, 10, 15, 20, 50],
                articulos:
                [
                ]
            }
        },
        created()
        {
            if(this.getIsDesign){
                this.articulosdisenables()
            }else {
                this.articulosnodisenables()
            }

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
                            if((typeof(this.getSearch) === 'string') && this.getSearch.trim()!="" )
                            {
                                //todas las categorias y con algo en el buscador
                                if((typeof(this.getRubro) === 'string') && this.getRubro.trim()=='')
                                {
                                    if((articulo.nombre.toLowerCase().indexOf(this.getSearch.toLowerCase())>=0) )
                                    {
                                        auxiliar.push(articulo);
                                    }
                                }
                                else
                                {
                                    //selecciona una categoria y con algo en el buscador
                                    if(this.buscarcategoria(articulo,this.getRubro) && (articulo.nombre.toLowerCase().indexOf(this.getSearch.toLowerCase())>=0) )
                                    {
                                        auxiliar.push(articulo);
                                    }
                                }
                            }
                            else
                            {
                                if((typeof(this.getRubro) === 'string') && this.getRubro.trim()=='')
                                {
                                    //todas las categorias y sin nada en el buscador
                                    auxiliar.push(articulo);
                                }
                                else
                                {
                                    //selecciona una categoria y sin nada en el buscador
                                    if(this.buscarcategoria(articulo,this.getRubro) )
                                    {
                                        auxiliar.push(articulo);
                                    }
                                }
                            }
                    },this);
                }
                this.totalRows = auxiliar.length;
                return auxiliar;
            }
        },
        watch:
        {
            getIsDesign: function(){
                if(this.getIsDesign){
                    this.articulosdisenables()
                }else {
                    this.articulosnodisenables()
                }
            }
        },
        methods:
        {
            articulosdisenables()
            {
                this.isLoading = true
                CerService.post("/articulos/disenables/todos/api")
                .then(response => 
                {
                    this.articulos = response.articulos;
                    this.totalRows = this.articulos.length
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('Ha ocurrido un error inesperado');
                });
            },
            articulosnodisenables()
            {
                this.isLoading =true

                CerService.post("/articulos/no-disenables/todos/api")
                .then(response => 
                {
                    this.articulos = response.articulos;
                    this.totalRows = this.articulos.length
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                    console.log('Ha ocurrido un error inesperado');
                });
            },
            buscarcategoria(articulo, rubro)
            {
                //función para determinar si un artículo pertenece a una determinada categoría
                var encontrado = false;
                var i = 0;
                for (var i = 0; i < articulo.rubros.length; i++)
                {
                    if(articulo.rubros[i].nombre.toLowerCase()==rubro.toLowerCase())
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
