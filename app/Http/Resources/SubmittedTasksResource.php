<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubmittedTasksResource extends JsonResource
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
            'name' => $this->name,
            'note' => $this->whenPivotLoaded('activity_timeline', function () {
                return $this->pivot->note;
            }),
            'submission_link' => $this->whenPivotLoaded('activity_timeline', function () {
                return $this->pivot->submission_link;
            }),
            // 'employee_name' => $this->employees
        ];
    }
}
