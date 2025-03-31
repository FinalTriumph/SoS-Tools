import { getTailwindColorName } from '../Utils/colorUtils';

interface MkStarCellProps {
    color: string;
    stars: number;
}

export default function MkStarCell({ color, stars }: MkStarCellProps) {
    const starConfig = {
        1: '\u2605\u2606\u2606',
        2: '\u2605\u2606\u2605',
        3: '\u2605\u2605\u2605',
    };
    
    return (
        <div className={`cell border-x bg-${getTailwindColorName(color)}`}>
            {stars in starConfig ? starConfig[stars as keyof typeof starConfig] : '-'}
        </div>
    );
}
