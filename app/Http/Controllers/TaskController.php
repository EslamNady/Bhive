<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employee;

use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;

class TaskController extends Controller
{
    public function giveFeedback(Request $request){
        $submissionID= $request->get('submissionID');
        $completeness= (int)$request->get('completeness');
        $complexity= $request->get('complexity');
        $feedbackScore=0.0;

        if($completeness>=60){
            if($complexity==3)
                $feedbackScore=3.5;
            else if ($complexity==2)
                $feedbackScore=3;
            else
                $feedbackScore=1.75;
            
            if($completeness>=70&&$completeness<80)
                $feedbackScore/=2;
            else if($completeness>=80&&$completeness<90)
                $feedbackScore/=1.75;
            else if($completeness>=60&&$completeness<70)
                $feedbackScore=0;
        }
        else{
            if($complexity==3)
                $feedbackScore=1.75;
            else if ($complexity==2)
                $feedbackScore=3;
            else
                $feedbackScore=3.5;
            
            if($completeness>=50&&$completeness<60)
                $feedbackScore/=-2;
            else if($completeness<50)
                $feedbackScore/=-1.75;
        }
        \DB::table('activity_timeline')->where('id', $submissionID)->update(array('feedback_score'=>$feedbackScore,'gave_feedback'=> true));
        $submission=\DB::table('activity_timeline')->where('id', $submissionID)->first();
        

        $Employee=Employee::find($submission->employee_id);
        $this->scoreEmployeeTasks($Employee->email,$submission->time_score,$feedbackScore);


        return "1";
        
    }

    public function scoreEmployeeTasks($email,$time,$feedback){
        
        $email=preg_replace('/\./', ',', $email);

        $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();
        $database = $firebase->getDatabase();
        $prevScore=$database->getReference('Employees')->getChild($email)->getChild('tasksScore')->getValue();
        $task_num=$database->getReference('Employees')->getChild($email)->getChild('tasks_num')->getValue();
        $prevScore*=$task_num;
        $task_num+=1;
        $prevScore=($prevScore+$time+$feedback)/($task_num);
        $database->getReference('Employees')->getChild($email)->getChild('tasksScore')->set($prevScore);
        $database->getReference('Employees')->getChild($email)->getChild('tasks_num')->set($task_num);
        

        
    }
}
