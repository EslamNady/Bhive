<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'skill_name',
    ];
    public function employees()
    {
        return $this->belongsToMany('App\Employee','employee_skills_relations')->withPivot('skill_level');
    }
    public function tasks()
    {
        return $this->belongsToMany('App\Task','skills_tasks_relations')->withPivot('skill_level');
    }
    public function templateTasks()
    {
        return $this->belongsToMany('App\TemplateTask','skills_temp_tasks_relations')->withPivot('skill_level');
    }

}
