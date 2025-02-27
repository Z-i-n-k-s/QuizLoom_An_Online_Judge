<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('exam_id');
            $table->text('question');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->char('correct_option', 1); // A, B, C, D
            $table->timestamps();

            $table->foreign('exam_id')->references('id')->on('exams')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('quiz_questions');
    }
}
