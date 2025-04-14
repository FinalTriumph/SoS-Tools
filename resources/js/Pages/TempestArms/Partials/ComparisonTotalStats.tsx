import { getTailwindColorName } from '../../Players/Utils/colorUtils';

interface ComparisonTotalStatsProps {
    stats: { [key: string]: { value: number; is_percentage: boolean } };
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
                {Object.keys(stats).map((key, index) => (
                    <div
                        key={index}
                        className={`flex justify-between mt-1 py-1 px-3 bg-${getTailwindColorName('grey')}`}
                    >
                        <div>{key.replace('_', ' ')}</div>
                        <div>{stats[key].value}{stats[key].is_percentage ? '%' : ''}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
