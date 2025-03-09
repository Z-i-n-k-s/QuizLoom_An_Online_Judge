<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLectureAnswersTable extends Migration
{
    public function up()
    {
        Schema::create('lecture_answers', function (Blueprint $table) {
            $table->increments('id'); // Primary key (unsigned integer)
            $table->unsignedInteger('question_id'); // Now matches lecture_questions.id type
            $table->unsignedInteger('teacher_id');  // Now matches teachers.id type
            $table->text('answer');
            $table->timestamps();
    
            $table->foreign('question_id')->references('id')->on('lecture_questions')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('teachers')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('lecture_answers');
    }
}
