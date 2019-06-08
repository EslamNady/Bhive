<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'id','name', 'description', 'startDate','endDate'
    ];
    public function Task()
    {
        return $this->hasMany('App\Task');
    }
    public function Manager(){
        return $this->belongsTo('App\User');
    }
}
