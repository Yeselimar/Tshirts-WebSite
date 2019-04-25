<template>
  
  <div class="unix-login">
      <div class="container-fluid">
          <div class="row justify-content-center">
              <div class="col-lg-4">
                  <div class="login-content card">
                      <div class="login-form">
                          <h4>Iniciar Sesión</h4>
                              <div class="form-group">
                                  <label>Correo Electrónico</label>
                                  <input type="email" class="form-control" placeholder="Email" v-model="user.email">
                              </div>
                              <div class="form-group">
                                  <label>Contraseña</label>
                                  <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                              </div>
                              <div class="checkbox">
                              <label>
                                <input type="checkbox"> Recuerdame
                              </label>
                            <label class="pull-right">
                              <a href="#">¿Olvidates tu contraseña?</a>
                            </label>

                              </div>
                              <button type="submit" class="btn btn-primary btn-flat m-b-30 m-t-30" @click="login">Ingresar</button>
                              <div class="register-link m-t-15 text-center">
                                  <p>¿No tienes cuenta? <a href="#"> Registrate</a></p>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import CerService from "../../../plugins/CerService";

export default {
  name:'login',
  data () {
    return {
      user:{
        email:'',
        password:''
      }
     
    }
  },
  methods: {
    login() {
       $(".preloader").show();
      var dataform = new FormData();
      dataform.append("password", this.user.password);
      dataform.append("email", this.user.email);      
        CerService.post("/login/admin/post", dataform)
        .then(response => {
          if (response.res) {
            //this.user = response.user;
            this.$store.dispatch( 'cambiarIsAuth',true );
            this.$store.dispatch( 'cambiarUser',response.user);
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
              this.$router.push({ name: 'index' })

          } else {
             this.$store.dispatch( 'cambiarIsAuth',false );
             this.$store.dispatch( 'cambiarUser',{} );
              $(".preloader").fadeOut();
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
            $(".preloader").fadeOut();

        });
    },
  }
}
</script>
