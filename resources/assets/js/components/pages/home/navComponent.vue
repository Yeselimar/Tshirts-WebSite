<template>
  <!-- Hero section -->
  <section v-if="items.length" class="hero-section">
    <div class="hero-slider owl-carousel">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="hs-item"
        :style="'background-position:center center;background-size:container;background-image:'+'url(' +getUrl+item.imagen + ')'"
      >
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-7 text-white">
              <h2>{{item.nombre}}</h2>
              <p>{{item.descripcion_banner}}</p>
              <a  @click.stop.prevent="disenar(item.id)"  v-if="getIsDesign" class="site-btn sb-line cursor">
                <span class="font-xs-12">
                  <i class="fa fa-magic mr-2"></i>DISEÑAR
                </span>
                
              </a>
              <a  @click.stop.prevent="verDetalle(item.id)"  v-else class="site-btn sb-line cursor">
                <span class="font-xs-12">
                  <i class="fa fa-eye mr-2"></i>VER DETALLE
                </span>
              </a>
            </div>
          </div>
          <div class="align-items-center d-flex justify-content-center offer-card text-white">
            <span class="pb-3 pr-1 font-nav-current">$</span>
            <span class="pb-3 font-nav-price">{{item.precio_general}}</span>
          </div>
        </div>
      </div>
      <!--
                    <div class="hs-item set-bg" :data-setbg="url+'img/bg-2.jpg'">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-7 text-white">
                                    <span>New Arrivals</span>
                                    <h2>denim jackets</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                    <a href="#" class="site-btn sb-line">DISCOVER</a>
                                    <a href="#" class="site-btn sb-white">ADD TO CART</a>
                                </div>
                            </div>
                            <div class="offer-card text-white">
                                <span>from</span>
                                <h2>$29</h2>
                                <p>SHOP NOW</p>
                            </div>
                        </div>
                    </div>
      -->
    </div>
    <div class="container">
      <div class="slide-num-holder" id="snh-1"></div>
    </div>
    <loading v-if="isLoading"></loading>
  </section>
  <!-- Hero section end -->

</template>

<script>
import { mapGetters } from 'vuex'
import loading from "../../layouts/loading.vue";
import CerService from "../../../plugins/CerService";

export default {
  name: "navComponent",
  components:
  {
    loading
  },
  computed:
  {
      ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getUrl']),
  },
  data() {
    return {
      isLoading:false,
      items: []
    };
  },
  mounted()
  {
    this.llenarItems();
  },
  methods:
  {
    disenar (idProd)
    {
        this.$router.push({ name: 'detalleComprar', params: { id: idProd } })
    },
    verDetalle (idProd)
    {
        this.$router.push({ name: 'detalleComprar', params: { id: idProd } })
    },
    carousel()
    {
      setTimeout(e => {
          $(".hero-slider")
            .owlCarousel({
              loop: false,
              rewind: true,
              margin: 0,
              nav: true,
              items: 1,
              dots: true,
              animateOut: "fadeOut",
              animateIn: "fadeIn",
              navText: [
                '<i class="flaticon-left-arrow-1"></i>',
                '<i class="flaticon-right-arrow-1"></i>'
              ],
              smartSpeed: 1200,
              autoHeight: false,
              autoplay: true,
              onInitialized: function() {
                var a = this.items().length;
                $("#snh-1").html("<span>1</span><span>" + a + "</span>");
              }
            })
            .on("changed.owl.carousel", function(a) {
              var b = --a.item.index,
                a = a.item.count;
              $("#snh-1").html(
                "<span> " +
                  (1 > b ? b + a : b > a ? b - a : b) +
                  "</span><span>" +
                  a +
                  "</span>"
              );
            });

          $(".hero-slider").append(
            '<div class="slider-nav-warp"><div class="slider-nav"></div></div>'
          );
          $(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo(
            ".slider-nav"
          );
        }, 10);
    },
    obtenerdisenables()
    {
      this.isLoading = true;
      CerService.post("/banner/todos/disenables")
      .then(response => 
      {
          this.items = response.banners;
          this.carousel();
          this.isLoading = false
      })
      .catch(error => {
        console.log('Ha ocurrido un error inesperado')
        this.isLoading = false
      });
    },
    obtenernodisenables()
    {
      this.isLoading = true;
      CerService.post("/banner/todos/no-disenables")
      .then(response => 
      {
          this.items = response.banners;
          this.carousel();
          this.isLoading = false
      })
      .catch(error => {
        console.log('Ha ocurrido un error inesperado')
        this.isLoading = false
      });
    },
    llenarItems()
    {
      this.items = [];
      if (this.getIsDesign)
      {
        this.obtenerdisenables();
      }
      else
      {
        this.obtenernodisenables();
      }
    }
  },
  watch:
  {
    getIsDesign: function()
    {
      this.llenarItems();
    }
  }
};
</script>
