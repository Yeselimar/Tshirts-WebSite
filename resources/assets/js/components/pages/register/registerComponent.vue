<template>
	<div>
		<!-- header-->
            <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM" @searchK="searchK" @searchM="searchM"></header-component>
        <!--end header -->
            <migajas-component titulo="Registrar"></migajas-component>
		<!-- Registro section -->
		
			<div class="container">
				<div class="row">
					<div class="col-lg-12 contact-info mt-3 mb-5">
						<div class="contact-form d-flex flex-wrap justify-content-around">
							<input class="flex-basis-47" v-model="name" type="text" name="name" id="name" autocomplete="off" placeholder="Ingresa tu nombre">
							<input  class="flex-basis-47" v-model="last_name" type="text" name="last_name" id="last_name" autocomplete="off" placeholder="Ingresa tu apellido">
							<input  class="flex-basis-47" v-model="email" type="text" name="email" id="email" autocomplete="off" placeholder="Ingresa tu email">
							<input  class="flex-basis-47" v-model="phone" type="text" name="phone" id="phone" autocomplete="off" placeholder="Ingresa tu número telefonico">
							<input  class="flex-basis-47" v-model="password" type="password" name="password" id="password" autocomplete="off" placeholder="Ingresa tu Contraseña">
							<input  class="flex-basis-47" v-model="confirm_password" type="password" name="confirm_password" id="confirm_password" autocomplete="off" placeholder="Confirmar contraseña">

						</div>
                    	<button class=" mr-md-3 pull-right site-btn" @click="register">REGISTRARSE AHORA</button>

                       
					</div>
				</div>
                        <div @click="inicio" class="modal fade" id="modalRegister">
                            <div class="modal-dialog">
                                <div class="modal-content" @click.stop.prevent="">
                                    <div class="modal-header">
                                        <h5 class="modal-title pull-left"><strong>Registro Exitoso. Ya puedes Iniciar Sesión</strong></h5>
                                        <a class="pull-right mr-1" href="javascript(0)" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                                    </div>
                                    <div class="modal-body">
                                        <div class="d-flex flex-wrap ingresar justify-content-center">
                                                    <div class="w-70 form-email input-group">
                                                        <input type="email"
                                                            v-model="name"
                                                            name="email"
                                                            class="input-barna"
                                                            :placeholder="'Ingrese su email'"
                                                        >
                                                    </div>
                                                    <div class="w-70 form-password input-group">
                                                        <input type="password"
                                                            v-model="password"
                                                            name="password"
                                                            class="input-barna"
                                                            :placeholder="'Ingrese su contraseña'"
                                                        >
                                                    </div>
																
                                            </div>
                                        
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class=" site-btn-login site-btn-default pull-right" @click="inicio" data-dismiss="modal">Atrás</button>
                                        <button type="button" @click.stop.prevent="" class="site-btn-login pull-right">Ingresar</button>
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
	import headerComponent from "../../../components/layouts/headerComponent.vue";
    import migajasComponent from "../../../components/layouts/migajasComponent.vue";
    import loading from "../../../components/layouts/loading.vue";

    export default {
        name:'registerComponent',
        components:
        {
            headerComponent,
            migajasComponent,
            loading
		},
        props:
        {
            url:
            {
	            type: String,
	            require:true
        	}
        },
        data() {
			return {
                isLoading: false,
                isDesign: false,
                name: '',
                email: '',
                last_name: '',
                phone: '',
                password: '',
                confirm_password: '',
                numCart: 0,
                numBag: 0,
                isAuth: false,
                search: '',
                rubro: '',
                titulo: '',
                msg: ''
			}
		},
        mounted()
        {

        },
        methods:
        {   
            inicio(){
                location.replace(this.url)

            },
            register(){
                this.isLoading = true
                var dataform = new FormData();
                dataform.append('name', this.name);
                dataform.append('last_name', this.last_name);
                dataform.append('phone', this.phone);
                dataform.append('password', this.password);
                dataform.append('email',this.email);
                var urli = this.url+'/register/post';
                axios.post(urli,dataform).then(response => 
                {
                    if(response.data.res){
                        this.msg = response.data.msg
                        this.isLoading= false
                        $('#modalRegister').modal('show');

                    } else {
                        
                    }
                }).catch( error =>
                {
                    this.msg= 'Ha ocurrido un error inesperado'
                    this.isLoading= false
                });
            },
            loginM(e)
            {
                console.log(e)
            },
            designM(e)
            {
                
            },
            searchM(e)
            {
            	
            },
            searchK(e)
            {
            	
            }
		},
    }
</script>