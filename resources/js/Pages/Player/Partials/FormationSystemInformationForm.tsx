import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { FormationSystem } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface FormData {
    player_id: number;
    level: number | null;
    skill_1: number | null;
    skill_2: number | null;
    skill_3: number | null;
    skill_4: number | null;
    skill_5: number | null;
    [key: string]: any;
}

export default function FormationSystemInformationForm({
    playerId,
    formationSystem,
}: {
    playerId: number,
    formationSystem: FormationSystem | null,
}) {
    const [showMainSkills, setShowMainSkills] = useState(false);

    const {
        data,
        setData,
        patch,
        post,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: formationSystem?.player_id ?? playerId,
        level: formationSystem?.level ?? null,
        skill_1: formationSystem?.skill_1 ?? null,
        skill_2: formationSystem?.skill_2 ?? null,
        skill_3: formationSystem?.skill_3 ?? null,
        skill_4: formationSystem?.skill_4 ?? null,
        skill_5: formationSystem?.skill_5 ?? null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (formationSystem) {
            patch(route('formation-system.update', formationSystem.id), { preserveScroll: true });
        } else {
            post(route('formation-system.store'), { preserveScroll: true });
        }
    };

    const handleNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'level' | 'skill_1' | 'skill_2' | 'skill_3' | 'skill_4' | 'skill_5'
    ) => {
        const value = e.target.value;
        setData(field, value === '' ? null : Number(value));
    };

    const toggleMainSkills = () => {
        setShowMainSkills(!showMainSkills);
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Formation System
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update Formation System information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="level" value="Level" />

                    <TextInput
                        id="level"
                        type="number"
                        name="level"
                        min="1"
                        value={data.level || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => handleNumberChange(e, 'level')}
                    />

                    <InputError message={errors.level} className="mt-2" />
                </div>

                <div>
                    <SecondaryButton onClick={toggleMainSkills}>
                        Main Skills
                    </SecondaryButton>

                    <div className={`space-y-6 transition-all duration-500 ${showMainSkills ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                        <div className="mt-4">
                            <InputLabel htmlFor="skill_1" value="Skill 1" />

                            <TextInput
                                id="skill_1"
                                type="number"
                                name="skill_1"
                                min="1"
                                value={data.skill_1 || ''}
                                className="mt-1 block w-full"
                                onChange={(e) => handleNumberChange(e, 'skill_1')}
                            />

                            <InputError message={errors.skill_1} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="skill_2" value="Skill 2" />

                            <TextInput
                                id="skill_2"
                                type="number"
                                name="skill_2"
                                min="1"
                                value={data.skill_2 || ''}
                                className="mt-1 block w-full"
                                onChange={(e) => handleNumberChange(e, 'skill_2')}
                            />

                            <InputError message={errors.skill_2} className="mt-2" />
                        </div>


                        <div>
                            <InputLabel htmlFor="skill_3" value="Skill 3" />

                            <TextInput
                                id="skill_3"
                                type="number"
                                name="skill_3"
                                min="1"
                                value={data.skill_3 || ''}
                                className="mt-1 block w-full"
                                onChange={(e) => handleNumberChange(e, 'skill_3')}
                            />

                            <InputError message={errors.skill_3} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="skill_4" value="Skill 4" />

                            <TextInput
                                id="skill_4"
                                type="number"
                                name="skill_4"
                                min="1"
                                value={data.skill_4 || ''}
                                className="mt-1 block w-full"
                                onChange={(e) => handleNumberChange(e, 'skill_4')}
                            />

                            <InputError message={errors.skill_4} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="skill_5" value="Skill 5" />

                            <TextInput
                                id="skill_5"
                                type="number"
                                name="skill_5"
                                min="1"
                                value={data.skill_5  || ''}
                                className="mt-1 block w-full"
                                onChange={(e) => handleNumberChange(e, 'skill_5')}
                            />

                            <InputError message={errors.skill_5} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <InputError message={errors.player_id} />

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
                </div>
            </form>
        </section>
    );
}
