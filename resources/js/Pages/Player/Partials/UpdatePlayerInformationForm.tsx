import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Player } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function UpdatePlayerInformationForm({
    player,
}: {
    player: Player,
}) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        username: player.username,
        behemoths_bp: player.behemoths_bp,
        squadron_bp: player.squadron_bp,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('player.update', player.id));
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Player Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update player information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="behemoths_bp" value="Behemoths BP" />

                    <TextInput
                        id="behemoths_bp"
                        type="number"
                        name="behemoths_bp"
                        min="0"
                        value={data.behemoths_bp}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('behemoths_bp', Number(e.target.value))}
                        required
                    />

                    <InputError message={errors.behemoths_bp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="squadron_bp" value="Squadron BP" />

                    <TextInput
                        id="squadron_bp"
                        type="number"
                        name="squadron_bp"
                        min="0"
                        value={data.squadron_bp}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('squadron_bp', Number(e.target.value))}
                        required
                    />

                    <InputError message={errors.squadron_bp} className="mt-2" />
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
                </div>
            </form>
        </section>
    );
}