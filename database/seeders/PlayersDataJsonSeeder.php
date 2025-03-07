<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PlayersDataJsonSeeder extends Seeder
{
    public function run()
    {
        $json = File::get('database/seeders/players_data.json');
        $data = json_decode($json, true);

        foreach ($data as $playerData) {
            DB::transaction(function () use ($playerData) {
                $player = DB::table('players')->insertGetId([
                    'user_id' => 1,
                    'username' => $playerData['name'],
                    'behemoths_bp' => $playerData['behemoths']['bp'],
                    'squadron_bp' => $playerData['squadron']['bp'],
                ]);

                DB::table('mk1s')->insert([
                    'player_id' => $player,
                    'level' => $playerData['behemoths']['monkey']['level'],
                    'stars' => $playerData['behemoths']['monkey']['stars'],
                    'color' => $playerData['behemoths']['monkey']['color'],
                    'skills' => $playerData['behemoths']['monkey']['skills'],
                ]);

                DB::table('mk2s')->insert([
                    'player_id' => $player,
                    'level' => $playerData['behemoths']['dino']['level'],
                    'stars' => $playerData['behemoths']['dino']['stars'],
                    'color' => $playerData['behemoths']['dino']['color'],
                    'skills' => $playerData['behemoths']['dino']['skills'],
                ]);

                DB::table('formation_systems')->insert([
                    'player_id' => $player,
                    'level' => $playerData['squadron']['level'],
                    'skill_1' => $playerData['squadron']['skills'][0],
                    'skill_2' => $playerData['squadron']['skills'][1],
                    'skill_3' => $playerData['squadron']['skills'][2],
                    'skill_4' => $playerData['squadron']['skills'][3],
                    'skill_5' => $playerData['squadron']['skills'][4],
                ]);

                DB::table('armies')->insert([
                    'player_id' => $player,
                    'plasma' => $playerData['troops']['plasma'],
                    'tier' => 12,
                    't12_infantry' => $playerData['troops']['skills'][0],
                    't12_rider' => $playerData['troops']['skills'][1],
                    't12_hunter' => $playerData['troops']['skills'][2],
                ]);
            });
        }
    }
}
