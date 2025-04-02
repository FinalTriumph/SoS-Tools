import { ColorType, getTailwindColor } from '../../Players/Utils/colorUtils';

interface UpdatedAtProps {
    date: string | null;
}

export default function UpdatedAt({ date }: UpdatedAtProps) {
    if (!date) return null;

    const daysBetween = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 
        (1000 * 60 * 60 * 24)
    );

    return (
        <div className={`py-1 px-3 rounded-lg text-xs bg-${getTailwindColor(ColorType.UpdatedAt, daysBetween)}`}>
            Last updated {daysBetween === 0 ? 'today' : daysBetween === 1 ? '1 day ago' : `${daysBetween} days ago`}
        </div>
    );
}
