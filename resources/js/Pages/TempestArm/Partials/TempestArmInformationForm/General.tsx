import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import { TempestArmGeneral } from '@/types';

export default function General({
    players,
    data,
    setDataField,
    getError,
}: {
    players: { id: number; username: string }[];
    data: TempestArmGeneral;
    setDataField: (field: keyof TempestArmGeneral, value: string | number) => void;
    getError: (field: keyof TempestArmGeneral) => string | undefined;
}) {
    return(
        <div className="flex-grow space-y-6">
            <div>
                <InputLabel htmlFor="player_id" value="Player" />

                <SelectInput
                    id="player_id"
                    name="player_id"
                    value={data.player_id || ''}
                    options={[
                        { value: '', label: '' },
                        ...(players?.map(player => ({
                            value: player.id,
                            label: player.username,
                        })) || [])
                    ]}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('player_id', Number(e.target.value))}
                />

                <InputError message={getError('player_id')} />
            </div>

            <div>
                <InputLabel htmlFor="troop_type" value="Troop Type" />

                <SelectInput
                    id="troop_type"
                    name="troop_type"
                    value={data.troop_type || ''}
                    options={[
                        { value: '', label: '' },
                        { value: 'infantry', label: 'Infantry' },
                        { value: 'riders', label: 'Riders' },
                        { value: 'hunters', label: 'Hunters' },
                    ]}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('troop_type', e.target.value)}
                />

                <InputError message={getError('troop_type')} />
            </div>

            <div>
                <InputLabel htmlFor="type" value="Type" />

                <SelectInput
                    id="type"
                    name="type"
                    value={data.type || ''}
                    options={[
                        { value: '', label: '' },
                        { value: 'attack', label: 'Attack' },
                        { value: 'defense', label: 'Defense' },
                    ]}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('type', e.target.value)}
                />

                <InputError message={getError('type')} />
            </div>

            <div>
                <InputLabel htmlFor="generation" value="Generation" />

                <SelectInput
                    id="generation"
                    name="generation"
                    value={data.generation || ''}
                    options={[
                        { value: '', label: '' },
                        { value: 'g1', label: 'G1' },
                        { value: 'g2', label: 'G2' },
                        { value: 'g3', label: 'G3' },
                        { value: 's1', label: 'S1' },
                    ]}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('generation', e.target.value)}
                />

                <InputError message={getError('generation')} />
            </div>
        </div>
    )
}
