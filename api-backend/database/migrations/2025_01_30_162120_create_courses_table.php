<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('teacher_id');
            $table->string('course_code')->unique(); // Unique code for each course
            $table->string('name');
            $table->integer('completion_time'); // Time in hours
            $table->integer('number_of_lectures');
            $table->timestamps();

            $table->foreign('teacher_id')->references('id')->on('teachers')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
