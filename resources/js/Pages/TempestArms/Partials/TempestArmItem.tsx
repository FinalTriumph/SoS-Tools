import { TempestArm } from '@/types';
import { router } from '@inertiajs/react';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';

interface TempestArmItemProps {
    tempestArm: TempestArm,
    playerUsername: string,
}

export default function TempestArmItem({
    tempestArm,
    playerUsername,
}: TempestArmItemProps) {
    const handleTempestArmClick = (): void => {
        router.visit(route('tempest-arm.edit', tempestArm.id));
    };

    const ucfirst = (str: string | null): string => {
        if (!str) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    let skillColor = '';
    const skillQualityColors = {
        common: 'purple',
        rare: 'gold',
        ultra: 'red',
    };
    if (tempestArm.skill.quality && tempestArm.skill.quality in skillQualityColors) {
        skillColor = skillQualityColors[tempestArm.skill.quality as keyof typeof skillQualityColors];
    }

    const skillLevelToRoman = (level: number | null): string => {
        if (!level || level > 4) {
            return '';
        }

        const roman = ['I', 'II', 'III', 'IV'];
        return roman[level - 1];
    };

    return (
        <div
            className="p-4 bg-orange-100 text-sm"
            onClick={() => handleTempestArmClick()}
            role="button"
            tabIndex={0}
        >
            <div className="flex justify-between items-center font-bold">
                <div>{ucfirst(tempestArm.type)}</div>
                <div className="inline-block p-2 bg-orange-200 rounded-lg">{ucfirst(tempestArm.generation)}</div>
            </div>

            {tempestArm.stats && (
                <div className="mt-3">
                    {tempestArm.stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex justify-between mt-1 py-1 px-3 bg-${getTailwindColorName(stat.color ?? '')}`}
                        >
                            <div>{stat.name}</div>
                            <div>{stat.value}{stat.is_percentage ? '%' : ''}</div>
                        </div>
                    ))}
                </div>
            )}

            {tempestArm.skill && (
                <div className={`mt-4 p-4 text-center font-bold text-slate-800 bg-${getTailwindColorName(skillColor)}`}>
                    {tempestArm.skill.name} {skillLevelToRoman(tempestArm.skill.level)}
                </div>
            )}

            <div className="mt-4 mx-2 text-right text-slate-800">
                {playerUsername}
            </div>
        </div>
    );
}
