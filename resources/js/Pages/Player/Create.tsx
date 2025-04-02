import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PlayerInformationForm from './Partials/PlayerInformationForm';

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add New Player
                </h2>
            }
        >
            <Head title="Add New Player" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="mx-auto bg-white py-6 px-4 shadow sm:rounded-lg sm:p-8 sm:w-1/2">
                        <PlayerInformationForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
