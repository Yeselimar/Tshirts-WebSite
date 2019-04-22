<style lang="scss" scope>
li.logiform .droplogin:after {
  position: absolute;
  display: block;
  content: "";
  top: -15px;
  right: 20px;
  /*left: 190px;*/
  width: 0;
  height: 0;
  margin-left: 0px;
  overflow: hidden;
  border: 7px solid transparent;
  border-bottom-color: #ccc;
}
.droplogin .ingresar .input-group {
  margin-top: 20px;
}
.droplogin .ingresar .input-group input {
  width: 100%;
  height: 44px;
  border: none;
  padding: 0 18px;
  background: #f0f0f0;
  border-radius: 40px;
  font-size: 14px;
}

.droplogin .ingresar .input-group .form-control:focus {
  color: #777777;
  outline: none;
  box-shadow: none;
}

.droplogin {
  padding: 17px 17px 17px 17px;
  min-width: 330px;
  border-radius: 0.5em;
  background: #fff;
  border-color: #ebebeb;
  z-index: 99999 !important;
  position: absolute;
  top: 2rem;
  /*left: -10.6rem;*/
  right: 0;
  border: solid 1px #ebebeb;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
}
@media (max-width: 768px) {
  .dropcart,
  .dropbag {
    min-width: 450px !important;
  }
}
@media (max-width: 490px) {
  .dropcart,
  .dropbag {
    min-width: 350px !important;
  }
}
@media (max-width: 400px) {
  .dropcart,
  .dropbag {
    min-width: 334px !important;
  }
}
/*
				@media only screen and (min-width: 1200px) and (max-width: 1315px) {
					.droplogin {
						min-width: 275px;
					}
				}
				*/
.site-btn-login {
  display: inline-block;
  border: none;
  font-size: 14px;
  font-weight: 600;
  min-width: 119px;
  padding: 12px 20px 12px;
  border-radius: 50px;
  margin-top: 17px;
  background: #ef7a6e;
  color: #fff;
  line-height: normal;
  cursor: pointer;
  text-align: center;
}
a.link-login {
  display: block;
  position: relative;
  font-size: 14px;
  color: black;
  margin-bottom: 6px;
  cursor: pointer;
}
a.link-login:hover {
  font-weight: bold;
}

li.cartform .dropcart:after {
  position: absolute;
  display: block;
  content: "";
  top: -15px;
  right: 20px;
  /* left: 190px; */
  width: 0;
  height: 0;
  margin-left: 0px;
  overflow: hidden !important;
  border: 7px solid transparent;
  border-bottom-color: #ccc;
}
.dropcart {
  min-width: 550px;
  border-radius: 0.5em;
  background: #fff;
  border-color: #ebebeb;
  z-index: 99999 !important;
  position: absolute;
  top: 2rem;
  right: 0;
  /* left: -20.6rem; */
  border: solid 1px #ebebeb;
  max-height: 70vh !important;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
}
li.bagform .dropbag:after {
  position: absolute;
  display: block;
  content: "";
  top: -15px;
  right: 20px;
  /* left: 190px; */
  width: 0;
  height: 0;
  margin-left: 0px;
  overflow: hidden !important;
  border: 7px solid transparent;
  border-bottom-color: #ccc;
}
.dropbag {
  min-width: 550px;
  border-radius: 0.5em;
  background: #fff;
  border-color: #ebebeb;
  z-index: 99999 !important;
  position: absolute;
  top: 2rem;
  right: 0;
  /* left: -20.6rem; */
  border: solid 1px #ebebeb;
  max-height: 70vh !important;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
}
.js-header-main-cyo:hover {
  color: #ef7a6e !important;
}
.border-li-barna-active {
  border: 2px solid black;
}
.rubro-selected {
  color: #ef7a6e;
  font-weight: bold;
}
</style>
<template>
  <div>
    <div class="header-section header-barna-fixed" @click="closeAll(500)">
      <div class="header-top-barna">
        <div class="container" :class="{'position-relative': collapse}">
          <div class="d-flex align-items-center flex-wrap-mw justify-content-around">
            <div class="flex-basis-logo">
              <!-- logo -->
              <router-link class="site-logo cursor" to="/">
                <img :src="'/img/barna.jpg'" id="logo-barna" alt>
              </router-link>
            </div>
            <div class="flex-basis-design">
              <ul class="d-flex align-items-center sprd-header-barna">
                <li
                  class="mr-2 sprd-li-barna d-flex align-items-center"
                  :class="[{'border-li-barna-active': getIsDesign}]"
                >
                  <a
                    class="align-items-center d-flex js-header-main-cyo cursor"
                    :class="[{'color-barna': getIsDesign}]"
                    @click.stop.prevent="designM(true)"
                  >
                    <div class="d-flex align-items-center">
                      <i class="fa fa-magic font-20"></i>
                    </div>
                    <div class="pl-2 sm-none-barna">
                      <div class="title">Diseñar</div>
                      <div class="description" :class="[{'color-black': getIsDesign}]">Hecho por ti</div>
                    </div>
                  </a>
                </li>
                <li
                  class="mr-4 sprd-li-barna d-flex align-items-center"
                  :class="[{'border-li-barna-active': !getIsDesign}]"
                >
                  <a
                    class="align-items-center d-flex js-header-main-cyo cursor"
                    :class="[{'color-barna': !getIsDesign}]"
                    @click.stop.prevent="designM(false)"
                  >
                    <div class="d-flex align-items-center">
                      <i class="fa fa-money font-20"></i>
                    </div>
                    <div class="pl-2 sm-none-barna">
                      <div class="title">Comprar</div>
                      <div class="description" :class="[{'color-black': !getIsDesign}]">Hecho para ti</div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div class="slicknav_menu" id="accordionExample">
              <a
                aria-haspopup="true"
                tabindex="0"
                class="slicknav_btn slicknav_collapsed"
                style="outline: none;"
                id="heading"
                @click="cambCollapse"
                data-toggle="collapse"
                data-target=".collapseOne"
                aria-expanded="1"
                aria-controls="collapseOne1"
              >
                <span class="slicknav_icon">
                  <span class="slicknav_icon-bar"></span>
                  <span class="slicknav_icon-bar"></span>
                  <span class="slicknav_icon-bar"></span>
                </span>
              </a>
            </div>
            <span
              class="d-contents collapseOne"
              :class="[{'collapse': collapse}]"
              aria-labelledby="heading"
              data-parent="#accordionExample"
            >
              <div
                class="mr-4 flex-basis-search collapseOne"
                :class="[{'mt-2': collapse},{'collapse': collapse}]"
                aria-labelledby="heading"
                data-parent="#accordionExample"
              >
                <form class="header-search-form input-group ml-2 mr-2 form-search-barna">
                  <div class="input-group-prepend cursor">
                    <span
                      class="input-group-text input-group-search-barna"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      id="basic-addon1"
                    >
                      <i
                        class="fa fa-filter"
                        :class="{'rubro-selected': getRubro !== ''}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <ul class="dropdown-menu" id="rubrosCat">
                      <input
                        class="form-control"
                        id="myInput"
                        @click.stop.prevent
                        @keyup.stop.prevent="searchRubro"
                        type="text"
                        placeholder="Buscar.."
                      >
                      <li>
                        <a
                          @click.stop.prevent="seletedAll"
                          :class="[{'bg-barna font-weight-bold': getRubro === ''}]"
                        >Todas las categorias</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Hombre'}]"
                        >Hombre</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Mujer'}]"
                        >Mujer</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Niña'}]"
                        >Niña</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Niño'}]"
                        >Niño</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Taza'}]"
                        >Taza</a>
                      </li>
                      <li>
                        <a
                          @click.stop.prevent="seleted"
                          :class="[{'bg-barna font-weight-bold': getRubro === 'Buzo'}]"
                        >Buzo</a>
                      </li>
                    </ul>
                  </div>
                  <input
                    type="text"
                    v-model="search"
                    class="input-search-barna form-control"
                    @keyup="searchK"
                    placeholder="Buscar en Barna ...."
                  >
                  <div class="input-group-append cursor" @click="searchM">
                    <span class="input-group-text input-group-search-barna">
                      <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <!--<button><i class="flaticon-search"></i></button>-->
                </form>
              </div>
              <div
                class="flex-basis-icons collapseOne"
                :class="[{'mt-2': collapse},{'collapse': collapse}]"
                aria-labelledby="heading"
                data-parent="#accordionExample"
              >
                <div class="user-panel">
                  <ul class="navbar-nav d-inline">
                    <li class="nav-item d-inline dropdown bagform">
                      <div class="up-item pr-3">
                        <div class="header-cart cursor" @click.stop.prevent="showBagM">
                          <i class="fa fa-shopping-bag"></i>
                          <span>0</span>
                        </div>
                      </div>
                      <!-- drop bag -->
                      <div
                        class="dropbag drop"
                        @click.stop.prevent
                        v-if="showBag"
                        :class="[{'zoomIn animated': showBag},{'zoomOut animated': showBagOut}]"
                      >
                        <div
                          class="scroll-barna"
                          style="overflow: auto;max-height: 65vh;padding:17px"
                        >
                          <h5 class="pb-2">
                            <i class="fa fa-shopping-bag pr-2"></i>Cesta de Pedidos
                          </h5>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="product-th text-center">Producto</th>
                                <th class="quy-th text-center">Cant</th>
                                <th class="total-th text-right">Precio</th>
                                <th class="text-center"></th>
                              </tr>
                            </thead>
                            <tfoot>
                              <tr class="bg-gray">
                                <td colspan="2"></td>
                                <td class="total-col text-right">
                                  <h5>TOTAL: $883</h5>
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                            <tbody>
                              <tr>
                                <td class="text-center">
                                  <img :src="'/img/cart/2.jpg'" class="w-30" alt>
                                  <div class="pc-title">
                                    <h6>Nev Print Absol</h6>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <h6 class="inc qtybtn">x 1</h6>
                                </td>
                                <td class="text-right">
                                  <h6>$145.90</h6>
                                </td>
                                <td class="text-center">
                                  <h5>
                                    <i class="fa fa-trash cursor"></i>
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <img :src="'/img/cart/3.jpg'" class="w-30" alt>
                                  <div class="pc-title">
                                    <h6>Swutter Print Dress</h6>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <h6 class="inc qtybtn">x 1</h6>
                                </td>
                                <td class="text-right">
                                  <h6>$25.90</h6>
                                </td>
                                <td class="text-center">
                                  <h5>
                                    <i class="fa fa-trash cursor"></i>
                                  </h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="d-flex justify-content-end">
                            <input
                              type="button"
                              value="Procesar Pedido"
                              class="site-btn-login float-right"
                            >
                          </div>
                        </div>
                      </div>
                      <!-- end dropBag-->
                    </li>
                  </ul>

                  <ul class="navbar-nav d-inline">
                    <li class="nav-item d-inline dropdown cartform">
                      <div class="up-item pr-3">
                        <div class="header-cart cursor" @click.stop.prevent="showCartM">
                          <i class="fa fa-shopping-cart"></i>
                          <span>0</span>
                        </div>
                      </div>
                      <div
                        class="dropcart drop"
                        @click.stop.prevent
                        v-if="showCart"
                        :class="[{'zoomIn animated': showCart},{'zoomOut animated': showCartOut}]"
                      >
                        <!-- drop cart-->
                        <div
                          class="scroll-barna"
                          style="overflow: auto;max-height: 65vh;padding:17px"
                        >
                          <h5 class="pb-2">
                            <i class="fa fa-shopping-cart pr-2"></i>Carrito de Compra
                          </h5>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="product-th text-center">Producto</th>
                                <th class="quy-th text-center">Cant</th>
                                <th class="total-th text-right">Precio</th>
                                <th class="text-center"></th>
                              </tr>
                            </thead>
                            <tfoot>
                              <tr class="bg-gray">
                                <td colspan="2"></td>
                                <td class="total-col text-right">
                                  <h5>TOTAL: $83</h5>
                                </td>
                                <td></td>
                              </tr>
                            </tfoot>
                            <tbody>
                              <tr>
                                <td class="text-center">
                                  <img :src="'/img/cart/1.jpg'" class="w-30" alt>
                                  <div class="pc-title">
                                    <h6>Animal Print Dress</h6>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <h6 class="inc qtybtn">x 1</h6>
                                </td>
                                <td class="text-right">
                                  <h6>$75.90</h6>
                                </td>
                                <td class="text-center">
                                  <h5>
                                    <i class="fa fa-trash cursor"></i>
                                  </h5>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">
                                  <img :src="'/img/cart/2.jpg'" class="w-30" alt>
                                  <div class="pc-title">
                                    <h6>Text Print Dress</h6>
                                  </div>
                                </td>
                                <td class="text-center">
                                  <h6 class="inc qtybtn">x 1</h6>
                                </td>
                                <td class="text-right">
                                  <h6>$5.90</h6>
                                </td>
                                <td class="text-center">
                                  <h5>
                                    <i class="fa fa-trash cursor"></i>
                                  </h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div class="d-flex justify-content-end">
                            <input type="button" value="Comprar" class="site-btn-login float-right">
                          </div>
                        </div>
                        <!--end dropcart -->
                      </div>
                    </li>
                  </ul>
                  <ul class="navbar-nav d-inline">
                    <li class="nav-item d-inline dropdown logiform">
                      <div class="up-item pr-3">
                        <div class="header-cart cursor" @click.stop.prevent="showLoginM">
                          <i class="fa fa-user" :class="{'color-barna':getIsAuth}"></i>
                        </div>
                      </div>
                      <div
                        class="droplogin drop"
                        @click.stop.prevent
                        v-if="showLogin"
                        :class="[{'zoomIn animated': showLogin},{'zoomOut animated': showLoginOut}]"
                      >
                        <div class="scroll-barna" style="overflow: auto;max-height: 65vh" :class="{'border-b-barna': getIsAuth}">
                          <h5 class="pb-2 text-left" style="border-bottom: 1px solid #cccccc;" :class="{'bg-blue-barna': getIsAuth}">
                            <i class="fa fa-user pr-2"></i><span v-if="getIsAuth">{{user.name}} {{user.last_name}}</span><span v-else> Iniciar Sesion </span>
                          </h5>
                          <div v-if="getIsAuth">
                            <p class="mb-1 mt-3 text-left"><a class="mt-1 link-barna">
                              <i class="fa fa-cogs pl-1 pr-2"></i>Perfil
                            </a></p>
                            <p class="text-left mt-1 mb-1">
                                          <a class="link-barna"> <i class="fa fa-product-hunt pl-1 pr-2"></i>Mis Pedidos</a>
                            </p>
							              <p class="text-left">
                            <a class="link-barna">
                              <i class="fa fa-cart-arrow-down pl-1 pr-2"></i>Mis Compras
                            </a></p>
							              <p class="mt-1 text-right">
                            <a class="link-barna text-right" @click.stop.prevent="logout">
                              <i class="fa fa-external-link pr-2"></i>Cerrar Sesión
                            </a>
							              </p>
                          </div>
                          <div v-else class="ingresar">
                            <div class="form-email input-group">
                              <input
                                type="email"
                                v-model="user.email"
                                name="email"
                                class="form-control"
                                :placeholder="'Ingrese su email'"
                              >
                            </div>
                            <div class="form-password input-group">
                              <input
                                type="password"
                                v-model="user.password"
                                name="password"
                                class="form-control"
                                :placeholder="'Ingrese su contraseña'"
                              >
                            </div>

                            <div class="d-flex justify-content-end">
                              <input
                                type="button"
                                value="Ingresar"
                                v-on:click="loginM()"
                                class="site-btn-login float-right"
                              >
                            </div>
                            <div class="input-group remember justify-content-start text-left">
                              <a @click.stop.prevent class="link-login cursor">Recuperar contraseña</a>
                            </div>
                            <div class="justify-content-start text-left">
                                <router-link to="/register" @click="closeAll(1)" class="link-login cursor">Registrarse</router-link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <nav class="main-navbar text-center">
        <div class="container-fluid d-flex justify-content-center">
          <!-- menu -->
          <ul
            class="container scroll-barna overflow-auto main-menu d-flex align-items-center w-auto"
          >
            <li>
              <a href="#">Hombre</a>
            </li>
            <li>
              <a href="#">Mujer</a>
            </li>
            <li>
              <a href="#">Niño</a>
            </li>
            <li>
              <a href="#">Niña</a>
            </li>
            <li>
              <a href="#">Tazas</a>
            </li>
            <li>
              <a href="#">Buzo</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div id="content-barna" class="h-171" 
    style="background-position: center center;
    background-image: url('/img/barna.jpg');
    background-size: contain;
    background-color: #282828;
    background-repeat: no-repeat;
    "></div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loading from "../../components/layouts/loading.vue";
import CerService from "../../plugins/CerService";

export default {
  name: "headerComponent",
  components: {
    loading
  },
  data() {
    return {
      user: {
        name: "",
        last_name: ""
      },
      collapse: false,
      showLogin: false,
      showCart: false,
      showBag: false,
      search: this.getSearch,
      showLoginOut: false,
      showCartOut: false,
      showBagOut: false,
      isLoading: false
    };
  },
  methods: {
  /*  initComponent() {
      this.isLoading = true;
        CerService.get("/login/auth")
          .then(response => {
            if (response.res) {
              this.$store.dispatch('cambiarUser',{...response.user})
              this.$store.dispatch('cambiarIsAuth',true)
              this.user.name = response.user.name;
              this.user.last_name = response.user.last_name;
              this.isLoading = false;
            } else {
              this.isLoading = false;
            }
          })
          .catch(err => {
            console.log("Ha ocurrido un error inesperado");
             this.isLoading = false;
          });
  },*/
  cambCollapse(){
    //var content = $("#content-barna");
    //console.log('holaa')
      setTimeout(e => { 
            $('#content-barna').css('min-height',parseInt(($('.header-barna-fixed').css('height')).split('px')[0]))           
        },600)  },
	logout(){
	  this.closeAll(10)
	  this.isLoading = true;
      CerService.post("/logout")
          .then(response => {
            if (response.res) {
              this.$store.dispatch('cambiarIsAuth',false)
              this.$store.dispatch('cambiarUser',{})
              this.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
              })
              .fire({
                type: "success",
                title: response.msg
              });
              this.$router.push({ name: 'home' })
              this.isLoading = false;
            } else {
              this.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
              })
              .fire({
                type: "warning",
                title: response.msg
              });
              this.isLoading = false;
            }
          })
          .catch(err => {
            this.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
              })
              .fire({
                type: "success",
                title: "Ha ocurrido un error inesperado"
              });
             this.isLoading = false;
          });
	},
    seleted(event) {
      this.$store.dispatch('cambiarRubro',String(event.target.innerText))
      $("#rubrosCat").dropdown("toggle");      
      /*if(this.isRouteRubro) {
        this.$emit("searchM", e);
      } else {}
      */

    },
    seletedAll() {
      this.$store.dispatch('cambiarRubro',"")
      $("#rubrosCat").dropdown("toggle");
    },
    showBagM() {
      if (!this.showBag) {
        this.showBagOut = false;
        this.showBag = true;
        this.showLoginOut = true;
        this.showCartOut = true;
        setTimeout(e => {
          this.showLogin = false;
          this.showCart = false;
        }, 500);
      } else {
        this.showBagOut = true;
        setTimeout(e => {
          this.showBagOut = false;
          this.showBag = false;
        }, 500);
      }
    },
    showCartM() {
      if (!this.showCart) {
        this.showCartOut = false;
        this.showCart = true;
        this.showLoginOut = true;
        this.showBagOut = true;
        setTimeout(e => {
          this.showLogin = false;
          this.showBag = false;
        }, 500);
      } else {
        this.showCartOut = true;
        setTimeout(e => {
          this.showCartOut = false;
          this.showCart = false;
        }, 500);
      }
    },
    showLoginM() {
      if (!this.showLogin) {
        this.showLoginOut = false;
        this.showLogin = true;
        this.showBagOut = true;
        this.showCartOut = true;
        setTimeout(e => {
          this.showBag = false;
          this.showCart = false;
        }, 500);
      } else {
        this.showLoginOut = true;
        setTimeout(e => {
          this.showLoginOut = false;
          this.showLogin = false;
        }, 500);
      }
    },
    closeAll(val) {
      this.showLoginOut = true;
      this.showCartOut = true;
      this.showBagOut = true;
      setTimeout(e => {
        this.showLoginOut = false;
        this.showCartOut = false;
        this.showBagOut = false;
        this.showLogin = false;
        this.showCart = false;
        this.showBag = false;
      }, val);
    },
    designM(cent) {
      //this.$emit("designM", cent);
      this.$store.dispatch('cambiarIsDesign',cent)

    },
    loginM() {
	    this.isLoading = true;
      var dataform = new FormData();
      dataform.append("password", this.user.password);
      dataform.append("email", this.user.email);      
        CerService.post("/login/post", dataform)
        .then(response => {
          if (response.res) {
            this.closeAll(1)
            this.user = response.user;
            this.$store.dispatch( 'loadUser' );
            this.isLoading = false;
            this.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
              })
              .fire({
                type: "success",
                title: response.msg
              });
          } else {
			      this.isLoading = false;
            this.$swal
              .mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000
              })
              .fire({
                type: "warning",
                title: response.msg
              });
          }
        })
        .catch(error => {
          this.$store.dispatch( 'loadUser' );
		      this.isLoading = false;
          this.$swal
            .mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 4000
            })
            .fire({
              type: "error",
              title: "Ha ocurrido un error inesperado"
            });
        });
    },
    searchM() {
      this.$store.dispatch('cambiarSearch',this.search)
      /*if(this.isRouteRubro) {
        this.$emit("searchM", e);
      } else {
          location.replace(this.url+'/rubros');
      }*/
    },
    searchK() {
      this.$store.dispatch('cambiarSearch',this.search)
    },
    searchRubro() {
      var value = $("#myInput").val();
      $(".dropdown-menu li").filter(function() {
        $(this).toggle(
          $(this)
            .text()
            .toLowerCase()
            .indexOf(value) > -1
        );
      });
    }
  },
  computed: {
    ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getNumCart','getNumBag']),
  },
  mounted: function() {
  //this.initComponent()
    if (this.getIsAuth){
      this.user = this.getUser
    }
    var logo = $("#logo-barna");
    var content = $("#content-barna");
    $(window).resize(event => {
      event.preventDefault();
      $(content).css("min-height", parseInt(($('.header-barna-fixed').css('height')).split('px')[0]));
      if (document.body.clientWidth <= 768) {
        this.collapse = true;
      } else {
        this.collapse = false;
      }
    });

    document.addEventListener("scroll", event => {
      event.preventDefault();
      var menu = $(".main-menu li a");
      var t = 150;
      if(this.collapse){
        t = 50
      }
      if (document.documentElement.scrollTop > t) {
        $(content).css("transition", "all 0.5s ease 0.4s");
        $(logo).css("transition", "all 0.5s ease 0.4s");
        $(logo).css("width", 50);
        $(logo).css("height", 65);
        $(content).css("height", 81);
        if (menu.length) {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).css("transition", "all 0.5s ease 0.4s");
            $(menu[i]).css("padding", "8px 0");
          }
        }
      } else {
        $(content).css("transition", "all 0.3s ease 0.2s");
        $(logo).css("transition", "all 0.3s ease 0.2s");
        $(logo).css("width", 75);
        $(logo).css("height", 105);

        if (menu.length) {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).css("transition", "all 0.3s ease 0.2s");
            $(menu[i]).css("padding", "17px 0");
          }
        }
        setTimeout(e => { 
            $('#content-barna').css('min-height',parseInt(($('.header-barna-fixed').css('height')).split('px')[0]))           
        },300)
      }
    });
  },
  created() {
    if (document.body.clientWidth <= 768) {
      this.collapse = true;
    } else {
      this.collapse = false;
    }
  },
  watch: {
    getIsDesign: function(){
      //console.log('esto esta cambiando a ',this.getIsDesign)
      //aqui llamamos a los pertinentes servicios que se llaman cuando cambia isDesign
    },
    getUser: function(){
      this.user = this.$store.getters.getUser
    }
  }
};
</script>
