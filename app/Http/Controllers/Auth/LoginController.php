<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;


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
        $this->middleware('guest')->except('logout');
    }
    public function postlogin(Request $request)
    {
        $request->validate([
            'email' 			 	=> 'required|email',
            'password'				 	=> 'required',
        ]);
        $user = User::where('email','=',$request->email)->first();
        
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        {
            //return redirect()->route('dalepaso');
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
            $msg = 'autentificación exitosa';
            return response()->json(['res' => 1,'msg'=>$msg]);
            
            /*
            if($user)
            {
                if($user->estatus==0)
                {
                    flash("Disculpe, el usuario está inactivo.","danger");
                }
                else
                {
                    flash("Disculpe, correo y/o contraseña incorrecta.","danger");
                }
            }
            else
            {
                flash("Disculpe, el usuario no existe.","danger");
            }
            return redirect()->back();   
            */
        }

    }
}
