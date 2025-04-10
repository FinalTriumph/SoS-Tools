
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import { TempestArmSkill } from '@/types';

export default function Skill({
    skill,
    setSkill,
    getError,
}: {
    skill: TempestArmSkill;
    setSkill: (skill: TempestArmSkill) => void;
    getError: (field: keyof TempestArmSkill) => string | undefined;
}) {
    const handleSkillChange = (
        field: keyof TempestArmSkill,
        value: string | number | null
    ) => {
        setSkill({
            ...skill,
            [field]: value,
        } as TempestArmSkill);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <div>
                    <InputLabel htmlFor="skill-name" value="Skill Name" />

                    <TextInput
                        id="skill-name"
                        name="skill.name"
                        value={skill.name || ''}
                        className="mt-1 block"
                        onChange={(e) => handleSkillChange('name', e.target.value)}
                    />

                    <InputError message={getError('name' as keyof TempestArmSkill)} />
                </div>

                <div>
                    <InputLabel htmlFor="skill-level" value="Level" />

                    <TextInput
                        id="skill-level"
                        type="number"
                        name="skill.level"
                        min="0"
                        max="4"
                        value={skill.level || ''}
                        className="mt-1 block"
                        onChange={(e) => handleSkillChange('level', Number(e.target.value))}
                    />

                    <InputError message={getError('level' as keyof TempestArmSkill)} />
                </div>

                <div>
                    <InputLabel htmlFor="skill-quality" value="Quality" />

                    <SelectInput
                        id="skill-quality"
                        name="skill.quality"
                        value={skill.quality || ''}
                        options={[
                            { value: '', label: '' },
                            { value: 'common', label: 'Common' },
                            { value: 'rare', label: 'Rare' },
                            { value: 'ultra', label: 'Ultra' },
                        ]}
                        className="mt-1 block w-full"
                        onChange={(e) => handleSkillChange('quality', e.target.value)}
                    />

                    <InputError message={getError('quality' as keyof TempestArmSkill)} />
                </div>
            </div>
        </div>
    )
}
