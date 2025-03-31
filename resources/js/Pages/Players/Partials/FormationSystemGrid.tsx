import { FormationSystem } from '@/types';
import { ColorType } from '../Utils/colorUtils';
import ColorCell from './ColorCell';

export default function FormationSystemGrid({
    formationSystem,
}: {
    formationSystem: FormationSystem | null;
}) {
    return (
        <div>
            <ColorCell
                type={ColorType.FormationSystemLevel}
                value={formationSystem?.level ?? 0}
            />

            <div className="grid grid-cols-5">
                <ColorCell
                    type={ColorType.Skill}
                    value={formationSystem?.skill_1 ?? 0}
                />

                <ColorCell
                    type={ColorType.Skill}
                    value={formationSystem?.skill_2 ?? 0}
                    className="border-l"
                />

                <ColorCell
                    type={ColorType.Skill}
                    value={formationSystem?.skill_3 ?? 0}
                    className="border-l"
                />

                <ColorCell
                    type={ColorType.Skill}
                    value={formationSystem?.skill_4 ?? 0}
                    className="border-l"
                />

                <ColorCell
                    type={ColorType.Skill}
                    value={formationSystem?.skill_5 ?? 0}
                    className="border-l"
                />
            </div>
        </div>
    )
}
