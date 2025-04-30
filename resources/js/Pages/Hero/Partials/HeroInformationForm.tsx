import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Hero, HeroGeneral, HeroTempestArms } from '@/types/entities/hero';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import General from './HeroInformationForm/General';
import TempestArms from './HeroInformationForm/TempestArms';

interface FormData {
    player_id: number | null;
    name: string | null;
    generation: number | null;
    troop_type: string | null;
    type: string | null;
    attack_defense_stats: number | null;
    attack_tempest_arm_id: number | null;
    defense_tempest_arm_id: number | null;
    [key: string]: any;
}

interface HeroInformationFormProps {
    hero?: Hero | null;
    players: { id: number; username: string }[];
}

export default function HeroInformationForm({
    hero,
    players,
}: HeroInformationFormProps) {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: hero?.player_id ?? null,
        name: hero?.name ?? null,
        generation: hero?.generation ?? null,
        troop_type: hero?.troop_type ?? null,
        type: hero?.type ?? null,
        attack_defense_stats: hero?.attack_defense_stats ?? null,
        attack_tempest_arm_id: hero?.attack_tempest_arm_id ?? null,
        defense_tempest_arm_id: hero?.defense_tempest_arm_id ?? null,
    });

    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (hero) {
            patch(route('hero.update', hero.id), { preserveScroll: true });
        } else {
            post(route('hero.store'), { preserveScroll: true });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete this hero?`)) {
            destroy(route('hero.destroy', id), {
                onError: () => console.error('Error deleting hero'),
            });
        }
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Hero
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {hero ? 'Update hero information' : 'Add hero information'}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex flex-col justify-between lg:flex-row lg:gap-8">
                    <General
                        players={players}
                        data={{
                            player_id: data.player_id,
                            name: data.name,
                            generation: data.generation,
                            troop_type: data.troop_type,
                            type: data.type,
                            attack_defense_stats: data.attack_defense_stats,
                        }}
                        setDataField={(field: keyof HeroGeneral, value: string | number) => setData(field, value)}
                        getError={(field: keyof HeroGeneral) => errors[field]}
                    />

                    {hero && (
                        <>
                            <hr className="my-6 lg:hidden" />

                            <TempestArms
                                data={{
                                    attack_tempest_arm_id: data.attack_tempest_arm_id,
                                    defense_tempest_arm_id: data.defense_tempest_arm_id,
                                }}
                                setDataField={(field: keyof HeroTempestArms, value: number) => setData(field, value)}
                                getError={(field: keyof HeroTempestArms) => errors[field]}
                            />
                        </>
                    )}
                </div>

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

                    {hero && (
                        <SecondaryButton
                            className="ml-auto"
                            onClick={() => handleDelete(hero.id)}
                        >
                            Delete Hero
                        </SecondaryButton>
                    )}
                </div>
            </form>
        </section>
    )
}
