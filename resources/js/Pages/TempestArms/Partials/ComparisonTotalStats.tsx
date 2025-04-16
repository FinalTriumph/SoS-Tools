import { TempestArmStat } from '@/types';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';
import { formatStatValue } from '../Utils/statsUtils';

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
                {Object.values(stats).map((stat) => (
                    <div
                        key={stat.name}
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
