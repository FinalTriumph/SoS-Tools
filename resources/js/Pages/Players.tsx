import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

interface Player {
    id: number;
    username: string;
    behemoths_bp: number;
    squadron_bp: number;
}

export default function Players({ players }: { players: Player[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this player?')) {
            destroy(route('player.destroy', id), {
                preserveScroll: true,
                onError: () => console.error('Error deleting player'),
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Players
                </h2>
            }
        >
            <Head title="Players" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Link
                                href={route('player.create')}
                                className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                            >
                                Add New Player
                            </Link>

                            <ul>
                                {players.map((player) => (
                                    <li key={player.id} className="mt-4 border py-4 px-6">
                                        {player.username} (Behemoths BP: {player.behemoths_bp}, Squadron BP: {player.squadron_bp})
                                        <Link
                                            href={route('player.edit', player.id)}
                                            className="ml-2 text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            type="button"
                                            className="ml-2 text-red-600 hover:text-red-900"
                                            onClick={() => handleDelete(player.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
