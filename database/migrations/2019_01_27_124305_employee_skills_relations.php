<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmployeeSkillsRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_skills_relations', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('skill_id')->unsigned()->nullable();
            $table->foreign('skill_id')->references('id')
            ->on('skills')->onDelete('cascade')->onUpdate('cascade');

            $table->integer('employee_id')->unsigned()->nullable();
            $table->foreign('employee_id')->references('id')
            ->on('employees')->onDelete('cascade')->onUpdate('cascade');

            $table->decimal('skill_level')->unsigned()->default(0);

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
