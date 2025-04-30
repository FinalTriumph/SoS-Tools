import { TempestArmStats } from '@/types/entities/tempestArm';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';
import { getStatNameStyle, formatStatValue } from '../Utils/statsUtils';

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
                    className={`flex justify-between items-center mt-1 px-3 h-8 bg-${getTailwindColorName(stat.color ?? '')}`}
                >
                    <div style={getStatNameStyle(stat.name ?? '')}>{stat.name}</div>
                    <div>{formatStatValue(stat)}</div>
                </div>
            ))}
        </div>
    );
}
