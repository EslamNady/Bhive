<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class indexController extends Controller
{
    public function __construct()
    {
        $this->middleware(['guest:employees','guest']);
    }
    public function showIndex(){
        return view('welcome');
    }
}
