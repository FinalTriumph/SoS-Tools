
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { TempestArmStat, TempestArmStats } from '@/types/entities/tempestArm';

export default function Stats({
    stats,
    setStats,
    getError,
}: {
    stats: TempestArmStats;
    setStats: (stats: TempestArmStats) => void;
    getError: (index: number, field: keyof TempestArmStat) => string | undefined;
}) {
    const handleStatChange = (
        index: number,
        field: keyof TempestArmStat,
        value: string | number | boolean
    ) => {
        const newStats = [...stats];

        if (field === 'name' || field === 'color') {
            newStats[index][field] = value as string;
        } else if (field === 'value') {
            newStats[index][field] = value as number;
        } else if (field === 'is_percentage') {
            newStats[index][field] = value as boolean;
        }

        setStats(newStats as TempestArmStats);
    };

    return (
        <div className="space-y-6">
            {stats.map((stat, index) => (
                <div key={index} className="flex gap-2">
                    <div>
                        <InputLabel htmlFor={`stat-${index}-name`} value="Stat" />

                        <TextInput
                            id={`stat-${index}-name`}
                            name={`stats.${index}.name`}
                            value={stat.name || ''}
                            className="mt-1 block"
                            onChange={(e) => handleStatChange(index, 'name', e.target.value)}
                        />

                        <InputError message={getError(index, 'name' as keyof TempestArmStat)} />
                    </div>

                    <div>
                        <InputLabel htmlFor={`stat-${index}-value`} value="Value" />

                        <TextInput
                            id={`stat-${index}-value`}
                            type="number"
                            name={`stats.${index}.value`}
                            min="0"
                            max="1000"
                            step="0.01"
                            value={stat.value || ''}
                            className="mt-1 block"
                            onChange={(e) => handleStatChange(index, 'value', Number(e.target.value))}
                        />

                        <InputError message={getError(index, 'value' as keyof TempestArmStat)} />
                    </div>

                    <div>
                        <InputLabel htmlFor={`stat-${index}-is_percentage`} value="Percentage" />

                        <SelectInput
                            id={`stat-${index}-is_percentage`}
                            name={`stats.${index}.is_percentage`}
                            value={stat.is_percentage !== null ? stat.is_percentage.toString() : ''}
                            options={[
                                { value: '', label: '' },
                                { value: 'true', label: 'Yes' },
                                { value: 'false', label: 'No' },
                            ]}
                            className="mt-1 block"
                            onChange={(e) => handleStatChange(index, 'is_percentage', (e.target.value ? e.target.value === 'true' : ''))}
                        />

                        <InputError message={getError(index, 'is_percentage' as keyof TempestArmStat)} />
                    </div>

                    <div>
                        <InputLabel htmlFor={`stat-${index}-color`} value="Color" />

                        <SelectInput
                            id={`stat-${index}-color`}
                            name={`stats.${index}.color`}
                            value={stat.color || ''}
                            options={[
                                { value: '', label: '' },
                                { value: 'purple', label: 'Purple' },
                                { value: 'gold', label: 'Gold' },
                                { value: 'red', label: 'Red' },
                            ]}
                            className="mt-1 block"
                            onChange={(e) => handleStatChange(index, 'color', e.target.value)}
                        />

                        <InputError message={getError(index, 'color' as keyof TempestArmStat)} />
                    </div>
                </div>
            ))}
        </div>
    )
}
