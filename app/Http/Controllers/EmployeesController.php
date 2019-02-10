<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers;
use App\Employee;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\EmployeesSkillsResource;
use App\Http\Resources\ActivityResource;
use App\Skill;
use App\Task;
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
        $tasks=Employee::find($employeeID)->tasks->where('endDate','<',$today);
        return ActivityResource::collection($tasks);

    }
    public function getOutgoingTasks($employeeID){
        $today=Carbon::today()->toDateString();
        $tasks=Employee::find($employeeID)->tasks->where('endDate','>=',$today)->where('startDate','<=',$today);
        return ActivityResource::collection($tasks);

    }
}
