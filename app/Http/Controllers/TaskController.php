<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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

        return "1";
        


    }
}
