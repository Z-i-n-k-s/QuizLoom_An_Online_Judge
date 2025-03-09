<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLanguageToCodeSubmissionsTable extends Migration
{
    public function up()
    {
        Schema::table('code_submissions', function (Blueprint $table) {
            // Adding a nullable string column named 'language'
            $table->string('language')->nullable()->after('teacher_comment');
        });
    }

    public function down()
    {
        Schema::table('code_submissions', function (Blueprint $table) {
            $table->dropColumn('language');
        });
    }
}
