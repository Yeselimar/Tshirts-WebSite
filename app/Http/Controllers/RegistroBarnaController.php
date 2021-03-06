<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;


class RegistroBarnaController extends Controller
{
    //
    public function registerPost(Request $request)
    {
        //dd($request);
        $request->validate([
            'email' 			 	=> 'required|email',
            'password'				 	=> 'required',
            'name'				 	=> 'required',
            'phone'				 	=> 'required',
            'last_name'				 	=> 'required',
        ]);
        $email_existe = User::where('email','=',$request->email)->first();
        if(empty($email_existe))
        {  
        	$user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->last_name = $request->last_name;
            $user->password = bcrypt($request->password);
            $user->rol= 'user';
            $user->phone = $request->phone;
            $user->remember_token = str_random(10);
            $user->save();
            
            return response()->json(['res' => 1,'msg'=> 'Su registro se ha completado exitosamente!']);
        }
        else
        {
            return response()->json(['res' => 0,'msg'=> 'Error Email ya registrado']);

            //flash("Disculpe, ya existe un usuario con el correo electrónico y/o con la cédula suministrada.",'danger');
        }


    }
}
