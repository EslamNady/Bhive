<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Employee extends Authenticatable
{
    use Notifiable;

    protected $guard='employees';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','title','score','submitted_tasks_num',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function skills()
    {
        return $this->belongsToMany('App\Skill','employee_skills_relations')->withPivot('skill_level');
    }
    public function tasks()
    {
        return $this->belongsToMany('App\Task','activity_timeline')->withPivot('id','gave_feedback','submitted','submission_date','submission_link','note','time_score','feedback_score');
    }
}
