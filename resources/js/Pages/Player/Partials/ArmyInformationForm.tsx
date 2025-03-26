import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Army } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FormData {
    player_id: number;
    plasma: number | null;
    tier: number | null;
    t12_infantry: number | null;
    t12_rider: number | null;
    t12_hunter: number | null;
    [key: string]: any;
}

export default function ArmyInformationForm({
    playerId,
    army,
}: {
    playerId: number,
    army: Army | null,
}) {
    const {
        data,
        setData,
        patch,
        post,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: army?.player_id ?? playerId,
        plasma: army?.plasma ?? null,
        tier: army?.tier ?? null,
        t12_infantry: army?.t12_infantry ?? null,
        t12_rider: army?.t12_rider ?? null,
        t12_hunter: army?.t12_hunter ?? null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (army) {
            patch(route('army.update', army.id), { preserveScroll: true });
        } else {
            post(route('army.store'), { preserveScroll: true });
        }
    };

    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'plasma' | 'tier' | 't12_infantry' | 't12_rider' | 't12_hunter'
    ) => {
        const value = e.target.value;
        setData(field, value === '' ? null : Number(value));
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Troops
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update troops information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="plasma" value="Plasma" />

                    <TextInput
                        id="level"
                        type="number"
                        name="level"
                        min="1"
                        value={data.plasma || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'plasma')}
                    />

                    <InputError message={errors.plasma} className="mt-2" />
                </div>


                <div>
                    <InputLabel htmlFor="tier" value="Tier" />

                    <TextInput
                        id="tier"
                        type="number"
                        name="tier"
                        min="1"
                        value={data.tier || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'tier')}
                    />

                    <InputError message={errors.tier} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="t12_infantry" value="T12 Infantry" />

                    <TextInput
                        id="t12_infantry"
                        type="number"
                        name="t12_infantry"
                        min="1"
                        value={data.t12_infantry || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 't12_infantry')}
                    />

                    <InputError message={errors.t12_infantry} className="mt-2" />
                </div>


                <div>
                    <InputLabel htmlFor="t12_rider" value="T12 Rider" />

                    <TextInput
                        id="t12_rider"
                        type="number"
                        name="t12_rider"
                        min="1"
                        value={data.t12_rider || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 't12_rider')}
                    />

                    <InputError message={errors.t12_rider} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="t12_hunter" value="T12 Hunter" />

                    <TextInput
                        id="t12_hunter"
                        type="number"
                        name="t12_hunter"
                        min="1"
                        value={data.t12_hunter || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 't12_hunter')}
                    />

                    <InputError message={errors.t12_hunter} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <InputError message={errors.player_id} />

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
                </div>
            </form>
        </section>
    );
}
