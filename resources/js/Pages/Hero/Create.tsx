import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HeroInformationForm from './Partials/HeroInformationForm';

export default function Create({
    players,
}: {
    players: { id: number; username: string }[];
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Hero
                </h2>
            }
        >
            <Head title="Add New Hero" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="mx-auto bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8 sm:w-1/2">
                        <HeroInformationForm players={players} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
