import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { TempestArm } from '@/types';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface FormData {
    player_id: number;
    troop_type: string;
    type: string;
    generation: string;
    stats: {
        name: string;
        value: number;
        is_percentage: boolean;
        color: string;
    }[];
    skill: {
        name: string;
        level: number;
        quality: string;
    } | null;
    [key: string]: any;
}

export default function TempestArmInformationForm({
    tempestArm,
    players,
}: {
    tempestArm?: TempestArm | null;
    players: { id: number; username: string }[];
}) {
    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        recentlySuccessful
    } = useForm<FormData>({
        player_id: tempestArm?.player_id ?? 0,
        troop_type: tempestArm?.troop_type ?? '',
        type: tempestArm?.type ?? '',
        generation: tempestArm?.generation ?? '',
        stats: tempestArm?.stats ?? [
            { name: '', value: 0, is_percentage: false, color: '' },
            { name: '', value: 0, is_percentage: false, color: '' },
            { name: '', value: 0, is_percentage: false, color: '' },
            { name: '', value: 0, is_percentage: false, color: '' },
        ],
        skill: tempestArm?.skill ?? { name: '', level: 0, quality: '' },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (tempestArm) {
            console.log('Update');
            // patch(route('tempest-arm.update', tempestArm.id), { preserveScroll: true });
        } else {
            post(route('tempest-arm.store'), { preserveScroll: true });
        }
    };

    const handleStatChange = (
        index: number,
        field: 'name' | 'value' | 'is_percentage' | 'color',
        value: string | number | boolean
    ) => {
        const newStats = [...data.stats];

        if (field === 'name' || field === 'color') {
            newStats[index][field] = value as string;
        } else if (field === 'value') {
            newStats[index][field] = value as number;
        } else if (field === 'is_percentage') {
            newStats[index][field] = value as boolean;
        }

        setData('stats', newStats);
    };

    const handleSkillChange = (
        field: 'name' | 'level' | 'quality',
        value: string | number | null
    ) => {
        setData('skill', { 
            name: data.skill?.name ?? '', 
            level: data.skill?.level ?? 0, 
            quality: data.skill?.quality ?? '', 
            [field]: value 
        });
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
                <div>
                    <InputLabel htmlFor="player_id" value="Player" />

                    <SelectInput
                        id="player_id"
                        name="player_id"
                        value={data.player_id}
                        options={[
                            { value: '', label: '-' },
                            ...(players?.map(player => ({
                                value: player.id,
                                label: player.username,
                            })) || [])
                        ]}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('player_id', Number(e.target.value))}
                    />

                    <InputError message={errors.player_id} />
                </div>

                <div>
                    <InputLabel htmlFor="troop_type" value="Troop Type" />

                    <SelectInput
                        id="troop_type"
                        name="troop_type"
                        value={data.troop_type}
                        options={[
                            { value: '', label: '-' },
                            { value: 'infantry', label: 'Infantry' },
                            { value: 'riders', label: 'Riders' },
                            { value: 'hunters', label: 'Hunters' },
                        ]}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('troop_type', e.target.value)}
                    />

                    <InputError message={errors.troop_type} />
                </div>

                <div>
                    <InputLabel htmlFor="type" value="Type" />

                    <SelectInput
                        id="type"
                        name="type"
                        value={data.type}
                        options={[
                            { value: '', label: '-' },
                            { value: 'attack', label: 'Attack' },
                            { value: 'defense', label: 'Defense' },
                        ]}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('type', e.target.value)}
                    />

                    <InputError message={errors.type} />
                </div>

                <div>
                    <InputLabel htmlFor="generation" value="Generation" />

                    <SelectInput
                        id="generation"
                        name="generation"
                        value={data.generation}
                        options={[
                            { value: '', label: '-' },
                            { value: 'g1', label: 'G1' },
                            { value: 'g2', label: 'G2' },
                            { value: 'g3', label: 'G3' },
                            { value: 's1', label: 'S1' },
                        ]}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('generation', e.target.value)}
                    />

                    <InputError message={errors.generation} />
                </div>

                <hr className="my-6"/>

                <div className="space-y-6">
                    <InputLabel value="Stats" />

                    {data.stats.map((stat, index) => (
                        <div key={index} className="flex gap-2">
                            <div>
                                <InputLabel htmlFor={`stat-${index}-name`} value="Stat" />

                                <TextInput
                                    id={`stat-${index}-name`}
                                    name={`stats.${index}.name`}
                                    value={stat.name}
                                    className="mt-1 block"
                                    onChange={(e) => handleStatChange(index, 'name', e.target.value)}
                                />

                                <InputError message={errors[`stats.${index}.name`]} />
                            </div>

                            <div>
                                <InputLabel htmlFor={`stat-${index}-value`} value="Value" />

                                <TextInput
                                    id={`stat-${index}-value`}
                                    type="number"
                                    name={`stats.${index}.value`}
                                    min="0"
                                    max="1000"
                                    value={stat.value}
                                    className="mt-1 block"
                                    onChange={(e) =>
                                        handleStatChange(index, 'value', Number(e.target.value))
                                    }
                                />

                                <InputError message={errors[`stats.${index}.value`]} />
                            </div>

                            <div>
                                <InputLabel htmlFor={`stat-${index}-is_percentage`} value="Percentage" />

                                <SelectInput
                                    id={`stat-${index}-is_percentage`}
                                    name={`stats.${index}.is_percentage`}
                                    value={stat.is_percentage.toString()}
                                    options={[
                                        { value: 'true', label: 'Yes' },
                                        { value: 'false', label: 'No' },
                                    ]}
                                    className="mt-1 block"
                                    onChange={(e) => handleStatChange(index, 'is_percentage', e.target.value === 'true')}
                                />

                                <InputError message={errors[`stats.${index}.is_percentage`]} />
                            </div>

                            <div>
                                <InputLabel htmlFor={`stat-${index}-color`} value="Color" />

                                <SelectInput
                                    id={`stat-${index}-color`}
                                    name={`stats.${index}.color`}
                                    value={stat.color}
                                    options={[
                                        { value: '', label: '-' },
                                        { value: 'purple', label: 'Purple' },
                                        { value: 'gold', label: 'Gold' },
                                        { value: 'red', label: 'Red' },
                                    ]}
                                    className="mt-1 block"
                                    onChange={(e) => handleStatChange(index, 'color', e.target.value)}
                                />

                                <InputError message={errors[`stats.${index}.color`]} />
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="my-6"/>

                <div className="space-y-6">
                    <InputLabel value="Skill" />

                    <div className="flex gap-4">
                        <div>
                            <InputLabel htmlFor="skill-name" value="Name" />

                            <TextInput
                                id="skill-name"
                                name="skill.name"
                                value={data.skill?.name || ''}
                                className="mt-1 block"
                                onChange={(e) => handleSkillChange('name', e.target.value)}
                            />

                            <InputError message={errors['skill.name']} />
                        </div>

                        <div>
                            <InputLabel htmlFor="skill-level" value="Level" />

                            <TextInput
                                id="skill-level"
                                type="number"
                                name="skill.level"
                                min="1"
                                max="4"
                                value={data.skill?.level || ''}
                                className="mt-1 block"
                                onChange={(e) =>
                                    handleSkillChange('level', Number(e.target.value))
                                }
                            />

                            <InputError message={errors['skill.level']} />
                        </div>

                        <div>
                            <InputLabel htmlFor="skill-quality" value="Quality" />

                            <SelectInput
                                id="skill-quality"
                                name="skill.quality"
                                value={data.skill?.quality || ''}
                                options={[
                                    { value: '', label: '-' },
                                    { value: 'common', label: 'Common' },
                                    { value: 'rare', label: 'Rare' },
                                    { value: 'ultra', label: 'Ultra' },
                                ]}
                                className="mt-1 block w-full"
                                onChange={(e) => handleSkillChange('quality', e.target.value)}
                            />

                            <InputError message={errors['skill.quality']} />
                        </div>
                    </div>
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
                </div>
            </form>
        </section>
    );
}
