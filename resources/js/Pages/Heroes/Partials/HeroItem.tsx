import { Hero } from '@/types/entities/hero';
import { usePlayersListContext } from '@/Utils/PlayersListContext';
import { ucfirst } from '@/Utils/stringUtils';
import TempestArmItem from '../../TempestArms/Partials/TempestArmItem';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';

interface HeroItemProps {
    hero: Hero,
}

export default function HeroItem({
    hero,
}: HeroItemProps) {
    const { playersById } = usePlayersListContext();

    // TODO
    const getHeroTypeColor = (type: string | null): string => {
        const heroTypeColors: { [key: string]: string } = {
            berserk: 'red',
            resilience: 'gold',
            control: 'blue',
        };
    
        return type && type in heroTypeColors ? heroTypeColors[type] : '';
    };

    return (
        <div
            className="p-4 bg-slate-50 shadow rounded-lg"
        >
            <div className="flex justify-between items-center gap-4">
                <div className="font-bold">
                    {hero.name}
                </div>

                <div className="inline-block p-2 bg-orange-200 rounded-lg text-xs font-bold">
                    {`G${hero.generation}`}
                </div>

                <div className="flex-grow p-2 bg-slate-200 rounded-lg text-center text-xs font-bold">
                    {ucfirst(hero.troop_type)}
                </div>

                <div className="flex-grow p-2 bg-slate-200 rounded-lg text-center text-xs">
                    {hero.attack_defense_stats}%
                </div>

                <div className={`flex-grow p-2 bg-${getTailwindColorName(getHeroTypeColor(hero.type))} rounded-lg text-center text-xs font-bold`}>
                    {ucfirst(hero.type)}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <div>{hero.attack_tempest_arm ? (
                    <TempestArmItem tempestArm={hero.attack_tempest_arm} hideOwner />
                ) : (
                    <div className="mt-4 mx-4">No attack tempest arm</div>
                )}</div>

                <div>{hero.defense_tempest_arm ? (
                    <TempestArmItem tempestArm={hero.defense_tempest_arm} hideOwner />
                ) : (
                    <div className="mt-4 mx-4">No defense tempest arm</div>
                )}</div>
            </div>

            <div className="mt-4 mx-2 text-right text-sm text-slate-800">
                {hero.player_id ? playersById[hero.player_id] : '-'}
            </div>
        </div>
    );
}
