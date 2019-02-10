<?php


namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Hash;

use App\Employee;
class EmployeesLoginController extends Controller
{
    public function __construct(){
        $this->middleware(['guest:employees','guest'],['except'=>['logout']]);
    }

    public function showLoginForm(){
        return view('auth.employees-login');
    }
    public function login(Request $request){

        //validate the form data
        $this->validate($request,[
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        //attempt to log the user in
        if(Auth::guard('employees')->attempt(['email' => $request->email, 'password' => $request->password],$request->remember)){
            $employee=Employee::where('email',$request->email)->first();
            return redirect()->route('employees.dashboard');
        }

        return redirect()->back()->withInput($request->only('email','remember'));
    }
    public function showRegisterForm(){
        return view('auth.employees-register');
    }
    public function register(Request $request){
        $this->validate($request,[
            'email' => 'required|email|unique:employees',
            'password' => 'required|confirmed|min:6',
            'name' => 'required',
            'title' => 'required'
        ]);
        $employee=new Employee;
        $employee->name=$request->name;
        $employee->title=$request->title;
        $employee->password= Hash::make($request->password);
        $employee->email=$request->email;
        $employee->save();
        return redirect()->route('employees.login')->withInput(['email'=>$request->email]);
    }

}
