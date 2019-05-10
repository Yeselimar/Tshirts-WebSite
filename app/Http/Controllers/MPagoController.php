<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use MP;
use App\Http\Controllers\Controller;

class MPagoController extends Controller
{
    public function pagar()
    {
        $hola = 'hola';
                // Precio a cobrar
                $precio = "199.99";
                // Concepto de compra
                $concepto = "Compra en mi sitio web.";
                // URL's de retorno
                // sustituye "mi-proyecto" por el nombre que le diste a tu carpeta de proyecto
                $regreso   = "http://localhost:8000/disenar/1";
                $cancelado = "http://localhost:8000/disenar/2";
                // Inicializar mercadopago
                $mp = new MP('1882416428848620', 'MEZuWJzEpD1WIabZkBlAuxN26iPkDqLE');
                // Configuramos los datos del cobro
                $preferenceData = [
                    'items' => [
                        [
                            'id' => 12,
                            'category_id' => 'phones',
                            'title' => 'iPhone 6',
                            'description' => 'iPhone 6 de 64gb nuevo',
                            'picture_url' => 'http://d243u7pon29hni.cloudfront.net/images/products/iphone-6-dorado-128-gb-red-4g-8-mpx-1256254%20(1)_m.png',
                            'quantity' => 1,
                            'currency_id' => 'ARS',
                            'unit_price' => 14999
                        ]
                    ],
                    "default_payment_method_id" => "visa", // método de pago por default
                    "installments" => 1,
                    "back_urls" => [
                    "success" => $regreso,
                    "failure" => $cancelado
                    ]
                ];

                // Enviar los datos al API de Mercado Pago para la generación del link
        // $preference = $mp->create_preference($preference_data);
            $preference = MP::create_preference($preferenceData);

                // Redireccionar al usuario a la página de pago en modo sandbox
            $pagar=$preference['response']['sandbox_init_point']; // puedes usar $preference['response']['init_point'] para aceptar reales


                return response()->json(['hola' => $preference, 'pagar' => $pagar]);
    }
    function respuestaMP(Request $request){
        dd($request);
    }
}