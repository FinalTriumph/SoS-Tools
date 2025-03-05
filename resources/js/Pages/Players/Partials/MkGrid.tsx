import { Mk1, Mk2 } from '@/types';

interface MkGridProps {
    title: string;
    mk: Mk1 | Mk2 | null;
}

export default function MkGrid({ title, mk }: MkGridProps) {
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

        if (level === 200) {
            color = 'red';
        }
        else if (level >= 190) {
            color = 'gold';
        }
        else if (level >= 180) {
            color = 'purple';
        }
        else if (level >= 150) {
            color = 'blue';
        }
        else if (level >= 100) {
            color = 'green'
        }
        else if (level > 0) {
            color = 'slate';
        }
    
        return tailwindColor(color);
    }

    const skillsBg = (skills: number) => {
        let color = 'white';

        if (skills >= 44) {
            color = 'red';
        }
        else if (skills >= 32) {
            color = 'gold';
        }
        else if (skills >= 20) {
            color = 'purple';
        }
        else if (skills >= 10) {
            color = 'blue';
        }
        else if (skills >= 4) {
            color = 'green'
        }
        else if (skills > 0) {
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
                {title}
            </div>

            <div className="grid grid-cols-3">
                <div className={`cell bg-${levelBg(mk?.level ?? 0)}`}>
                    {mk?.level ?? '-'}
                </div>
                <div className={`cell bg-${tailwindColor(mk?.color ?? '')}`}>
                    {mk?.stars ?? '-'}
                </div>
                <div className={`cell bg-${skillsBg(mk?.skills ?? 0)}`}>
                    {mk?.skills ?? '-'}
                </div>
            </div>

            <div className="grid grid-cols-5">
                <div className={`cell bg-${skillBg(mk?.skill_1 ?? 0)}`}>
                    {mk?.skill_1 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(mk?.skill_2 ?? 0)}`}>
                    {mk?.skill_2 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(mk?.skill_3 ?? 0)}`}>
                    {mk?.skill_3 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(mk?.skill_4 ?? 0)}`}>
                    {mk?.skill_4 ?? '-'}
                </div>
                <div className={`cell bg-${skillBg(mk?.skill_5 ?? 0)}`}>
                    {mk?.skill_5 ?? '-'}
                </div>
            </div>
        </div>
    )
}
