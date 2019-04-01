<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
class AttendanceController extends Controller
{
    public function getCurrentTime(){
        $dateTime=Carbon::now('eet')->format("D y-m-d H:i:s");
        
         return  $dateTime;
    }
    public function viewQR(){
        return view("QR-generator");
    }
}
