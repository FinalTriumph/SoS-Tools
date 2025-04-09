import { createContext, useContext } from 'react';

interface PlayersContextValue {
    playersById: Record<number, string>;
}

export const PlayersContext = createContext<PlayersContextValue | undefined>(undefined);

export const usePlayersContext = () => {
    const context = useContext(PlayersContext);
    if (!context) {
        throw new Error('usePlayersContext must be used within a PlayersProvider');
    }
    return context;
};
