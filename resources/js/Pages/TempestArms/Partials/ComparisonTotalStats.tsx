import { TempestArmStat } from '@/types';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';
import { sortStats, getStatNameStyle, formatStatValue } from '../Utils/statsUtils';

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
                        className={`flex justify-between items-center mt-1 px-3 h-8 bg-${getTailwindColorName(stat.color ?? '')}`}
                    >
                        <div style={getStatNameStyle(stat.name ?? '')}>{stat.name}</div>
                        <div>{formatStatValue(stat)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
