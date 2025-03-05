import { Player } from '@/types';
import MkGrid from './MkGrid';

export default function BehemothsTd({ player }: { player: Player }) {
    return (
        <td className="p-0 border-0">
            <div className="cell">BP: {player.behemoths_bp}</div>

            <div className="grid grid-cols-2 gap-0">
                <MkGrid title="MK1" mk={player.mk1} />
                <MkGrid title="MK2" mk={player.mk2} />
            </div>
        </td>
    )
}
