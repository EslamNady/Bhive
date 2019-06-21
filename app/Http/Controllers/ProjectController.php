<?php

namespace App\Http\Controllers;
use App\Http\Resources\TemplatesResource;
use App\Http\Resources\TemplateTaskResource;
use App\Http\Resources\ProjectsResource;
use App\Http\Resources\TasksResource;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\SubmittedTasksResource;
use Illuminate\Http\Request;
use App\TemplateTask;
use App\TemplateProject;
use App\Project;
use App\Task;
use App\Skill;
use App\Employee;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use Auth;
use Datetime;
use Carbon\Carbon;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('main');
    }
    public function list(){
        $projects=Project::all();
        return ProjectsResource::collection($projects);
    }
    public function ProjectListView(){
        return view('project.ProjectListView');
    }
    public function ProjectView($id){
        $project=Project::where('id',$id)->first();
        $project=new ProjectsResource($project);
        return view('project.ProjectView')->with(compact('project'));
    }
    public function sendprojectTasks($id){
        $tasks=Task::where('project_id',$id)->get();
        return TasksResource::collection($tasks);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */





    public function createNewProject(Request $request){

        $serviceAccount = ServiceAccount::fromJsonFile(storage_path().'/json/bhive-7020b-firebase-adminsdk-rrhlt-fc9dfba6b6.json');
        $firebase = (new Factory)
        ->withServiceAccount($serviceAccount)
        ->withDatabaseUri('https://bhive-7020b.firebaseio.com/')
        ->create();
        $database = $firebase->getDatabase();


        $data=$request->all();
        $newproject =new Project;
        $newproject->name= $request->get('name');
        $newproject->description= $request->get('description');
        $newproject->manager_id=Auth::id();
        $newproject->startDate= $request->get('startDate');

        $newproject->save();
        $project_id=$newproject->id;
        foreach($data['tasks'] as $key => $value){
            $empNum=$value['empNum'];
            
            $currentTask=0;
            $task=new Task;
            $predecessors=[];
            if(Task::where('temp_id',$value['id'])->where('project_id',$project_id)->count()>0){
                $task=Task::where('temp_id',$value['id'])->where('project_id',$project_id)->first();
                $currentTask=$task->id;
            }
            else{
                $task->name=$value['name'];
                $task->duration=$value['duration'];
                $task->temp_id=$value['id'];

                $task->project_id=$project_id;
                $task->resources_number=$empNum;
                $task->save();
                $currentTask=$task->id;
            }


            foreach($value['predecessors'] as $key2 => $pre){
                $preTaskID=0;
                $preTask;
                if(Task::where('temp_id',$pre['id'])->where('project_id',$project_id)->count()>0){
                    $preTask=Task::where('temp_id',$pre['id'])->where('project_id',$project_id)->first();
                    $preTaskID=$preTask->id;
                }
                else{
                    $preTask=new Task;
                    $preTask->name=$pre['name'];
                    $preTask->duration=$pre['duration'];
                    $preTask->project_id=$project_id;
                    $preTask->resources_number=$empNum;
                    $preTask->temp_id=$pre['id'];
                    $preTask->save();
                    $preTaskID=$preTask->id;
                }
                array_push($predecessors,$preTaskID);
            }
            if(count($predecessors)>0){
                for($i=0;$i<count($predecessors);$i++)
                    $task->predecessor()->attach($predecessors[$i]);
            }

            foreach($value['skills'] as $key2 => $skill){
                $skil=Skill::find($skill['id']);
                $ID=$skil->tasks()->attach($task->id);
                \DB::table('skills_tasks_relations')->where('skill_id', $skil->id)->where('task_id', $task->id)->update(array('skill_level' => $skill['level']));

            }
        

        }
        //calculations
        $tasks=Task::where('project_id',$project_id)->get();
        $predecessors=[];
        $successors=[];
        foreach($tasks as $task){
            if($task->predecessor->count()===0){
                array_push($predecessors,$task);
            }
        }
        foreach($predecessors as $pre){
            $pre->startDate=$newproject->startDate;
            $pre->endDate=$pre->startDate->addDays($pre->duration);
            $pre->save();
        }
        $i=0;

        while($i<count($predecessors)){
            $success=$predecessors[$i]->successor;
            foreach($success as $suc){
                if(is_null($suc->startDate)){
                    $suc->startDate=$predecessors[$i]->endDate;
                    $suc->endDate=$suc->startDate->addDays($suc->duration);
                    $suc->save();
                }
                else {
                    if($predecessors[$i]->endDate>$suc->startDate){
                        $suc->startDate=$predecessors[$i]->endDate;
                        $suc->endDate=$suc->startDate->addDays($suc->duration);
                        $suc->save();
                    }

                }
                array_push($predecessors,$suc);
            }
            $i++;
        }
        //Slack Calculations
        $tasks=Task::where('project_id',$project_id)->get();

        foreach($tasks as $task){
            $hisSuccessors=$task->successor;
            $k=0;
            $slack=0;
            foreach($hisSuccessors as $suc){
                if($k==0)
                    $slack=$task->endDate->diffInDays($suc->startDate);
                else{
                    $dif=$task->endDate->diffInDays($suc->startDate);
                    if($dif<$slack){

                        $slack=$dif;
                    }
                }
                $k++;
            }
            $task->slack=$slack;
            $task->save();
            
        }
        // adding skills to tasks

        
            
        
        // //geting all employees
        // $employees=Employee::all();

        $assignedTasks=Task::where('project_id',$project_id)->get();
        foreach($assignedTasks as $assignedTask){

            
            // var_dump($assignedTask->skills);
            //geting all employees
            // $empArray=[];
            
            for($e=1;$e<=$assignedTask->resources_number;$e++){
                $i=1;
                $firstEmp=true;
                $minDistance=0;
                $empID=null;
            
            $employees=Employee::all();
            foreach($employees as $employee){
                $activities=$employee->tasks;
                $busy=false;

                $vacations = $database->getReference('Employees')->getChild(preg_replace('/\./', ',', $employee->email))->getChild('vacations')->getValue();

                //lw fe agaza

                if($vacations!==null){
                    foreach($vacations as $key => $value) {
                        
                        if($assignedTask->startDate<=Carbon::parse($key)&&Carbon::parse($key)<=$assignedTask->endDate)
                            {
                                $busy=true;
                                break;
                            }
                    }
                }
                // print_r($vacations);

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
                // if(!$found){
                //     var_dump("emp: ".$employee->name);
                //     $empID=null;
                // }
            }
            if($empID!==null)
                $assignedTask->employees()->attach($empID);
            
            // array_push($empArray,$empID);    
            }

        }

        return response()->json([
            'msg' => 'done successfully',
        ],200);
    }
    public function create()
    {
        return view('project.selectTemplate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function getEmployee($taskID){
        $task=Task::find($taskID);
        // var_dump($task);

        $assignedEmployee=$task->employees;
        if($assignedEmployee===null){
            return null;
        }
        return EmployeeResource::collection($assignedEmployee);
    }


    
    

    public function getSubmittedTasks($id){
        $tasks=Task::where('project_id',$id)->with('employees')->get();
        
        return SubmittedTasksResource::collection($tasks);
    }

    // SUBSITUTE RESOURCE function

public function substituteResources(Request $request){
        $oldEmpID=$request->oldEmpID;
        $taskID=$request->taskID;
        $empID=$request->empID;

        // $oldEmpID=3;
        // $empID=2;
        // $taskID=94;

        $task=Task::find($taskID);
        $oldEmployee=Employee::find($oldEmpID);
        $newEmployee=Employee::find($empID);
        
        $oldEmployee->tasks()->detach($taskID);
        $newEmployee->tasks()->attach($taskID);
        
        return redirect()->back()->with('message',$newEmployee->first_name." has taken Task : ".$task->name." instead of :". $oldEmployee->first_name);
    }

    public function getProjectsSortedByDate(){
        $projects=Project::orderBy('startDate','DESC')->get();
        return projectsResource::collection($projects);
    }
}
