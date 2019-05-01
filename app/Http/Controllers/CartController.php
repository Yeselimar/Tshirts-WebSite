<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Auth;


class CartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function addCart(Request $request){

        if(Auth::check()){
            $user = Auth::user();
            $cart = $request->cart;
            return response()->json(['res' => 1,'cart'=>$cart]);
        } else {
            return response()->json(['res' => 0]);
        }
    }
}