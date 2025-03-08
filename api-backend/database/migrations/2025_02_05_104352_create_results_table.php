<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResultsTable extends Migration
{
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('student_id');
            $table->unsignedInteger('exam_id');
            $table->integer('obtained_marks')->nullable();
            $table->string('status')->nullable(); // passed, failed
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')
                  ->onDelete('cascade');
            $table->foreign('exam_id')->references('id')->on('exams')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('results');
    }
}
