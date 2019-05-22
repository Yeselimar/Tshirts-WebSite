<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Carrito;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
        ///$this->middleware('guest')->except('logout');
    }
    public function postlogin(Request $request)
    {
        if(Auth::check()){
            
            $msg = 'Disculpe, su sesión actualmente se encuentra activa';
            return response()->json(['res' => 0,'msg'=>$msg]);
            
        } else {
            $request->validate([
                'email' 			 	=> 'required|email',
                'password'				 	=> 'required',
            ]);
            $user = User::where('email','=',$request->email)->first();
            
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password]))
            {
                $user=Auth::user();
                $msg = 'Hola '.$user->name.' '.$user->last_name.',<br/>Has iniciado sesión exitosamente';
                Auth::login( $user );
                $cart = [];
                $bag = [];

                return response()->json(['res' => 1,'msg'=>$msg,'user'=>$user,'cart'=>$cart,'bag' => $bag]);
            }
            else
            {
                if($user){
                    
                    $msg = "Disculpe, correo y/o contraseña incorrecta.";
                    return response()->json(['res' => 0,'msg'=>$msg]);
    
                } else {
                    $msg = "Disculpe, el usuario no existe.";
                    return response()->json(['res' => 0,'msg'=>$msg]);
    
                }

              
            }
        }
        

    }
    public function logout()
    {
        if(!(Auth::check())){
            
            $msg = 'Actualmente no tiene sesión activa';
            return response()->json(['res' => 0,'msg'=>$msg]);
        }
        Auth::logout();
        $msg = "Su sesión fue cerrada exitosamente.";
        return response()->json(['res' => 1,'msg'=>$msg]);
    }
    public function isLoged()
    {
        if(Auth::check()){
            $user=Auth::user();
            $cart = Carrito::paraUsuario($user->id)->with("articulo")->with("color")->with("talle")->get();
            foreach ($cart as $item)
            {
                $encontrado = false;
                $encontrado2 = false;
                $longitud = $item->articulo->imagenesarticulos->count();
                if($longitud>0)
                {
                    //----------------------------------------------------
                    //Buscando la imagen correspondiente al color comprado
                    $i = 0;
                    $imagenes = $item->articulo->imagenesarticulos;
                    while(!$encontrado && $i<$longitud)
                    {
                        if($imagenes[$i]->caracteristica_id==$item->color_id)
                        {
                            $imagen = $imagenes[$i];
                            $encontrado = true;
                        }
                        $i++;
                    }
                    if($encontrado)
                    {
                        $item['imagen'] = $imagen;
                    }
                    //---------------------------------------------------
                    //Buscando la imagen principal
                    $j = 0;
                    $imagenes2 = $item->articulo->imagenesarticulos;
                    while(!$encontrado2 && $j<$longitud)
                    {
                        if($imagenes2[$j]->principal==1)
                        {
                            $imagen2 = $imagenes2[$j];
                            $encontrado2 = true;
                        }
                        $j++;
                    }
                    if($encontrado2)
                    {
                        $item['principal'] = $imagen2;
                    }
                }
            }
            $bag = [];
            return response()->json(['res' => 1,'user'=> $user,'cart'=>$cart,'bag'=>$bag]);
        } else {
            return response()->json(['res' => 0]);
        }
    }


    //Para Admin
    public function postloginAdmin(Request $request)
    {
        if(Auth::check()){
            if(Auth::user()->rol == 'user'){
                Auth::logout();
            } else {
                $msg = 'Disculpe, su sesión actualmente se encuentra activa';
                return response()->json(['res' => 0,'msg'=>$msg]);
            }
            
        } else {
            $request->validate([
                'email' 			 	=> 'required|email',
                'password'				 	=> 'required',
            ]);
            $user = User::where('email','=',$request->email)->where('rol','=','admin')->first();
            
            if ($user && Auth::attempt(['email' => $request->email, 'password' => $request->password]))
            {
                $user=Auth::user();
                $msg = 'Hola '.$user->name.' '.$user->last_name.',<br/>Has iniciado sesión como admin exitosamente';
                Auth::login( $user );
                return response()->json(['res' => 1,'msg'=>$msg,'user'=>$user]);
            }
            else
            {
                if($user){
                    
                    $msg = "Disculpe, correo y/o contraseña incorrecta.";
                    return response()->json(['res' => 0,'msg'=>$msg]);
    
                } else {
                    $msg = "Disculpe, el usuario admin no existe.";
                    return response()->json(['res' => 0,'msg'=>$msg]);
    
                }

              
            }
        }
        

    }
    public function logoutAdmin()
    {
        if(!(Auth::check())){
            
            $msg = 'Actualmente no tiene sesión activa';
            return response()->json(['res' => 0,'msg'=>$msg]);
        }else {
            if(Auth::user()->rol !== 'admin'){
                $msg = 'Actualmente no tiene sesión activa como admin';
            return response()->json(['res' => 0,'msg'=>$msg]);
            } else {
                Auth::logout();
                $msg = "Su sesión fue cerrada exitosamente.";
                return response()->json(['res' => 1,'msg'=>$msg]);
            }
        }

    }
    public function isLogedAdmin(){
        if(Auth::check()){
            if(Auth::user()->rol == 'admin')
            {
                $user=Auth::user();
                return response()->json(['res' => 1,'user'=> $user]);
            }
        } 
        
        return response()->json(['res' => 0]);
       
    }
}
