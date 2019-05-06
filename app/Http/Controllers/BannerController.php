<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Banner;

class BannerController extends Controller
{
    public function index()
    {
    	$banners = Banner::with("articulos")->get();
    	return response()->json(['banners' => $banners]); 
    }
}
