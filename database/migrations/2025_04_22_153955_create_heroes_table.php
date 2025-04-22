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
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();

            $table->string('name');
            $table->integer('generation');
            $table->string('troop_type');
            $table->string('type');
            $table->integer('attack_defense_stats');

            $table->foreignId('attack_tempest_arm_id')
                ->nullable()
                ->constrained('tempest_arms')
                ->nullOnDelete()
                ->unique();

            $table->foreignId('defense_tempest_arm_id')
                ->nullable()
                ->constrained('tempest_arms')
                ->nullOnDelete()
                ->unique();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heroes');
    }
};
