<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Task;
use Carbon\Carbon;
use App\Http\Resources\TasksResource;
use App\Project;
class ActivityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[

            'id' => $this->id,
            'name' => $this->name,
            'start_date' => $this->startDate->toDateString(),
            'end_date' => $this->endDate->toDateString(),
            'project_name' => Project::find($this->project_id)->name,
        ];
    }
}
