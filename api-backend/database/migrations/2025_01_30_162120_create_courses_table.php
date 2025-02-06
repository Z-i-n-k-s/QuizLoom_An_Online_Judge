<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->string('course_code')->unique();
            $table->string('name');
            $table->integer('completion_time'); // Time in hours
            $table->integer('number_of_lectures');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('courses');
    }
};
