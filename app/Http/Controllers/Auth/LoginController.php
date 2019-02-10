<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

use Auth;
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
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except(['logout','userLogout']);
    }

    public function userLogout(Request $request)
    {
        if(Auth::guard('web')->check()){
            Auth::guard('web')->logout(); 
            $request->session()->flush();
            $request->session()->regenerate();
        
            // return redirect()->guest(route( 'home' ));
 
        }
        else if(Auth::guard('admin')->check()){
            Auth::guard('admin')->logout();
            $request->session()->flush();
            $request->session()->regenerate();
            // return redirect()->guest(route( 'admin.login' ));

        }
        return redirect('/');
    }

}
