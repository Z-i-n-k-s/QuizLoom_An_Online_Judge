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
            $table->string('name');
            $table->integer('total_marks');
            $table->integer('duration'); // Duration in minutes
            $table->date('date');
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
