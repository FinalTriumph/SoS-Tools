import { Player } from '@/types';
import { ModalType } from './ModalTypes';
import { createContext, useContext } from 'react';

interface ModalContextValue {
    openModal: (type: ModalType, player: Player) => void;
    closeModal: () => void;
    activeModal: ModalType | null;
    player: Player | null;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
