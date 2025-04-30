import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { HeroGeneral } from '@/types/entities/hero';

export default function General({
    players,
    data,
    setDataField,
    getError,
}: {
    players: { id: number; username: string }[];
    data: HeroGeneral;
    setDataField: (field: keyof HeroGeneral, value: string | number) => void;
    getError: (field: keyof HeroGeneral) => string | undefined;
}) {
    return(
        <div className="flex-grow space-y-6">
            <div>
                <InputLabel htmlFor="player_id" value="Player" />

                <SelectInput
                    id="player_id"
                    name="player_id"
                    value={data.player_id ?? ''}
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

            <div className="mt-4">
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name ?? ''}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('name', e.target.value)}
                />

                <InputError message={getError('name')} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="generation" value="Generation" />

                <TextInput
                    id="generation"
                    type="number"
                    name="generation"
                    min="1"
                    value={data.generation ?? ''}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('generation', Number(e.target.value))}
                />

                <InputError message={getError('generation')} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="troop_type" value="Troop Type" />

                <SelectInput
                    id="troop_type"
                    name="troop_type"
                    value={data.troop_type ?? ''}
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
                    value={data.type ?? ''}
                    options={[
                        { value: '', label: '' },
                        { value: 'berserk', label: 'Berserk' },
                        { value: 'resilience', label: 'Resilience' },
                        { value: 'control', label: 'Control' },
                    ]}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('type', e.target.value)}
                />

                <InputError message={getError('type')} />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="attack_defense_stats" value="Attack/Defense Stats" />

                <TextInput
                    id="attack_defense_stats"
                    type="number"
                    name="attack_defense_stats"
                    min="1"
                    value={data.attack_defense_stats ?? ''}
                    className="mt-1 block w-full"
                    onChange={(e) => setDataField('attack_defense_stats', Number(e.target.value))}
                />

                <InputError message={getError('attack_defense_stats')} className="mt-2" />
            </div>
        </div>
    )
}
