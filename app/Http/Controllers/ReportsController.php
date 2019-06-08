<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProjectsResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\TaskDetailsResource;
use App\Http\Resources\TasksResource;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use App\Project;
use App\Task;
use App\Skill;
use App\Employee;

class ReportsController extends Controller
{
    public function index(){
        return view("reports");
    }
    public function getAllData(){
        $employees= EmployeeResource::collection(Employee::all());
        $projects= ProjectsResource::collection(Project::all());
        return [$employees,$projects];
    }
    public function getContent(Request $request){
        if($request->type=="employee"){
            $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
            $firebase = (new Factory)
            ->withServiceAccount($serviceAccount)
            ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
            ->create();
            $database = $firebase->getDatabase();


            $employee=Employee::find($request->id);
            //personal info
            $empPersonalInfo=new EmployeeResource($employee);
            //score and timetable
            $newEmployee = $database->getReference('Employees')->getChild(preg_replace('/\./', ',', $employee->email));
            $score=$newEmployee->getChild('totalScore')->getValue();
            $tasksScore=$newEmployee->getChild('tasksScore')->getValue();
            $attendanceScore=$newEmployee->getChild('attendanceScore')->getValue();
            $timeTable=$newEmployee->getChild('timeTable')->getValue();
            
            //skills

            $skills=$employee->skills;
            //tasks 
            $tasks=$employee->tasks;
            $tasks=TasksResource::collection($tasks);
            $sorted=$tasks->sortBy("project_id");
            $sorted->values()->all();
            $taskDetails=TaskDetailsResource::collection($tasks);
            
            //number of working hours
            $workingDays=$newEmployee->getChild('workingHours')->getValue();
            $totalHours=0;
            if($workingDays!==null){
            foreach($workingDays as $key => $value) {
                $totalHours=$totalHours+$value['totalHours'];
                
            }
        }
            //absence percentage
            $totalDays=$newEmployee->getChild('working_days_num')->getValue();
            $absenceDays=0;
            $absencePercent=0;
            if($totalDays!==0){
                $absenceDays=$totalDays-$newEmployee->getChild('attended_days_num')->getValue();
                $absencePercent=($absenceDays/$totalDays)*100;
            }
            return [
                "personalInfo"=> $empPersonalInfo,
                "score" => $score,
                "tasksScore"=>$tasksScore,
                'attendanceScore'=>$attendanceScore,
                "timeTable"=>$timeTable,
                "skills" => $skills,
                "tasks"=> $sorted,
                "taskDetails"=> $taskDetails,
                "totalHours"=> $totalHours,
                "absencePercent" => $absencePercent,
            ];

        }
        else{
            $project=Project::find($request->id);
            $tasks=$project->task;
            $tasks=TasksResource::collection($tasks);
            return [
                "project"=>new ProjectsResource($project),
                "taskDetails"=>$tasks,
            ];
        }
    }
}
