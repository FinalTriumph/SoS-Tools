import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Mk2 } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function UpdateMk2InformationForm({
    playerId,
    mk2,
}: {
    playerId: number,
    mk2: Mk2 | null,
}) {
    const [showMainSkills, setShowMainSkills] = useState(false);

    const { data, setData, patch, post, processing, errors, recentlySuccessful } = useForm({
        player_id: mk2?.player_id ?? playerId,
        level: mk2?.level ?? null,
        stars: mk2?.stars ?? null,
        color: mk2?.color ?? null,
        skills: mk2?.skills ?? null,
        skill_1: mk2?.skill_1 ?? null,
        skill_2: mk2?.skill_2 ?? null,
        skill_3: mk2?.skill_3 ?? null,
        skill_4: mk2?.skill_4 ?? null,
        skill_5: mk2?.skill_5 ?? null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mk2) {
            patch(route('mk2.update', mk2.id), { preserveScroll: true });
        } else {
            post(route('mk2.store'), { preserveScroll: true });
        }
    };

    const toggleMainSkills = () => {
        setShowMainSkills(!showMainSkills);
    };

    return (
        <section className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Behemoth MK2 Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update Behemoth MK2 information.
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
                        onChange={(e) => setData('level', Number(e.target.value))}
                    />

                    <InputError message={errors.level} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="stars" value="Stars" />

                    <TextInput
                        id="stars"
                        type="number"
                        name="stars"
                        min="1"
                        value={data.stars || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('stars', Number(e.target.value))}
                    />

                    <InputError message={errors.stars} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="color" value="Color" />

                    <TextInput
                        id="color"
                        name="color"
                        value={data.color || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('color', e.target.value)}
                    />

                    <InputError message={errors.color} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="skills" value="Skills" />

                    <TextInput
                        id="skills"
                        type="number"
                        name="skills"
                        min="0"
                        value={data.skills || ''}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('skills', Number(e.target.value))}
                    />

                    <InputError message={errors.skills} className="mt-2" />
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
                                onChange={(e) => setData('skill_1', Number(e.target.value))}
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
                                onChange={(e) => setData('skill_2', Number(e.target.value))}
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
                                onChange={(e) => setData('skill_3', Number(e.target.value))}
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
                                onChange={(e) => setData('skill_4', Number(e.target.value))}
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
                                onChange={(e) => setData('skill_5', Number(e.target.value))}
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