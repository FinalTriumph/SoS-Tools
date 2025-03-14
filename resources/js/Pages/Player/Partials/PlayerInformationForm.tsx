import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Player } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FormData {
    username: string;
    alliance: string;
    behemoths_bp: number | null;
    squadron_bp: number | null;
    fa1_stars: number | null;
    [key: string]: any;
}

export default function PlayerInformationForm({
    player,
}: {
    player?: Player,
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
        username: player?.username ?? '',
        alliance: player?.alliance ?? '',
        behemoths_bp: player?.behemoths_bp ?? null,
        squadron_bp: player?.squadron_bp ?? null,
        fa1_stars: player?.fa1_stars ?? null,
     });

    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (player) {
            patch(route('player.update', player.id));
        } else {
            post(route('player.store'));
        }
    };

    const handleDelete = (id: number, username: string) => {
        if (confirm(`Are you sure you want to delete ${username}?`)) {
            destroy(route('player.destroy', id), {
                onError: () => console.error('Error deleting player'),
            });
        }
    };

    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'behemoths_bp' | 'squadron_bp' | 'fa1_stars'
    ) => {
        const value = e.target.value;
        setData(field, value === '' ? null : Number(value));
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Player
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {player ? 'Update player information' : 'Add player information'}
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
                    <InputLabel htmlFor="alliance" value="Alliance" />

                    <TextInput
                        id="alliance"
                        name="alliance"
                        value={data.alliance}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('alliance', e.target.value)}
                    />
 
                    <InputError message={errors.alliance} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="behemoths_bp" value="Behemoths BP" />

                    <TextInput
                        id="behemoths_bp"
                        type="number"
                        name="behemoths_bp"
                        min="1"
                        value={data.behemoths_bp || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'behemoths_bp')}
                    />

                    <InputError message={errors.behemoths_bp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="squadron_bp" value="Squadron BP" />

                    <TextInput
                        id="squadron_bp"
                        type="number"
                        name="squadron_bp"
                        min="1"
                        value={data.squadron_bp || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'squadron_bp')}
                    />

                    <InputError message={errors.squadron_bp} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fa1_stars" value="FA-1 Stars" />

                    <TextInput
                        id="fa1_stars"
                        type="number"
                        name="fa1_stars"
                        min="1"
                        value={data.fa1_stars || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'fa1_stars')}
                    />

                    <InputError message={errors.fa1_stars} className="mt-2" />
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

                    {player && (
                        <SecondaryButton
                            className="ml-auto"
                            onClick={() => handleDelete(player.id, player.username)}
                        >
                            Delete Player
                        </SecondaryButton>
                    )}
                </div>
            </form>
        </section>
    );
}
