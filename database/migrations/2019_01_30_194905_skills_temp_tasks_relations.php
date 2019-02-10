<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SkillsTempTasksRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills_temp_tasks_relations', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('skill_id')->unsigned()->nullable();
            $table->foreign('skill_id')->references('id')
            ->on('skills')->onDelete('cascade')->onUpdate('cascade');

            $table->integer('template_task_id')->unsigned()->nullable();
            $table->foreign('template_task_id')->references('id')
            ->on('template_tasks')->onDelete('cascade')->onUpdate('cascade');

            $table->decimal('skill_level')->unsigned()->default(1);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
