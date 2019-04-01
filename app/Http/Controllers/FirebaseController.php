<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use Session;
class FirebaseController extends Controller
{
    //
    public function signupFirebase(){
        $employee=Session::get('employee');
        $employee=json_decode($employee);
        $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();
        $database = $firebase->getDatabase();
        $timeTable=$database->getReference('TimeTable')->getValue();
        $newEmployee = $database->getReference('Employees')->getChild(preg_replace('/\./', ',', $employee->email))->set([
                                                                'info'=> [
                                                                'email' => $employee->email,
                                                                'first_name'=>$employee->first_name,
                                                                'last_name'=>$employee->last_name,
                                                                'title' => $employee->title ],
                                                                'attendanceScore'=> 0,
                                                                'working_days_num'=> 0,
                                                                'lastDayScore'=>0,
                                                                'attended_days_num' => 0,
                                                                'timeTable'=>$timeTable,
                                                                'password' => $employee->password,

                                                                ]);
        // //$newPost->getKey(); // => -KVr5eu8gcTv7_AHb-3-
        //$newPost->getUri(); // => https://my-project.firebaseio.com/blog/posts/-KVr5eu8gcTv7_AHb-3-
        //$newPost->getChild('title')->set('Changed post title');
        //$newPost->getValue(); // Fetches the data from the realtime database
        //$newPost->remove();

        return redirect()->route('employees.login')->withInput(['email'=> $employee->email]);
    }
}
?>