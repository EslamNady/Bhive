<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TasksResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'name' => $this->name,
            'duration' =>$this->duration,
            'startDate'=>$this->startDate,
            'endDate'=>$this->endDate,
            'progress'=>$this->progress,
            'predecessors' =>TasksResource::collection($this->predecessor),
            'slack' => $this->slack,
        ];
    }
}
