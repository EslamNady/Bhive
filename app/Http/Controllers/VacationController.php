<?php

namespace App\Http\Controllers;

use App\Employee;
use Illuminate\Http\Request;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use App\Task;
use Datetime;
use Carbon\Carbon;

class VacationController extends Controller
{
    public function accept(Request $request){
        $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();
        $database = $firebase->getDatabase();

        $empEmail=preg_replace('/\,/', '.', $request->empID);
        $employee=Employee::where('email',$empEmail)->first();
        $start= Carbon::parse($request->start);
        $end= Carbon::parse($request->end);
        $all_dates = array();
        $assignedTasks=array();
        $assignedTasksID=array();
        $allTasks=$employee->tasks;

        foreach($allTasks as $taskk){
            $start=Carbon::parse($request->start);
            while ($start->lte($end)){
                $all_dates[] = $start->toDateString();
                if(($taskk->startDate<=$start->toDateString())&&($taskk->endDate>=$start->toDateString())){      
                    array_push($assignedTasks,$taskk);
                    array_push($assignedTasksID,$taskk->id);
                    break;
                }

                $start->addDay();
            }
        }
        

        print_r($assignedTasksID); 
        
        $employee->tasks()->detach($assignedTasksID);
        foreach($assignedTasks as $assignedTask){
            
            for($e=1;$e<=$assignedTask->resources_number;$e++){
                $i=1;
                $firstEmp=true;
                $minDistance=0;
                $empID=null;
            
            $employees=Employee::where('id','<>',$employee->id)->get();
            
            foreach($employees as $employee){
                $activities=$employee->tasks;
                $busy=false;
                //lw fe agaza
                $vacations = $database->getReference('Employees')->getChild(preg_replace('/\./', ',', $employee->email))->getChild('vacations')->getValue();
                
                if($vacations!==null){
                    foreach($vacations as $key => $value) {
                        
                        if($assignedTask->startDate<=Carbon::parse($key)&&Carbon::parse($key)<=$assignedTask->endDate)
                            {
                                $busy=true;
                                break;
                            }
                    }
                }

                foreach($activities as $activity){

                    $activityTask=Task::where('id',$activity->id)->first();
                    if( ($assignedTask->startDate <= $activityTask->startDate && $assignedTask->endDate <= $activityTask->startDate) || $assignedTask->startDate >= $activityTask->endDate )
                        continue;
                    else{
                        $busy=true;
                        break;
                    }
                }
                $found=false;
                print_r($busy);

                if(!$busy){
                    $empSkills=$employee->skills;
                    $taskSkills=$assignedTask->skills;
                    
                    $distance=0;
                    foreach($taskSkills as $taskSkill){
                        $employeeSkillLevel=1000;
                        foreach($empSkills as $empSkill){
                            if($taskSkill->skill_name==$empSkill->skill_name){
                                $employeeSkillLevel=(float)\DB::table('employee_skills_relations')->where('skill_id', $empSkill->id)->where('employee_id', $employee->id)->first()->skill_level;
                                $found=true;
                                break;
                            }
                        }
                        
                        $taskSkillLevel=(int)\DB::table('skills_tasks_relations')->where('skill_id', $taskSkill->id)->where('task_id', $assignedTask->id)->first()->skill_level;
                        $distance+=pow(($employeeSkillLevel-$taskSkillLevel),2);
                        var_dump("comulative ".$distance);
                    }
                    var_dump($found);
                    $distance=sqrt($distance);
                    var_dump("final ".$distance);
                    var_dump($employee->name);
                    if($firstEmp){
                        $minDistance=$distance;
                        $empID=$employee->id;
                        $firstEmp=false;
                    }else{
                        if($distance<$minDistance){
                            $minDistance=$distance;
                            $empID=$employee->id;
                            
                        }
                    }

                    
                }
                // print_r($employee);

            }
            print_r($empID);

            if($empID!==null)
            {
                print_r($empID);
                $assignedTask->employees()->attach($empID);
            }
            }

        }


        
        return response()->json([
            'msg' => 'done successfully',
        ],200);
    }
}
