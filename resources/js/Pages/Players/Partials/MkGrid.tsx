import { Mk1, Mk2 } from '@/types';
import { ColorType } from '../Utils/colorUtils';
import ColorCell from './ColorCell';
import MkStarsCell from './MkStarsCell';

interface MkGridProps {
    title: string;
    mk: Mk1 | Mk2 | null;
}

export default function MkGrid({ title, mk }: MkGridProps) {
    return (
        <div className="border border-slate-400">
            <div className="cell">
                {title}
            </div>

            <div className="grid grid-cols-3">
                <ColorCell type={ColorType.MkLevel} value={mk?.level ?? 0} />
                <MkStarsCell color={mk?.color ?? ''} stars={mk?.stars ?? 0}/>
                <ColorCell type={ColorType.MkSkills} value={mk?.skills ?? 0} />
            </div>

            <div className="grid grid-cols-5">
                <ColorCell type={ColorType.Skill} value={mk?.skill_1 ?? 0} />
                <ColorCell type={ColorType.Skill} value={mk?.skill_2 ?? 0} />
                <ColorCell type={ColorType.Skill} value={mk?.skill_3 ?? 0} />
                <ColorCell type={ColorType.Skill} value={mk?.skill_4 ?? 0} />
                <ColorCell type={ColorType.Skill} value={mk?.skill_5 ?? 0} />
            </div>
        </div>
    )
}
