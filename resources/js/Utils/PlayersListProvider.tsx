import { ReactNode } from 'react';
import { PlayersListContext } from './PlayersListContext';

interface PlayersListProviderProps {
    players: { id: number; username: string }[];
    children: ReactNode
}

export const PlayersListProvider = ({ players, children }: PlayersListProviderProps) => {
    const playersById = Object.fromEntries(players.map((player) => [player.id, player.username]));

    return (
        <PlayersListContext.Provider value={{ playersById }}>
            {children}
        </PlayersListContext.Provider>
    );
};
