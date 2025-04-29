import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Hero } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FormData {
    player_id: number | null;
    name: string | null;
    generation: number | null;
    troop_type: string | null;
    type: string | null;
    attack_defense_stats: number | null;
    [key: string]: any;
}

interface HeroInformationFormProps {
    hero?: Hero | null;
    players: { id: number; username: string }[];
}

export default function HeroInformationForm({
    hero,
    players,
}: HeroInformationFormProps) {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: hero?.player_id ?? null,
        name: hero?.name ?? null,
        generation: hero?.generation ?? null,
        troop_type: hero?.troop_type ?? null,
        type: hero?.type ?? null,
        attack_defense_stats: hero?.attack_defense_stats ?? null,
    });

    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (hero) {
            patch(route('hero.update', hero.id), { preserveScroll: true });
        } else {
            post(route('hero.store'), { preserveScroll: true });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete this hero?`)) {
            destroy(route('hero.destroy', id), {
                onError: () => console.error('Error deleting hero'),
            });
        }
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Hero
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {hero ? 'Update hero information' : 'Add hero information'}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
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
                        onChange={(e) => setData('player_id', Number(e.target.value))}
                    />
    
                    <InputError message={errors.player_id} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name ?? ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('name', e.target.value)}
                    />
    
                    <InputError message={errors.name} className="mt-2" />
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
                        onChange={(e) => setData('generation', Number(e.target.value))}
                    />

                    <InputError message={errors.generation} className="mt-2" />
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
                        onChange={(e) => setData('troop_type', e.target.value)}
                    />
    
                    <InputError message={errors.troop_type} />
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
                        onChange={(e) => setData('type', e.target.value)}
                    />
    
                    <InputError message={errors.type} />
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
                        onChange={(e) => setData('attack_defense_stats', Number(e.target.value))}
                    />

                    <InputError message={errors.attack_defense_stats} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>

                    {hero && (
                        <SecondaryButton
                            className="ml-auto"
                            onClick={() => handleDelete(hero.id)}
                        >
                            Delete Hero
                        </SecondaryButton>
                    )}
                </div>
            </form>
        </section>
    )
}
