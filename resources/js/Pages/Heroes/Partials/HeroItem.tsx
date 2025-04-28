import { Hero } from '@/types';
import { usePlayersListContext } from '@/Utils/PlayersListContext';
import { ucfirst } from '@/Utils/stringUtils';

interface HeroItemProps {
    hero: Hero,
}

export default function HeroItem({
    hero,
}: HeroItemProps) {
    const { playersById } = usePlayersListContext();

    return (
        <div
            className="p-4 bg-slate-50 text-sm shadow rounded-lg"
        >
            <div className="flex justify-between items-center font-bold">
                <div>{hero.name}</div>
                <div className="inline-block p-2 bg-orange-200 rounded-lg">
                    {`G${hero.generation}`}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-2 bg-slate-200 rounded-lg">{ucfirst(hero.troop_type)}</div>
                <div className="p-2 bg-slate-200 rounded-lg">{hero.attack_defense_stats}%</div>
                <div className="p-2 bg-slate-300 rounded-lg">{ucfirst(hero.type)}</div>
            </div>

            <div className="mt-4 mx-2 text-right text-slate-800">
                {hero.player_id ? playersById[hero.player_id] : '-'}
            </div>
        </div>
    );
}
