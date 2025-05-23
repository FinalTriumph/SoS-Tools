<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mk2s', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();

            $table->integer('level')->nullable();
            $table->integer('stars')->nullable();
            $table->string('color')->nullable();
            $table->integer('skills')->nullable();

            $table->integer('skill_1')->nullable();
            $table->integer('skill_2')->nullable();
            $table->integer('skill_3')->nullable();
            $table->integer('skill_4')->nullable();
            $table->integer('skill_5')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mk2s');
    }
};
