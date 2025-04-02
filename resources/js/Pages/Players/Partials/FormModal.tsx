import Modal from '@/Components/Modal';
import { Player } from '@/types';
import { FormModalType } from '../Utils/FormModalType';
import PlayerInformationForm from '../../Player/Partials/PlayerInformationForm';
import Mk1InformationForm from '../../Player/Partials/Mk1InformationForm';
import Mk2InformationForm from '../../Player/Partials/Mk2InformationForm';
import FormationSystemInformationForm from '../../Player/Partials/FormationSystemInformationForm';
import ArmyInformationForm from '../../Player/Partials/ArmyInformationForm';

interface FormModalProps {
    modalType: FormModalType;
    player: Player;
    closeModal: () => void;
}

export default function FormModal({
    modalType,
    player,
    closeModal,
}: FormModalProps) {
    const formComponent = {
        [FormModalType.PLAYER]: (
            <PlayerInformationForm
                player={player}
            />
        ),
        [FormModalType.MK1]: (
            <Mk1InformationForm
                playerId={player.id}
                mk1={player.mk1}
            />
        ),
        [FormModalType.MK2]: (
            <Mk2InformationForm
                playerId={player.id}
                mk2={player.mk2}
            />
        ),
        [FormModalType.FORMATION_SYSTEM]: (
            <FormationSystemInformationForm
                playerId={player.id}
                formationSystem={player.formation_system}
            />
        ),
        [FormModalType.ARMY]: (
            <ArmyInformationForm
                playerId={player.id}
                army={player.army}
            />
        ),
    }[modalType];

    return (
        <Modal show onClose={closeModal}>
            <div
                style={{ maxHeight: '90vh' }}
                className="p-8 overflow-y-auto"
            >
                <h2 className="text-lg font-medium text-gray-900">
                    {player.username}
                </h2>

                <hr className="my-6" />

                {formComponent}

                <button
                    type="button"
                    className="absolute top-2 right-3 text-lg font-bold text-slate-600 hover:text-slate-800"
                    onClick={closeModal}
                >
                    &#x2715;
                </button>
            </div>
        </Modal>
    );
}
