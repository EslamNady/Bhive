<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TemplateTask extends Model
{
    protected $fillable = [
        'id','name', 'duration','temp_id','template_project_id'
    ];
    public function templateProject()
    {
        return $this->belongsTo('App\TemplateProject');
    }
    public function successor()
    {
        return $this->belongsToMany('App\TemplateTask','template_tasks_relations','predecessor_id','successor_id');
    }
    public function predecessor()
    {
        return $this->belongsToMany('App\TemplateTask','template_tasks_relations','successor_id','predecessor_id');
    }
    public function skills()
    {
        return $this->belongsToMany('App\Skill','skills_temp_tasks_relations')->withPivot('skill_level');
    }

}
