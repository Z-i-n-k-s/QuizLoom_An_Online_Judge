<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCodeExamQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('code_exam_questions', function (Blueprint $table) {
            $table->increments('id'); // Primary Key as unsigned integer
            $table->unsignedInteger('exam_id'); // Matches exams.id type
            $table->text('question');
            $table->integer('max_marks');
            $table->timestamps();
    
            $table->foreign('exam_id')->references('id')->on('exams')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('code_exam_questions');
    }
}
