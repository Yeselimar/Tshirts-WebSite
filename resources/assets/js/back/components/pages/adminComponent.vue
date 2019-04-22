<template>
  <div>
     <h3>En esta entra un usuario con rol admin</h3>
        <button @click="logout">Logout</button>
        <router-link to="/admin">Ir a raiz</router-link>
   </div>
</template>
<script>
import CerService from "../../../plugins/CerService";

export default {
  data () {
    return {
      message: 'Hoera!!!!'
    }
  }, methods: {
  	logout (){
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
	          });
	      }
  }
};
</script>