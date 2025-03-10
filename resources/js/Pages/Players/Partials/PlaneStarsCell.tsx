import { getTailwindColor, ColorType } from '../Utils/colorUtils';

interface PlaneStarsCellProps {
    stars: number;
}

export default function PlaneStarsCell({ stars }: PlaneStarsCellProps) {
    const starConfig = {
        1: '\u2605\u2606\u2606\u2606\u2606\u2606',
        2: '\u2605\u2605\u2606\u2606\u2606\u2606',
        3: '\u2605\u2605\u2605\u2606\u2606\u2606',
        4: '\u2605\u2605\u2605\u2605\u2606\u2606',
        5: '\u2605\u2605\u2605\u2605\u2605\u2606',
        6: '\u2605\u2605\u2605\u2605\u2605\u2605',
    };
    
    return (
        <td className={`bg-${getTailwindColor(ColorType.PlaneStars, stars)}`}>
            {stars in starConfig ? starConfig[stars as keyof typeof starConfig] : '-'}
        </td>
    );
}
