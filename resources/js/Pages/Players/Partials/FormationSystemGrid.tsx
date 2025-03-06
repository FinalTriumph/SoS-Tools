import { FormationSystem } from '@/types';
import { ColorType } from '../Utils/colorUtils';
import ColorCell from './ColorCell';

interface FormationSystemGridProps {
    formationSystem: FormationSystem | null;
}

export default function FormationSystemGrid({ formationSystem }: FormationSystemGridProps) {
    return (
        <div className="border border-slate-400">
            <div className="cell">
                Formation System
            </div>

            <ColorCell type={ColorType.FormationSystemLevel} value={formationSystem?.level ?? 0} />

            <div className="grid grid-cols-5">
                <ColorCell type={ColorType.Skill} value={formationSystem?.skill_1 ?? 0} />
                <ColorCell type={ColorType.Skill} value={formationSystem?.skill_2 ?? 0} />
                <ColorCell type={ColorType.Skill} value={formationSystem?.skill_3 ?? 0} />
                <ColorCell type={ColorType.Skill} value={formationSystem?.skill_4 ?? 0} />
                <ColorCell type={ColorType.Skill} value={formationSystem?.skill_5 ?? 0} />
            </div>
        </div>
    )
}
