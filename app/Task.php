<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'id','name', 'duration','slack', 'endDate', 'startDate','temp_id','project_id',
    ];
    protected $dates=['startDate','endDate'];
    public function Project()
    {
        return $this->belongsTo('App\Project');
    }
    public function successor()
    {
        return $this->belongsToMany('App\Task','project_tasks_relations','predecessor_id','successor_id');
    }
    public function predecessor()
    {
        return $this->belongsToMany('App\Task','project_tasks_relations','successor_id','predecessor_id');
    }
    public function employees()
    {
        return $this->belongsToMany('App\Employee','activity_timeline');
    }
    public function skills()
    {
        return $this->belongsToMany('App\Skill','skills_tasks_relations')->withPivot('skill_level');
    }
}
