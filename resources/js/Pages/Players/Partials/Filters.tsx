import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useState, useCallback } from 'react';

export default function Filters({
    alliances,
    topCount: initialTopCount,
    alliance: initialAlliance,
    rankBy: initialRankBy,
}: {
    alliances: string[],
    topCount: number,
    alliance: string | null,
    rankBy: string | null,
}) {
    const [alliance, setAlliance] = useState<string | undefined>(initialAlliance || undefined);
    const [rankBy, setRankBy] = useState<string | undefined>(initialRankBy || undefined);
    const [topCount, setTopCount] = useState<number>(initialTopCount);
    const [applyDisabled, setApplyDisabled] = useState(true);

    const apply = useCallback(() => {
        setApplyDisabled(true);

        router.get(route('players.index'), {
            alliance: alliance,
            rank_by: rankBy,
            top: topCount,
        }, {
            preserveState: true,
        });
    }, [alliance, rankBy, topCount]);

    return (
        <div className="flex items-end gap-2">
            <div>
                <InputLabel htmlFor="alliance" value="Alliance" />

                <SelectInput
                    id="alliance"
                    name="alliance"
                    value={alliance}
                    options={[
                        { value: '', label: '-' },
                        ...alliances.map(alliance => ({
                            value: alliance, label: alliance
                        })),
                    ]}
                    className="mt-1 block text-sm"
                    onChange={(e) => {
                        setAlliance(e.target.value);
                        setApplyDisabled(false);
                    }}
                />
            </div>

            <div>
                <InputLabel htmlFor="rank_by" value="Rank by" />

                <SelectInput
                    id="rank_by"
                    name="rank_by"
                    value={rankBy}
                    options={[
                        { value: '', label: 'Behemoths BP + Squadron BP' },
                        { value: 'behemoths_bp', label: 'Behemoths BP' },
                        { value: 'squadron_bp', label: 'Squadron BP' },
                    ]}
                    className="mt-1 block text-sm"
                    onChange={(e) => {
                        setRankBy(e.target.value);
                        setApplyDisabled(false);
                    }}
                />
            </div>

            <div>
                <InputLabel htmlFor="top" value="Top" />

                <TextInput
                    id="top"
                    type="number"
                    name="top"
                    min="1"
                    value={topCount}
                    className="mt-2 block text-sm"
                    onChange={(e) => {
                        setTopCount(parseInt(e.target.value || '1', 10));
                        setApplyDisabled(false);
                    }}
                />
            </div>

            <PrimaryButton
                disabled={applyDisabled}
                onClick={apply}
            >
                Apply
            </PrimaryButton>
        </div>
    );
};
