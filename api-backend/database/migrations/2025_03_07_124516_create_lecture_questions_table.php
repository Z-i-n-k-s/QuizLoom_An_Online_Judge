<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLectureQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('lecture_questions', function (Blueprint $table) {
            $table->increments('id'); // Primary key (unsigned integer)
            $table->unsignedInteger('lecture_id'); // Matches lectures.id type
            $table->unsignedInteger('student_id'); // Matches students.id type
            $table->text('question');
            $table->timestamps();
        
            // Foreign key constraints
            $table->foreign('lecture_id')->references('id')->on('lectures')->onDelete('cascade');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('lecture_questions');
    }
}
