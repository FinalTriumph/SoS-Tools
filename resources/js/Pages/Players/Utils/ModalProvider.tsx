import { Player } from '@/types';
import { ModalType } from './ModalTypes';
import { ModalContext } from './ModalContext';
import React, { useState, useCallback } from 'react';

interface ModalProviderProps {
    children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [player, setPlayer] = useState<Player | null>(null);

    const openModal = useCallback((type: ModalType, player: Player) => {
        setActiveModal(type);
        setPlayer(player);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setPlayer(null);
    }, []);

    return (
        <ModalContext.Provider value={{
            openModal, 
            closeModal, 
            activeModal, 
            player 
        }}>
            {children}
        </ModalContext.Provider>
    );
};
