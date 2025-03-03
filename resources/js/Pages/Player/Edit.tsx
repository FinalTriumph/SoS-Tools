import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Player {
    id: number;
    username: string;
    behemoths_bp: number;
    squadron_bp: number;
}

export default function Edit({ player }: { player: Player }) {
    const { data, setData, put, processing, errors } = useForm({
        username: player.username,
        behemoths_bp: player.behemoths_bp,
        squadron_bp: player.squadron_bp,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('player.update', player.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Player
                </h2>
            }
        >
            <Head title="Edit Player" />

            <div className="py-12">
                <div className="mx-auto sm:max-w-md sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white px-6 py-4 shadow-md sm:rounded-lg">
                        <form onSubmit={submit}>
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

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
