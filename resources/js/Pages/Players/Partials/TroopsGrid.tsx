import { Army } from '@/types';
import { ColorType } from '../Utils/colorUtils';
import ColorCell from './ColorCell';

export default function TroopsGrid({ army }: { army: Army | null }) {
    return (
        <div className="">
            <div className="grid grid-cols-2">
                <ColorCell
                    type={ColorType.Plasma}
                    value={army?.plasma ?? 0}
                    prefix="P"
                />
                <ColorCell
                    type={ColorType.TroopsTier}
                    value={army?.tier ?? 0}
                    prefix="T"
                />
            </div>

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
