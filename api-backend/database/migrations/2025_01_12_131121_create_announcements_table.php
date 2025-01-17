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
    public function up()
    {
        Schema::create('announcements', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade'); // Foreign key for courses
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade'); // Foreign key for teachers
            $table->string('title'); // Title of the announcement
            $table->text('message'); // Message of the announcement
            $table->timestamps(); // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('announcements');
    }
};
