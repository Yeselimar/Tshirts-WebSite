<template>
	<div>
		<div class="page-top-info">
			<div class="container">
				<p class="h2">{{titulo}}</p>
			</div>
		</div>
	</div>
</template>

<script>
    export default
    {
        name:'migajasComponent',
        props:
        {
            titulo:
            {
                type: String,
                require:true
            }
        },
        mounted()
        {

        }

    }
</script>
