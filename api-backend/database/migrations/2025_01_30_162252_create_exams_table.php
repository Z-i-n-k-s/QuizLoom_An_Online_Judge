<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExamsTable extends Migration
{
    public function up()
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('lecture_id');
            $table->string('name')->nullable();
            $table->integer('total_marks')->nullable();
            $table->integer('duration')->nullable(); // Duration in minutes
            $table->date('date')->nullable();
            $table->timestamps();

            $table->foreign('lecture_id')->references('id')->on('lectures')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('exams');
    }
}
