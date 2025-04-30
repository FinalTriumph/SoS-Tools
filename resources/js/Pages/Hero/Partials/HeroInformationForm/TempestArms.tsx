import { HeroTempestArms } from '@/types/entities/hero';

export default function TempestArms({
    data,
    setDataField,
    getError,
}: {
    data: HeroTempestArms;
    setDataField: (field: keyof HeroTempestArms, value: number) => void;
    getError: (field: keyof HeroTempestArms) => string | undefined;
}) {
    console.log({
        data,
        setDataField,
        getError,
    });

    return (
        <div className="space-y-6 text-slate-400">
            <div className="flex gap-2">
                Attack Tempest Arm
            </div>

            <div>
                Defense Tempest Arm
            </div>
        </div>
    );
}
