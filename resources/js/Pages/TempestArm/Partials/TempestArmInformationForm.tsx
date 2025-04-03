import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import {
    TempestArm,
    TempestArmGeneral,
    TempestArmStat,
    TempestArmStats,
    TempestArmSkill,
} from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import General from './TempestArmInformationForm/General';
import Stats from './TempestArmInformationForm/Stats';
import Skill from './TempestArmInformationForm/Skill';

interface FormData {
    player_id: number | null;
    troop_type: string | null;
    type: string | null;
    generation: string | null;
    stats: TempestArmStats;
    skill: TempestArmSkill;
    [key: string]: any;
}

interface TempestArmInformationFormProps {
    tempestArm?: TempestArm | null;
    players: { id: number; username: string }[];
}

export default function TempestArmInformationForm({
    tempestArm,
    players,
}: TempestArmInformationFormProps) {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: tempestArm?.player_id ?? null,
        troop_type: tempestArm?.troop_type ?? null,
        type: tempestArm?.type ?? null,
        generation: tempestArm?.generation ?? null,
        stats: tempestArm?.stats ?? [
            { name: null, value: null, is_percentage: null, color: null },
            { name: null, value: null, is_percentage: null, color: null },
            { name: null, value: null, is_percentage: null, color: null },
            { name: null, value: null, is_percentage: null, color: null },
        ],
        skill: tempestArm?.skill ?? { name: null, level: null, quality: null },
    });

    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (tempestArm) {
            patch(route('tempest-arm.update', tempestArm.id), { preserveScroll: true });
        } else {
            post(route('tempest-arm.store'), { preserveScroll: true });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete this tempest arm?`)) {
            destroy(route('tempest-arm.destroy', id), {
                onError: () => console.error('Error deleting tempest arm'),
            });
        }
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Tempest Arm
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {tempestArm ? 'Update tempest arm information' : 'Add tempest arm information'}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <General
                    players={players}
                    data={data as TempestArmGeneral}
                    setDataField={(field: keyof TempestArmGeneral, value: string | number) => setData(field, value)}
                    getError={(field: keyof TempestArmGeneral) => errors[field]}
                />

                <hr className="my-6" />

                <Stats
                    stats={data.stats}
                    setStats={(stats: TempestArmStats) => setData('stats', stats)}
                    getError={(index: number, field: keyof TempestArmStat) => errors[`stats.${index}.${field}`]}
                />

                <hr className="my-6" />

                <Skill
                    skill={data.skill}
                    setSkill={(skill: TempestArmSkill) => setData('skill', skill)}
                    getError={(field: keyof TempestArmSkill) => errors[`skill.${field}`]}
                />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>

                    {tempestArm && (
                        <SecondaryButton
                            className="ml-auto"
                            onClick={() => handleDelete(tempestArm.id)}
                        >
                            Delete Tempest Arm
                        </SecondaryButton>
                    )}
                </div>
            </form>
        </section>
    );
}
