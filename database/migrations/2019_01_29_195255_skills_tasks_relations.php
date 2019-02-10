<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SkillsTasksRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skills_tasks_relations', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('skill_id')->unsigned()->nullable();
            $table->foreign('skill_id')->references('id')
            ->on('skills')->onDelete('cascade');

            $table->integer('task_id')->unsigned()->nullable();
            $table->foreign('task_id')->references('id')
            ->on('tasks')->onDelete('cascade');

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
