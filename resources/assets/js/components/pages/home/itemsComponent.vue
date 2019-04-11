<template>
	<!-- Features section -->
	<section class="features-section mt-4 mb-3">
		<div class="container-fluid">
			<div class="row d-flex flex-direction-xs">
				<div class="feature feature-barna">
					<div class="feature-inner d-flex flex-column justify-content-start">
						<div class="feature-icon feature-icon-barna mb-4">
							<i class="fa fa-drivers-license font-24 center-element"></i>
						</div>
						<p class="font-18 mb-0">Fast Secure Payments: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla harum omnis officiis</p>
					</div>
				</div>
				<div class="feature feature-barna">
					<div class="feature-inner d-flex flex-column justify-content-start">
						<div class="feature-icon feature-icon-barna mb-4">
							<i class="fa fa-check font-24 center-element"></i>
						</div>
						<p class="font-18 mb-0">Premium Products: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos harum eveniet </p>
					</div>
				</div>
				<div class="feature feature-barna">
					<div class="feature-inner d-flex flex-column justify-content-start">
						<div class="feature-icon feature-icon-barna mb-4">
							<i class="fa fa-send font-24 center-element"></i>
						</div>
						<p class="font-18 mb-0">Free & fast Delivery: Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore doloribus dolores eaque facilis at</p>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Features section end -->
</template>

<script>
    export default {
        name:'itemsComponent',
        props: {
            url: {
                type: String,
                required: true
            }
        },
        mounted() {
        }
    }
</script>
