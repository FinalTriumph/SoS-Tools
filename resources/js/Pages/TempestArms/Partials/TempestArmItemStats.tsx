import { TempestArmStats } from '@/types';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';
import { formatStatValue } from '../Utils/statsUtils';

interface TempestArmItemStatsProps {
    stats: TempestArmStats;
}

export default function TempestArmItemStats({
    stats,
}: TempestArmItemStatsProps) {
    return (
        <div className="mt-3">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`flex justify-between mt-1 py-1 px-3 bg-${getTailwindColorName(stat.color ?? '')}`}
                >
                    <div>{stat.name}</div>
                    <div>{formatStatValue(stat)}</div>
                </div>
            ))}
        </div>
    );
}
