<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TemplateProject extends Model
{
    protected $fillable = [
        'name', 'description',
    ];
    public function templateTask()
    {
        return $this->hasMany('App\TemplateTask');
    }
    
}
