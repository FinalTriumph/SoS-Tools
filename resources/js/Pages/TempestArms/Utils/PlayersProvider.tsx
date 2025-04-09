import { PlayersContext } from './PlayersContext';

interface PlayersProviderProps {
    players: { id: number; username: string }[];
    children: React.ReactNode
}

export const PlayersProvider = ({ players, children }: PlayersProviderProps) => {
    const playersById = Object.fromEntries(players.map((player) => [player.id, player.username]));

    return (
        <PlayersContext.Provider value={{ playersById }}>
            {children}
        </PlayersContext.Provider>
    );
};
