import { useFormModalContext } from '../Utils/FormModalContext';
import FormModal from './FormModal';

export default function FormModalManager() {
    const { activeModal, player, closeModal } = useFormModalContext();

    if (!activeModal || !player) return null;

    return (
        <FormModal
            modalType={activeModal}
            player={player}
            closeModal={closeModal}
        />
    );
}
