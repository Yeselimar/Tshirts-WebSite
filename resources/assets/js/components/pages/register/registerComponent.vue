<style lang="scss" scope>
    .modal-body .ingresar .input-group{
        position: relative;
        padding-bottom: .6rem;
    }
    .input-register {
        padding-bottom: 0.7rem;
        position: relative;
    }

</style>
<template>
	<div>
            <migajas-component titulo="Registrar"></migajas-component>
		<!-- Registro section -->
		
			<div class="container min-50">
				<div class="row">
					<div class="col-lg-12 contact-info mt-3 mb-5">
						<div class="contact-form d-flex flex-wrap justify-content-around">
							<div class="input-register flex-basis-47">
                                 <input v-model="name" type="text" name="name" id="name" autocomplete="off" placeholder="Ingresa tu nombre" 
                                 :class="{'error-input': errors.first('name','form-register')}"
                                data-vv-scope="form-register"
                                v-validate
                                data-vv-rules="required:true|min:3"
                              >
                                <span
                                class="error-text"
                                v-if="errors.firstByRule('name', 'required','form-register')"
                              >Campo requerido.</span>
                                 <span
                                  class="error-text"
                                  v-else-if="errors.firstByRule('name','min','form-register')"
                                >Minimo 3 caracteres.</span>
                            </div>
                            <div class="input-register flex-basis-47">
							    <input   v-model="last_name" type="text" name="last_name" id="last_name" autocomplete="off" placeholder="Ingresa tu apellido"
                                :class="{'error-input': errors.first('last_name','form-register')}"
                                data-vv-scope="form-register"
                                v-validate
                                data-vv-rules="required:true|min:3"
                              >
                                <span
                                class="error-text"
                                v-if="errors.firstByRule('last_name', 'required','form-register')"
                              >Campo requerido.</span>
                                 <span
                                  class="error-text"
                                  v-else-if="errors.firstByRule('last_name','min','form-register')"
                                >Minimo 3 caracteres.</span>
                            </div>
							<div class="input-register flex-basis-47">
							    <input   v-model="email" type="text" name="email" id="email" autocomplete="off" placeholder="Ingresa tu email"
                                :class="{'error-input': errors.first('email','form-register')}"
                                data-vv-scope="form-register"
                                v-validate
                                data-vv-rules="required:true|email"
                              >
                                <span
                                class="error-text"
                                v-if="errors.firstByRule('email', 'required','form-register')"
                              >Campo requerido.</span>
                                <span
                                  class="error-text"
                                  v-else-if="errors.firstByRule('email','email','form-register')"
                                >Formato no válido.</span>
                            </div>
							<div class="input-register flex-basis-47">
  							    <input   v-model="phone" type="text" name="phone" id="phone" autocomplete="off" placeholder="Ingresa tu número telefonico" 
                                  :class="{'error-input': errors.first('phone','form-register')}"
                                data-vv-scope="form-register"
                                v-validate
                                data-vv-rules="required:true|min:7"
                                >
                                    <span
                                    class="error-text"
                                    v-if="errors.firstByRule('phone', 'required','form-register')"
                                >Campo requerido.</span>
                                    <span
                                    class="error-text"
                                    v-else-if="errors.firstByRule('phone','min','form-register')"
                                    >Minimo 7 caracteres.</span>
                            </div>
							<div class="input-register flex-basis-47">
                                 <input  v-model="password" type="password" name="password" id="password" autocomplete="off" placeholder="Ingresa tu Contraseña"
                                 :class="{'error-input': errors.first('password','form-register')}"
                                data-vv-scope="form-register"
                                v-validate
                                @copy.prevent=null
                                @paste.prevent=null
                                data-vv-rules="required:true|min:6"
                              >
                                  <span
                                  class="error-text"
                                  v-if="errors.firstByRule('password', 'required','form-register')"
                                >Campo requerido.</span>
                                <span
                                  class="error-text"
                                  v-else-if="errors.firstByRule('password','min','form-register')"
                                >Minimo 6 caracteres.</span>
                            </div>
							<div class="input-register flex-basis-47">
							    <input  v-model="confirm_password" type="password" name="confirm_password" id="confirm_password" autocomplete="off" placeholder="Confirmar contraseña"
                                        :class="{'error-input': !confirmed}"
                                        @copy.prevent=null
                                        @paste.prevent=null
                                    >
                                    <span
                                            class="error-text"
                                            v-if="!confirmed"
                                    >Las contraseñas deben coincidir</span>
                                   
                                 
                            </div>


						</div>
                    	<button class="mt-3 mb-3 mr-md-3 pull-right site-btn" @click="register">REGISTRARSE AHORA</button>

                       
					</div>
				</div>
                        <div @click="inicio" class="modal fade" id="modalRegister">
                            <div class="modal-dialog">
                                <div class="modal-content modal-content-barna" @click.stop.prevent="">
                                    <div class="modal-header modal-header-barna">
                                        <h5 class="modal-title pull-left"><strong>Registro Exitoso. Ya puedes Iniciar Sesión</strong></h5>
                                        <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                                    </div>
                                    <div class="modal-body">
                                        <div class="d-flex flex-wrap ingresar justify-content-center">
                                                    <div class="w-70 form-email input-group">
                                                        <input type="email"
                                                            v-model="email_login"
                                                            name="form-email"
                                                            class="input-barna"
                                                           :class="{'error-input': errors.first('form-email','form-login-register')}"
                                                            :placeholder="'Ingrese su email'"
                                                            data-vv-scope="form-login-register"
                                                            v-validate
                                                            data-vv-rules="required:true|email"
                                                             @keyup.enter="ingresar"
                                                        >
                                                            <span
                                                            class="error-text"
                                                            v-if="errors.firstByRule('form-email', 'required','form-login-register')"
                                                        >Campo requerido.</span>
                                                            <span
                                                            class="error-text"
                                                            v-else-if="errors.firstByRule('form-email','email','form-login-register')"
                                                            >Formato no válido.</span>

                                                    </div>
                                                    <div class="w-70 form-password input-group">
                                                        <input type="password"
                                                            v-model="password_login"
                                                            name="form-password"
                                                            class="input-barna"
                                                            :class="{'error-input': errors.first('form-password','form-login-register')}"
                                                            data-vv-scope="form-login-register"
                                                            v-validate
                                                            data-vv-rules="required:true|min:6"
                                                            :placeholder="'Ingrese su contraseña'"
                                                             @keyup.enter="ingresar"

                                                        >
                                                            <span
                                                            class="error-text"
                                                            v-if="errors.firstByRule('form-password', 'required','form-login-register')"
                                                            >Campo requerido.</span>
                                                            <span
                                                            class="error-text"
                                                            v-else-if="errors.firstByRule('form-password','min','form-login-register')"
                                                            >Minimo 6 caracteres.</span>
                                                    </div>
																
                                            </div>
                                        
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class=" site-btn-login site-btn-default pull-right" @click="inicio" data-dismiss="modal">Atrás</button>
                                        <button type="button" @click.stop.prevent="ingresar" class="site-btn-login pull-right">Ingresar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
			</div>
            <loading v-if="isLoading"></loading>
		<!-- Registro section end -->
	</div>
</template>

<script>
    import migajasComponent from "../../../components/layouts/migajasComponent.vue";
    import loading from "../../../components/layouts/loading.vue";
    import CerService from '../../../plugins/CerService';


    export default {
        name:'registerComponent',
        components:
        {
            migajasComponent,
            loading
		},
        computed: {
            confirmed: function() {
                let m = false;
                if(this.password  === this.confirm_password) {
                    m = true
                }
                return m;
            }
        },
        data() {
			return {
                url: '',
                isLoading: false,
                isDesign: false,
                name: '',
                email_login: '',
                password_login: '',
                email: '',
                last_name: '',
                phone: '',
                password: '',
                confirm_password: '',
                msg: ''
			}
        },
        created(){
            $('.drop').toggle()
            this.isLoading = true
        },
        mounted(){
             let element = document.getElementById("header-top");
              var options = {
                offset: 0,
                force: true
              };
              this.$scrollTo(element, 500, options);
        },
        beforeMount()
        {
            this.isLoading = false
        },
        methods:
        {   
            ingresar() {
                this.$validator.validateAll("form-login-register").then(resp => {
                    if (resp) {
                        this.isLoading = true;
                        var dataform = new FormData();
                        dataform.append("password", this.password_login);
                        dataform.append("email", this.email_login);      
                        CerService.post("/login/post", dataform)
                        .then(response => {
                            if (response.res) {
                            this.user = response.user;
                            $('#modalRegister').modal('hide');
                            this.isLoading = false;
                            this.$store.dispatch( 'loadUser');
                            this.$router.push({ name: 'home' })
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
                        title: "Por favor valide los campos"
                        });
                    }
                });

            },
            inicio(){
                $('#modalRegister').modal('hide');
                this.$router.push({ name: 'home' })
                //$route.name
            },
            register(){
                 this.$validator.validateAll("form-register").then(resp => {
                    if (resp && this.confirmed) {
                        this.isLoading = true
                        var dataform = new FormData();
                        dataform.append('name', this.name);
                        dataform.append('last_name', this.last_name);
                        dataform.append('phone', this.phone);
                        dataform.append('password', this.password);
                        dataform.append('email',this.email);
                         CerService.post("/register/post", dataform)
                        .then(response => {
                            this.isLoading = false
                            if(response.res){
                                this.msg = response.msg
                                this.email_login = this.email
                                this.password_login = this.password
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
                                $('#modalRegister').modal('show');

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
                                }
                        }).catch( error =>
                        {
                            let msg= 'Ha ocurrido un error inesperado'
                            this.isLoading= false
                            this.$swal
                                    .mixin({
                                    toast: true,
                                    position: "top-end",
                                    showConfirmButton: false,
                                    timer: 4000
                                    })
                                    .fire({
                                    type: "warning",
                                    title: msg
                                    });
                        });
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
                            title: "Por favor valide los campos"
                            });
                        }
                    });
            }
		},
    }
</script>