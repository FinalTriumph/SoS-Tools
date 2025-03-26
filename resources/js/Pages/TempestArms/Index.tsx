import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index() {
    const handleAddNewTempestArmClick = () => {
        router.visit(route('tempest-arm.create'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tempest Arms
                </h2>
            }
        >
            <Head title="Tempest Arms" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SecondaryButton onClick={handleAddNewTempestArmClick}>
                                Add New Tempest Arm
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
