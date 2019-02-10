<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SkillsWithLevelResource;
class TemplateTaskResource extends JsonResource
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
            'duration' =>$this->duration,
            'predecessors' =>TemplateTaskResource::collection($this->predecessor),
            'skills' => SkillsWithLevelResource::collection($this->skills),
        ];
    }
}
