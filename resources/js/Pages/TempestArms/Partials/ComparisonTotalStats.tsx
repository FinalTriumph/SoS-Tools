import { TempestArmStat } from '@/types';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';
import { sortStats, formatStatValue } from '../Utils/statsUtils';

interface ComparisonTotalStatsProps {
    stats: { [key: string]: TempestArmStat };
}

export default function ComparisonTotalStats({
    stats,
}: ComparisonTotalStatsProps) {
    return (
        <div className="p-4 bg-blue-100 text-sm">
            <div className="py-2 font-bold">
                <div>Total Stats</div>
            </div>

            <div className="mt-3">
                {Object.entries(sortStats(stats)).map(([statKey, stat]) => (
                    <div
                        key={statKey}
                        className={`flex justify-between mt-1 py-1 px-3 bg-${getTailwindColorName(stat.color ?? '')}`}
                    >
                        <div>{stat.name}</div>
                        <div>{formatStatValue(stat)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
