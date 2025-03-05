import { FormationSystem } from '@/types';

interface FormationSystemGridProps {
    formationSystem: FormationSystem | null;
}

export default function FormationSystemGrid({ formationSystem }: FormationSystemGridProps) {
    // TODO This is only for now, later will add custom colors
    const tailwindColor = (color: string) => {
        if (!color) {
            return 'white';
        }

        const shade = 200;

        return `${color === 'gold' ? 'orange' : color}-${shade}`;
    }

    const levelBg = (level: number) => {
        let color = 'white';

        if (level === 300) {
            color = 'red';
        }
        else if (level >= 220) {
            color = 'gold';
        }
        else if (level >= 160) {
            color = 'purple';
        }
        else if (level >= 120) {
            color = 'blue';
        }
        else if (level >= 80) {
            color = 'green'
        }
        else if (level > 0) {
            color = 'slate';
        }
    
        return tailwindColor(color);
    }

    const skillBg = (skill: number) => {
        let color = 'white';

        if (skill === 20) {
            color = 'red';
        }
        else if (skill >= 15) {
            color = 'gold';
        }
        else if (skill >= 10) {
            color = 'purple';
        }
        else if (skill >= 5) {
            color = 'blue';
        }
        else if (skill >= 1) {
            color = 'green'
        }
    
        return tailwindColor(color);
    }

    return (
        <div className="border border-slate-400">
            <div className="cell">
                Formation System
            </div>
            <div className={`cell bg-${levelBg(formationSystem?.level ?? 0)}`}>
                {formationSystem?.level ?? '-'}
            </div>

            <div className="grid grid-cols-5">
                <div className={`cell bg-${skillBg(formationSystem?.skill_1 ?? 0)}`}>
                    {formationSystem?.skill_1 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(formationSystem?.skill_2 ?? 0)}`}>
                    {formationSystem?.skill_2 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(formationSystem?.skill_3 ?? 0)}`}>
                    {formationSystem?.skill_3 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(formationSystem?.skill_4 ?? 0)}`}>
                    {formationSystem?.skill_4 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(formationSystem?.skill_5 ?? 0)}`}>
                    {formationSystem?.skill_5 ?? '-'}
                </div>
            </div>
        </div>
    )
}
