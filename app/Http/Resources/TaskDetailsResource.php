<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskDetailsResource extends JsonResource
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
            'id' => $this->pivot->id,
            'employee_name' => $this->name,
            'employee_title' => $this->title,
            'note'=> $this->pivot->note,
            'submission_link' => $this->pivot->submission_link,
            'score'=> $this->pivot->time_score,
            'submission_date' => $this->pivot->submission_date,
            'submitted' => $this->pivot->submitted,
            'gave_feedback' => $this->pivot->gave_feedback,
        ];
    }
}
