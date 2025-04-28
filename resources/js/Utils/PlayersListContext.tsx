import { createContext, useContext } from 'react';

interface PlayersListContextValue {
    playersById: Record<number, string>;
}

export const PlayersListContext = createContext<PlayersListContextValue | undefined>(undefined);

export const usePlayersListContext = () => {
    const context = useContext(PlayersListContext);
    if (!context) {
        throw new Error('usePlayersListContext must be used within a PlayersListProvider');
    }
    return context;
};
