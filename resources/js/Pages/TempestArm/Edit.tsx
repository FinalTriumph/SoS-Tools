import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TempestArm } from '@/types';
import { Head } from '@inertiajs/react';
import TempestArmInformationForm from './Partials/TempestArmInformationForm';

export default function Create({
    players,
    tempestArm,
}: {
    players: { id: number; username: string }[];
    tempestArm: TempestArm;
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Tempest Arm
                </h2>
            }
        >
            <Head title="Edit Tempest Arm" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <TempestArmInformationForm
                            players={players}
                            tempestArm={tempestArm}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
