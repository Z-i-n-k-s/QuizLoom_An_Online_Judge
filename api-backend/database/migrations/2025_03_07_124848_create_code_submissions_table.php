<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodeSubmissionsTable extends Migration
{
    public function up()
    {
        Schema::create('code_submissions', function (Blueprint $table) {
            $table->increments('id'); // Primary key (unsigned integer)
            $table->unsignedInteger('student_id'); // Matches students.id type
            $table->unsignedInteger('code_exam_question_id'); // Now matches code_exam_questions.id type
            $table->text('submitted_code');
            $table->text('teacher_comment')->nullable();
            $table->integer('marks_awarded')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->foreign('code_exam_question_id')->references('id')->on('code_exam_questions')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('code_submissions');
    }
}
