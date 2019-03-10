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
        var_dump($employee);
        $employee=json_decode($employee);
        $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();
        $database = $firebase->getDatabase();
        
        $newPost = $database->getReference('Employee')->getChild(preg_replace('/\./', ',', $employee->email))->set([
                                                                'email' => $employee->email,
                                                                'password' => $employee->password,
                                                                'title' => $employee->title,
                                                                ]);
        // //$newPost->getKey(); // => -KVr5eu8gcTv7_AHb-3-
        //$newPost->getUri(); // => https://my-project.firebaseio.com/blog/posts/-KVr5eu8gcTv7_AHb-3-
        //$newPost->getChild('title')->set('Changed post title');
        //$newPost->getValue(); // Fetches the data from the realtime database
        //$newPost->remove();

        // return redirect()->route('employees.login')->withInput(['email'=>$request->email]);
    }
}
?>