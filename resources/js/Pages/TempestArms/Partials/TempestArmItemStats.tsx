import { TempestArmStats } from '@/types';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';

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
                    <div>{stat.value && stat.is_percentage ? stat.value.toFixed(2) + '%' : stat.value}</div>
                </div>
            ))}
        </div>
    );
}
