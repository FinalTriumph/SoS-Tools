import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TempestArm } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';

export default function Index({
    tempestArms,
}: {
    tempestArms: TempestArm[], 
}) {
    const { delete: destroy } = useForm();

    const handleAddNewTempestArmClick = () => {
        router.visit(route('tempest-arm.create'));
    };

    const handleEditClick = (tempestArm: TempestArm) => {
        router.visit(route('tempest-arm.edit', tempestArm.id));
    };

    const handleDeleteClick = (id: number) => {
        if (confirm(`Are you sure you want to delete tempest arm?`)) {
            destroy(route('tempest-arm.destroy', id), {
                onError: () => console.error('Error deleting tempest arm'),
            });
        }
    };

    const ucfirst = (str: string | null) => {
        if (!str) {
            return '';
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
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

                            {(tempestArms.length > 0) && (
                                <div>
                                    <hr className="my-6"/>

                                    <div className="grid grid-cols-4 gap-4">
                                        {tempestArms.map((tempestArm, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-md border border-slate-500"
                                            >
                                                <div>{tempestArm.player_id}</div>
                                                <div>{ucfirst(tempestArm.troop_type)}</div>
                                                <div>{ucfirst(tempestArm.type)}</div>
                                                <div>{ucfirst(tempestArm.generation)}</div>

                                                {tempestArm.stats && (
                                                    <div className="mt-4">
                                                        {tempestArm.stats.map((stat, index) => (
                                                            <div key={index}>
                                                                <div>{stat.name} {stat.value}{stat.is_percentage ? '%' : ''} / {stat.color}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {tempestArm.skill && (
                                                    <div className="mt-4">
                                                        <div>{tempestArm.skill.name} {tempestArm.skill.level} / {tempestArm.skill.quality}</div>
                                                    </div>
                                                )}

                                                <hr className="my-4"/>

                                                <div className="flex">
                                                    <SecondaryButton onClick={() => handleEditClick(tempestArm)}>
                                                        Edit
                                                    </SecondaryButton>

                                                    <SecondaryButton
                                                        className="ml-auto"
                                                        onClick={() => handleDeleteClick(tempestArm.id)}
                                                    >
                                                        Delete
                                                    </SecondaryButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
