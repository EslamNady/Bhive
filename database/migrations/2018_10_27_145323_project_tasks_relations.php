<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProjectTasksRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_tasks_relations', function (Blueprint $table) {

            $table->integer('predecessor_id')->unsigned()->nullable();
                $table->foreign('predecessor_id')->references('id')
                ->on('tasks')->onDelete('cascade');

                $table->integer('successor_id')->unsigned()->nullable();
                $table->foreign('successor_id')->references('id')
                ->on('tasks')->onDelete('cascade');
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
