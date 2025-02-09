<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up() {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->string('name');
            $table->integer('total_marks');
            $table->integer('duration'); // Duration in minutes
            $table->date('date');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('exams');
    }
};
