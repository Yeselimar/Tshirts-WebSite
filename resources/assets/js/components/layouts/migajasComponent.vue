<template>
	<div>
		<div class="page-top-info">
			<div class="container">
				<h2>{{titulo}}</h2>
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
