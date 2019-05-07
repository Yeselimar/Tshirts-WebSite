<style scoped>
.loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
<template>
        <!--loading-->
        <div class="loading">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
        </div>
        <!--end loading-->
</template>

<script>
    export default {
        name:'isLoading'
    }
</script>
