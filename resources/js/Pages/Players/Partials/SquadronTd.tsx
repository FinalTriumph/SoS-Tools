import { Player } from '@/types';
import FormationSystemGrid from './FormationSystemGrid';

export default function SquadronTd({ player }: { player: Player }) {
    return (
        <td className="p-0 border-0">
            <div className="cell">BP: {player.squadron_bp}</div>

            <FormationSystemGrid formationSystem={player.formation_system} />
        </td>
    )
}
