import { Army } from '@/types';
import T12SkillsGrid from './T12SkillsGrid';

export default function TroopsTd({ army }: { army: Army | null }) {
    return (
        <td className="p-0 border-0">
            <div className="cell">Plasma: {army?.plasma ?? '-'}</div>
            
            <div className="cell">Tier: {army?.tier ?? '-'}</div>

            <T12SkillsGrid army={army} />
        </td>
    )
}
