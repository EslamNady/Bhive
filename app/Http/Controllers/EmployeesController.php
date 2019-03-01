<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers;
use App\Employee;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\EmployeesSkillsResource;
use App\Http\Resources\ActivityResource;
use App\Http\Resources\TasksResource;
use App\Skill;
use App\Task;
use Session;
use Datetime;
use Carbon\Carbon;
class EmployeesController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:employees');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employee=Employee::find(Auth::id());

        return view('employeesHome')->with('employee',new EmployeeResource($employee));
    }
    public function getSkills($empID){
        $emp=Employee::find($empID);
        $skills=$emp->skills;
        return EmployeesSkillsResource::collection($skills);
    }
    public function saveSkills(Request $request){
        $skills=$request->get('skills');
        $employeeID=$request->get('employeeID');
        //delete all skills
        $employee=Employee::find($employeeID);
        $employee->skills()->detach();
        //add the modified skills
        foreach($skills as $key => $skill){
            $skil=new Skill;
            $skil->name=$skill['name'];
            $skil->id=$skill['id'];

            $skil->employees()->attach($employeeID);
            \DB::table('employee_skills_relations')->where('skill_id', $skil->id)->where('employee_id', $employeeID)->update(array('skill_level' => $skill['level']));
        }

        return response()->json([
            'msg' => 'done successfully',
        ],200);
    }
    public function getUpcomingTasks($employeeID){
        $today=Carbon::today()->toDateString();
        $tasks=Employee::find($employeeID)->tasks->where('startDate','>',$today);
        return ActivityResource::collection($tasks);

    }
    public function getPrevTasks($employeeID){
        $today=Carbon::today()->toDateString();
        $tasks=Employee::find($employeeID)->tasks()->where('startDate','<=',$today)->wherePivot('submitted',"=",true)->get();
        return ActivityResource::collection($tasks);

    }
    public function getOngoingTasks($employeeID){
        $today=Carbon::today()->toDateString();
        $tasks=Employee::find($employeeID)->tasks()->where('startDate','<=',$today)->wherePivot('submitted',"=",false)->get();
        return ActivityResource::collection($tasks);

    }

    public function taskSubmitView($taskID){
        $task=Task::find($taskID);
        $task->startDate = Carbon::parse($task->startDate); 
        $task->startDate->toDateString();

        $task->endDate = Carbon::parse($task->endDate); 
        $task->endDate->toDateString();
        
        $emp=$task->employees->where('id',"=",Auth::id());
        if(count($emp)<1){
            return response()->json([
                'msg' => "You don't have access to this page",
            ],404);
        }
        else{
            return view("employees.submissionView")->withTask($task);
        }
    }

    public function taskSubmit(Request $request){

        $link=$request->link;
        $comment=$request->comment;
        $task=$request->task;
        $employee=Employee::find(Auth::id());
        
        // time 1-1.5   2-1   3-0 (25% -1 < 50% -2 <70% -5 )
        // 0   (1.5)
        // feedback 0 < 2.5 < (3.5)
        $duration=$task['duration'];

        $endDate= $task['endDate']; 
        $endDate = Carbon::parse($endDate);

        $today=Carbon::today();
        $remainingDays = $endDate->diffInDays($today);
        $daysRatio=$remainingDays/(float)$duration;
        
        $subScore=0.0;
        if($endDate>=$today){ //possitive
            if($daysRatio>=0.75){
                $subScore=1.5;
            }else if ($daysRatio>=0.5) {
                $subScore=1;
            }else {
                $subScore=0;
            }
        }else { //nevative
            if($daysRatio>=0.75){
                $subScore=-1.5;
            }else if ($daysRatio>=0.5) {
                $subScore=-1;
            }else {
                $subScore=-0.5;
            }
        }
        $emploee=Employee::find(Auth::id());
        $employee->submitted_tasks_num++;
        $employee->save();
        
        $taskDB=Task::find($task['id']);
        $employees_num=$taskDB->resources_number;
        $taskDB->progress+=100/(float)$employees_num;
        $taskDB->save();

        \DB::table('activity_timeline')->where('task_id', $task['id'])->where('employee_id', Auth::id())->update(array('submission_date' => $today,'time_score'=>$subScore,'submission_link' => $link, 'note' => $comment, 'submitted'=> true));
        Session::flash('message', 'Task Submitted Success!');
        return new EmployeeResource($employee);
        
    }
}
