<template>

    <div class="main-wrapper">
        <!-- Cabecera Component-->
         <!-- header header  -->
                    <div class="header">
                        <nav class="navbar top-navbar navbar-expand-md navbar-light">
                            <!-- Logo -->
                            <div class="navbar-header">
                                <a class="navbar-brand" href="index.html">
                                    <!-- Logo icon -->
                                    <b><img :src="getUrl+'img/barna3.png'" style="width: 40px" alt="Barna" class="dark-logo" /></b>
                                    <!--End Logo icon -->
                                    <!-- Logo text -->
                                    <span><img :src="getUrl+'img/barna4.png'" style="width: 125px" alt="Barna" class="dark-logo" /></span>
                                </a>
                            </div>
                            <!-- End Logo -->
                            <div class="navbar-collapse">
                                <!-- toggle and nav items -->
                                <ul class="navbar-nav mr-auto mt-md-0">
                                    <!-- This is  -->
                                    <li class="nav-item"> <a class="nav-link nav-toggler hidden-md-up text-muted  " href="javascript:void(0)"><i class="mdi mdi-menu"></i></a> </li>
                                    <li class="nav-item m-l-10"> <a class="nav-link sidebartoggler hidden-sm-down text-muted  " href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                                    <!-- Messages -->


                                    <!-- End Messages -->
                                </ul>
                                <!-- User profile and search -->
                                <ul class="navbar-nav my-lg-0">

                                    <!-- Comment -->
                                    <li class="nav-item dropdown">


                                        <a class="nav-link dropdown-toggle text-muted text-muted  " href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="fa fa-bell"></i>
                                            <div class="notify"> <span class="heartbit"></span> <span class="point"></span> </div>
                                        </a>


                                        <div class="dropdown-menu dropdown-menu-right mailbox animated zoomIn">
                                            <ul>
                                                <li>
                                                    <div class="drop-title">Notifications</div>
                                                </li>
                                                <li>
                                                    <div class="message-center">
                                                        <!-- Message -->
                                                        <a href="#">
                                                            <div class="btn btn-danger btn-circle m-r-10"><i class="fa fa-link"></i></div>
                                                            <div class="mail-contnet">
                                                                <h5>This is title</h5> <span class="mail-desc">Just see the my new admin!</span> <span class="time">9:30 AM</span>
                                                            </div>
                                                        </a>
                                                        <!-- Message -->

                                                    </div>
                                                </li>
                                                <li>
                                                    <a class="nav-link text-center" href="javascript:void(0);"> <strong>Check all notifications</strong> <i class="fa fa-angle-right"></i> </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <!-- End Comment -->


                                    <!-- Profile -->
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle text-muted  " href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <img :src="getUrl+'img/users/masculino.png'" alt="user" class="profile-pic" />
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right animated zoomIn">
                                            <ul class="dropdown-user">
                                               <!--  <li><a href="#"><i class="ti-user"></i> Perfil</a></li>
                                                <li><a href="#"><i class="ti-settings"></i> Configuraciones</a></li> -->
                                                <li><a @click="logout" class="cursor"><i class="fa fa-power-off"></i> Cerrar Sesión</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <!-- End header header -->

                    <!-- Left Sidebar  -->
                    <div class="left-sidebar">
                        <!-- Sidebar scroll-->
                        <div class="scroll-sidebar">
                            <!-- Sidebar navigation-->
                            <nav class="sidebar-nav">
                                <ul id="sidebarnav">
                                    <li class="nav-devider"></li>
                                        <li class="cursor pb-3 pt-3 mb-1 nav-label" @click="home" >Ver Sitio Web</li>
                                    <li class="nav-devider"></li>
                                    <li>
                                        <a class="has-arrow  " a href="index1.html" aria-expanded="false"><i class="fa fa-home"></i><span class="hide-menu">Inicio </span></a>
                                    </li>

                                    <li class="nav-label">Ventas</li>
                                    <li>
                                        <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-book"></i><span class="hide-menu">Catálogo</span></a>

                                        <ul aria-expanded="false" class="collapse">
                                            <li><a class="cursor" @click=" $router.push({ name: 'articulos' })">Artículos</a></li>
                                        </ul>
                                        <ul aria-expanded="false" class="collapse">
                                            <li><a class="cursor" @click=" $router.push({ name: 'rubros' })" >Rubros</a></li>
                                        </ul>
                                        <ul aria-expanded="false" class="collapse">
                                            <li><a class="cursor" @click=" $router.push({ name: 'grupos' })">Grupos y Características</a></li>
                                        </ul>
                                        <ul aria-expanded="false" class="collapse">
                                            <li><a class="cursor" @click=" $router.push({ name: 'imagenes.disenos' })">Imágenes Prediseñadas</a></li>
                                        </ul>

                                    </li>

                                    <li>
                                        <a class="cursor" @click=" $router.push({ name: 'banner' })" aria-expanded="false"><i class="fa fa-image"></i><span class="hide-menu">Banner</span></a>
                                    </li>

                                    <li class="nav-label">Reportes</li>
                                    <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-tachometer"></i><span class="hide-menu">De Pedidos<span class="label label-rouded label-warning pull-right">6</span></span></a>

                                    </li>
                                    <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-tachometer"></i><span class="hide-menu">De Ventas<span class="label label-rouded label-danger pull-right">6</span></span></a>

                                    </li>

                                    <li class="nav-label">Usuarios</li>
                                    <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-users"></i><span class="hide-menu">Usuarios</span></a>
                                        <ul aria-expanded="false" class="collapse">
                                            <li><a href="form-basic.html">Mis usuarios</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                            <!-- End Sidebar navigation -->
                        </div>
                        <!-- End Sidebar scroll-->
                    </div>
                    <!-- End Left Sidebar  -->
        <!-- Cabecera Component-->

            <router-view></router-view>

    </div>

</template>
<script>

import CerService from "../../plugins/CerService";

import { mapGetters } from 'vuex'

export default {
    created(){
        this.$store.dispatch('cambiarUrl',this.$attrs.url)
    },
    components:
    {
    },
    mounted()
    {
        this.montar()

    },
    data() {
        return {
        }
    },
    methods:
    {
        home(){
            window.open(
              this.getUrl,
              '_blank' // <- This is what makes it open in a new window.
            );
        },
        montar(){
            if(this.getIsAuth){
                    setTimeout(e => {
                       $(function() {
                        "use strict";
                        $(function() {
                                $(".preloader").fadeOut();
                            }),

                            jQuery(document).on("click", ".mega-dropdown", function(i) {
                                i.stopPropagation();
                            });


                        var i = function() {
                            (window.innerWidth > 0 ? window.innerWidth : this.screen.width) < 1170 ? ($("body").addClass("mini-sidebar"),
                                $(".navbar-brand span").hide(), $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"),
                                $(".sidebartoggler i").addClass("ti-menu")) : ($("body").removeClass("mini-sidebar"),
                                $(".navbar-brand span").show());
                            var i = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
                            (i -= 70) < 1 && (i = 1), i > 70 && $(".page-wrapper").css("min-height", i + "px");
                        };


                        $(window).ready(i), $(window).on("resize", i), $(".sidebartoggler").on("click", function() {
                                $("body").hasClass("mini-sidebar") ? ($("body").trigger("resize"), $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible"),
                                    $("body").removeClass("mini-sidebar"), $(".navbar-brand span").show()) : ($("body").trigger("resize"),
                                    $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"),
                                    $("body").addClass("mini-sidebar"), $(".navbar-brand span").hide());
                            }),



                            $(".fix-header .header").stick_in_parent({}), $(".nav-toggler").click(function() {
                                $("body").toggleClass("show-sidebar"), $(".nav-toggler i").toggleClass("mdi mdi-menu"),
                                    $(".nav-toggler i").addClass("mdi mdi-close");
                            }),



                            $(".search-box a, .search-box .app-search .srh-btn").on("click", function() {
                                $(".app-search").slideToggle(200);
                            }),



                            $(".floating-labels .form-control").on("focus blur", function(i) {
                                $(this).parents(".form-group").toggleClass("focused", "focus" === i.type || this.value.length > 0);
                            }).trigger("blur"), $(function() {
                                for (var i = window.location, o = $("ul#sidebarnav a").filter(function() {
                                        return this.href == i;
                                    }).addClass("active").parent().addClass("active");;) {
                                    if (!o.is("li")) break;
                                    o = o.parent().addClass("in").parent().addClass("active");
                                }
                            }),

                            $(function() {
                                $("#sidebarnav").metisMenu();
                            }),

                            $(".scroll-sidebar").slimScroll({
                                position: "left",
                                size: "5px",
                                height: "100%",
                                color: "#dcdcdc"
                            }),

                            $(".message-center").slimScroll({
                                position: "right",
                                size: "5px",
                                color: "#dcdcdc"
                            }),

                            $(".aboutscroll").slimScroll({
                                position: "right",
                                size: "5px",
                                height: "80",
                                color: "#dcdcdc"
                            }),

                            $(".message-scroll").slimScroll({
                                position: "right",
                                size: "5px",
                                height: "570",
                                color: "#dcdcdc"
                            }),

                            $(".chat-box").slimScroll({
                                position: "right",
                                size: "5px",
                                height: "470",
                                color: "#dcdcdc"
                            }),

                            $(".slimscrollright").slimScroll({
                                height: "100%",
                                position: "right",
                                size: "5px",
                                color: "#dcdcdc"
                            }),



                            $("body").trigger("resize"), $(".list-task li label").click(function() {
                                $(this).toggleClass("task-done");
                            }),



                            $("#to-recover").on("click", function() {
                                $("#loginform").slideUp(), $("#recoverform").fadeIn();
                            }),



                            $('a[data-action="collapse"]').on("click", function(i) {
                                i.preventDefault(), $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("ti-minus ti-plus"),
                                    $(this).closest(".card").children(".card-body").collapse("toggle");
                            }),



                            $('a[data-action="expand"]').on("click", function(i) {
                                i.preventDefault(), $(this).closest(".card").find('[data-action="expand"] i').toggleClass("mdi-arrow-expand mdi-arrow-compress"),
                                    $(this).closest(".card").toggleClass("card-fullscreen");
                            }),



                            $('a[data-action="close"]').on("click", function() {
                                $(this).closest(".card").removeClass().slideUp("fast");
                            });
                    });
                    }, 10);
            }
        },
        logout()
        {
            $(".preloader").show();
            CerService.post("/logout/admin")
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
                      this.$router.push({ name: 'login' })
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
                      $(".preloader").fadeOut();
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
                        this.$router.push({ name: 'login' })
                      $(".preloader").fadeOut();7

                });

        }

    },

    computed: {
        ...mapGetters(['getIsAuth','getUrl']),
      },
    watch: {
        getIsAuth: function(){
          this.montar()
        },
    }

};
</script>