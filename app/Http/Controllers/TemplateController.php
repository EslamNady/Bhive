<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\TemplatesResource;
use App\Http\Resources\TemplateTaskResource;
use App\TemplateProject;
use App\TemplateTask;
use App\Skill;
class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function getAllTemplates(){ //return all templates in database to the select to choose from templates
        return TemplatesResource::collection(TemplateProject::all());
    }

    public function sendTemplateTasks($id){   //gets the tasks of the selected template
        $template=TemplateTask::get()->where('template_project_id',$id);
        return TemplateTaskResource::collection($template);
    }

    public function addNewTemplate(Request $request){
        
        $newTemplate=new TemplateProject;
        $newTemplate->name=$request->get('name');
        $newTemplate->description= $request->get('description');
        $newTemplate->save();
        $template_id=$newTemplate->id;
        $data=$request->all();
        $startingID=0;

        $templateTask=new TemplateTask;
        foreach($data['tasks'] as $key => $value){
            $currentTask=0;
            $task=new TemplateTask;
            $predecessors=[];
            if(TemplateTask::where('temp_id',$value['id'])->where('template_project_id',$template_id)->count()>0){
                $task=TemplateTask::where('temp_id',$value['id'])->where('template_project_id',$template_id)->first();
                $currentTask=$task->id;
            }
            else{
                $task->name=$value['name'];
                $task->duration=$value['duration'];
                $task->temp_id=$value['id'];

                $task->template_project_id=$template_id;
                $task->save();
                $currentTask=$task->id;
            }


            foreach($value['predecessors'] as $key2 => $pre){
                $preTaskID=0;
                $preTask;
                if(TemplateTask::where('temp_id',$pre['id'])->where('template_project_id',$template_id)->count()>0){
                    $preTask=TemplateTask::where('temp_id',$pre['id'])->where('template_project_id',$template_id)->first();
                    $preTaskID=$preTask->id;
                }
                else{
                    $preTask=new TemplateTask;
                    $preTask->name=$pre['name'];
                    $preTask->duration=$pre['duration'];
                    $preTask->template_project_id=$template_id;
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
            $task->save();

            //task skills
            foreach($value['skills'] as $key2 => $skill){
                $skil=Skill::find($skill['id']);
                $ID=$skil->templateTasks()->attach($task->id);
                \DB::table('skills_temp_tasks_relations')->where('skill_id', $skil->id)->where('template_task_id', $task->id)->update(array('skill_level' => $skill['level']));

            }

        }


        return response()->json([
            'msg' => 'done successfully',
        ],200);
    }


    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
