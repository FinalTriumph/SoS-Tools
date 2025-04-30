import { Player } from '@/types/entities/player';
import { FormModalType } from './FormModalType';
import { createContext, useContext } from 'react';

interface FormModalContextValue {
    openModal: (type: FormModalType, player: Player) => void;
    closeModal: () => void;
    activeModal: FormModalType | null;
    player: Player | null;
}

export const FormModalContext = createContext<FormModalContextValue | undefined>(undefined);

export const useFormModalContext = () => {
    const context = useContext(FormModalContext);
    if (!context) {
        throw new Error('useFormModalContext must be used within a FormModalProvider');
    }
    return context;
};
