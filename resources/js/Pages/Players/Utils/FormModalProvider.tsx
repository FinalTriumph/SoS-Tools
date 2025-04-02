import { Player } from '@/types';
import { FormModalType } from './FormModalType';
import { FormModalContext } from './FormModalContext';
import React, { useState, useCallback } from 'react';

interface FormModalProviderProps {
    children: React.ReactNode;
}

export const FormModalProvider = ({ children }: FormModalProviderProps) => {
    const [activeModal, setActiveModal] = useState<FormModalType | null>(null);
    const [player, setPlayer] = useState<Player | null>(null);

    const openModal = useCallback((type: FormModalType, player: Player) => {
        setActiveModal(type);
        setPlayer(player);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
        setPlayer(null);
    }, []);

    return (
        <FormModalContext.Provider value={{
            openModal, 
            closeModal, 
            activeModal, 
            player 
        }}>
            {children}
        </FormModalContext.Provider>
    );
};
