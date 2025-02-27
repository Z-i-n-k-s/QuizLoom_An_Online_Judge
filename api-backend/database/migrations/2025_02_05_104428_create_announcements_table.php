<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnnouncementsTable extends Migration
{
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('course_id');
            $table->unsignedInteger('teacher_id');
            $table->string('title');
            $table->text('message');
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses')
                  ->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('teachers')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('announcements');
    }
}
