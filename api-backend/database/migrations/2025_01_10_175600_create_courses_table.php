<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('courses', function (Blueprint $table) {
        $table->id();
        $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
        $table->string('name');
        $table->integer('completion_time');
        $table->integer('number_of_lectures');
        $table->integer('number_of_exams');
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
        Schema::dropIfExists('courses');
    }
}
