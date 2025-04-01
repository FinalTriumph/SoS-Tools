import Modal from '@/Components/Modal';
import { Player } from '@/types';
import PlayerInformationForm from '../../../Player/Partials/PlayerInformationForm';

interface PlayerInformationFormModalProps {
    closeModal: () => void;
    player: Player;
}

export default function PlayerInformationFormModal({
    closeModal,
    player,
}: PlayerInformationFormModalProps) {
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

                <PlayerInformationForm player={player} />

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
