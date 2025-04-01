import Modal from '@/Components/Modal';
import { Player } from '@/types';
import Mk1InformationForm from '../../../Player/Partials/Mk1InformationForm';

interface Mk1InformationFormModalProps {
    closeModal: () => void;
    player: Player;
}

export default function Mk1InformationFormModal({
    closeModal,
    player,
}: Mk1InformationFormModalProps) {
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

                <Mk1InformationForm
                    playerId={player.id}
                    mk1={player.mk1}
                />

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
