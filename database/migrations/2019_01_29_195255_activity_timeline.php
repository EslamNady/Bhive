<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ActivityTimeline extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_timeline', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('employee_id')->unsigned()->nullable();
            $table->foreign('employee_id')->references('id')
            ->on('employees')->onDelete('cascade')->onUpdate('cascade');

            $table->integer('task_id')->unsigned()->nullable();
            $table->foreign('task_id')->references('id')
            ->on('tasks')->onDelete('cascade')->onUpdate('cascade');

            $table->boolean('submitted')->default(false);
            $table->text("submission_link")->nullable();
            $table->text("note")->nullable();
            $table->date('submission_date')->nullable();

            $table->decimal("time_score")->default(0);
            $table->decimal("feedback_score")->default(0);
            $table->boolean("gave_feedback")->default(false);

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
