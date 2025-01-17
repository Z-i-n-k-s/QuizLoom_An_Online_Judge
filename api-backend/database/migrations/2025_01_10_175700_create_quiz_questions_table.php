<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('quiz_questions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('exam_id')->constrained()->onDelete('cascade');
        $table->text('question');
        $table->string('option_a');
        $table->string('option_b');
        $table->string('option_c');
        $table->string('option_d');
        $table->char('correct_option', 1);
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
        Schema::dropIfExists('quiz_questions');
    }
}
