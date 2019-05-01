<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Auth;


class BagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function addBag(Request $request){

        if(Auth::check()){
            $user = Auth::user();
            $bag = $request->bag;
            return response()->json(['res' => 1,'bag'=>$bag]);
        } else {
            return response()->json(['res' => 0]);
        }
    }
}