<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
class AttendanceController extends Controller
{
    public function getCurrentTime(){
        $dateTime=Carbon::now('GMT+2')->format("D y-m-d H:i");
        
         return  $dateTime;
    }
    public function viewQR(){
        return view("QR-generator");
    }
}
