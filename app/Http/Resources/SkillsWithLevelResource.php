<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SkillsWithLevelResource extends JsonResource
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
            'name' => $this->skill_name,
            'level' => $this->whenPivotLoaded('skills_temp_tasks_relations', function () {
                return $this->pivot->skill_level;
            }),
        ];
    }
}
