import UTCTime from '@/Components/UTCTime';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Dashboard() {
    const tempestArms = usePage().props.features.tempestArms;
    const heroes = usePage().props.features.heroes;

    const visitPlayers = () => {
        router.visit(route('players.index'));
    };

    const visitTempestArms = () => {
        router.visit(route('tempest-arms.index'));
    };

    const visitHeroes = () => {
        router.visit(route('heroes.index'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UTCTime />

                            <hr className="my-6"/>

                            <PrimaryButton onClick={visitPlayers}>
                                Players
                            </PrimaryButton>

                            {tempestArms && (
                                <div>
                                    <hr className="my-6"/>

                                    <PrimaryButton onClick={visitTempestArms}>
                                        Tempest Arms
                                    </PrimaryButton>
                                </div>
                            )}

                            {heroes && (
                                <div>
                                    <hr className="my-6"/>

                                    <PrimaryButton onClick={visitHeroes}>
                                        Heroes
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
