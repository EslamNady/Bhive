<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('temp_id')->nullable();
            $table->integer('slack')->unsigned()->default(0);
            $table->decimal('progress')->unsigned()->default(0.0);
            $table->date('startDate')->nullable();
            $table->date('endDate')->nullable();
            $table->integer('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade')->onUpdate('cascade');

            $table->date('submissionDate')->nullable();
            $table->date('assigningDate')->nullable();

            $table->string('name');
            $table->unsignedInteger('duration');
            $table->unsignedInteger('resources_number')->default(1);
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
        Schema::dropIfExists('tasks');
    }
}
