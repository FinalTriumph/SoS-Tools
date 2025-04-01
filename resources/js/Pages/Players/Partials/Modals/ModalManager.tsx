import { ModalType } from '../../Utils/ModalTypes';
import { useModalContext } from '../../Utils/ModalContext';
import PlayerInformationFormModal from './PlayerInformationFormModal';
import Mk1InformationFormModal from './Mk1InformationFormModal';
import Mk2InformationFormModal from './Mk2InformationFormModal';
import FormationSystemInformationFormModal from './FormationSystemInformationFormModal';
import ArmyInformationFormModal from './ArmyInformationFormModal';

export default function ModalManager() {
    const { activeModal, player, closeModal } = useModalContext();

    if (!activeModal || !player) return null;

    return (
        <>
            {activeModal === ModalType.PLAYER && (
                <PlayerInformationFormModal
                    closeModal={closeModal}
                    player={player}
                />
            )}
            {activeModal === ModalType.MK1 && (
                <Mk1InformationFormModal
                    closeModal={closeModal}
                    player={player}
                />
            )}
            {activeModal === ModalType.MK2 && (
                <Mk2InformationFormModal
                    closeModal={closeModal}
                    player={player}
                />
            )}
            {activeModal === ModalType.FORMATION_SYSTEM && (
                <FormationSystemInformationFormModal
                    closeModal={closeModal}
                    player={player}
                />
            )}
            {activeModal === ModalType.ARMY && (
                <ArmyInformationFormModal
                    closeModal={closeModal}
                    player={player}
                />
            )}
        </>
    );
}
