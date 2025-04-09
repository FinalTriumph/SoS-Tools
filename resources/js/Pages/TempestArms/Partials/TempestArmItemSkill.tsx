import { TempestArmSkill } from '@/types';
import { getSkillColor, skillLevelToRoman } from '../Utils/skillUtils';
import { getTailwindColorName } from '../../Players/Utils/colorUtils';

interface TempestArmItemSkillProps {
    skill: TempestArmSkill;
}

export default function TempestArmItemSkill({
    skill,
}: TempestArmItemSkillProps) {
    return (
        <div className={`mt-4 p-4 text-center font-bold text-slate-800 bg-${getTailwindColorName(getSkillColor(skill.quality))}`}>
            {skill.name} {skillLevelToRoman(skill.level)}
        </div>
    );
}
