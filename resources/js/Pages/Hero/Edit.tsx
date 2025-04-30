import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Hero } from '@/types/entities/hero';
import { Head } from '@inertiajs/react';
import HeroInformationForm from './Partials/HeroInformationForm';

export default function Create({
    players,
    hero,
}: {
    players: { id: number; username: string }[];
    hero: Hero;
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Hero
                </h2>
            }
        >
            <Head title="Edit Hero" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <HeroInformationForm
                            players={players}
                            hero={hero}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
