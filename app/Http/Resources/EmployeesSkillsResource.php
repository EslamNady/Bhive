<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesSkillsResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->skill_name,
            'level' => $this->whenPivotLoaded('employee_skills_relations', function () {
                return $this->pivot->skill_level;
            }),
        ];
    }
}
