<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
class AttendanceController extends Controller
{
    public function getCurrentTime(){
        $dateTime=Carbon::now('eet');
        return $dateTime;
    }
    public function viewQR(){
        return view("QR-generator");
    }
}
