import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Player } from '@/types';
import { Head } from '@inertiajs/react';
import UpdatePlayerInformationForm from './Partials/UpdatePlayerInformationForm';

export default function Edit({ player }: { player: Player }) {
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
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePlayerInformationForm player={player} />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
