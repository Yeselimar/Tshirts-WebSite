<template>

        <!-- Page wrapper  -->
        <div class="page-wrapper">


            <!-- Bread crumb -->
            <div class="row page-titles">
                <div class="col-md-5 align-self-center">
                    <h3 class="text-primary">Panel de Control</h3> </div>
                <div class="col-md-7 align-self-center">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="javascript:void(0)">Inicio</a></li>
                        <li class="breadcrumb-item active">Panel de Control</li>
                    </ol>
                </div>
            </div>
            <!-- End Bread crumb -->

            <!-- Container fluid  -->
            <div class="container-fluid">
                <!-- Start Page Content -->
                <div class="row">
                    <div class="col-md-3">
                        <div class="card bg-primary p-20">
                            <div class="media widget-ten">
                                <div class="media-left meida media-middle">
                                    <span><i class="ti-bag f-s-40"></i></span>
                                </div>
                                <div class="media-body media-text-right">
                                    <h2 class="color-white">278</h2>
                                    <p class="m-b-0">Artículos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-pink p-20">
                            <div class="media widget-ten">
                                <div class="media-left meida media-middle">
                                    <span><i class="ti-comment f-s-40"></i></span>
                                </div>
                                <div class="media-body media-text-right">
                                    <h2 class="color-white">278</h2>
                                    <p class="m-b-0">Compras</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-success p-20">
                            <div class="media widget-ten">
                                <div class="media-left meida media-middle">
                                    <span><i class="ti-vector f-s-40"></i></span>
                                </div>
                                <div class="media-body media-text-right">
                                    <h2 class="color-white">27647</h2>
                                    <p class="m-b-0">Pedidos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card bg-danger p-20">
                            <div class="media widget-ten">
                                <div class="media-left meida media-middle">
                                    <span><i class="ti-location-pin f-s-40"></i></span>
                                </div>
                                <div class="media-body media-text-right">
                                    <h2 class="color-white">556</h2>
                                    <p class="m-b-0">Usuarios</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    
                    <!-- /# column -->
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-title">
                                <h4>Visitor in Device</h4>
                            </div>
                            <div class="card-body">
								<div class="table-responsive">
									<table class="table table-hover ">
										<thead>
											<tr>
												<th>Device</th>
												<th>Visits</th>
												<th>Avg. time</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Unknown</td>
												<td>2,456</td>
												<td>00:02:36</td>
											</tr>
											<tr>
												<td>Apple iPad</td>
												<td>1,006</td>
												<td>00:03:41</td>
											</tr>
											<tr>
												<td>Apple iPhone</td>
												<td>68</td>
												<td>00:04:10</td>
											</tr>
											<tr>
												<td>HTC Desire</td>
												<td>38</td>
												<td>00:01:40</td>
											</tr>
											<tr>
												<td>Samsung</td>
												<td>20</td>
												<td>00:04:54</td>
											</tr>
											<tr>
												<td>Apple iPad</td>
												<td>1,006</td>
												<td>00:03:41</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
                        </div>
                    </div>
				</div>
				

                <!-- End PAge Content -->
            </div>
            <!-- End Container fluid  -->


            <!-- footer -->
            <footer class="footer"> 2019 Todos los derechos reservados. Desarrollado por <a href="https://afodi.com">AFODI</a></footer>
            <!-- End footer -->


        </div>
        <!-- End Page wrapper  -->
</template>

<script>

import CerService from "../../../plugins/CerService";


export default {
    data () {
        return {
          message: 'Hoera!!!!', 
        }
    },
    
    methods:
    {
    
    }
};
</script>


