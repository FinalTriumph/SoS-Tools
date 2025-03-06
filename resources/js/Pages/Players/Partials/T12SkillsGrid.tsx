import { Army } from '@/types';
import { ColorType } from '../Utils/colorUtils';
import ColorCell from './ColorCell';

export default function T12SkillsGrid({ army }: { army: Army | null }) {
    return (
        <div className="border border-slate-400">
            <div className="cell">T12 Skills</div>

            <div className="grid grid-cols-3">
                <ColorCell
                    type={ColorType.T12Skill}
                    value={army?.tier === 12 ? (army?.t12_infantry ?? 0) : 0}
                />
                <ColorCell
                    type={ColorType.T12Skill}
                    value={army?.tier === 12 ? (army?.t12_rider ?? 0) : 0}
                />
                <ColorCell
                    type={ColorType.T12Skill}
                    value={army?.tier === 12 ? (army?.t12_hunter ?? 0) : 0}
                />
            </div>
        </div>
    )
}
