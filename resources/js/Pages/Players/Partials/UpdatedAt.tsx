import { ColorType, getTailwindColor } from '../Utils/colorUtils';

interface UpdatedAtProps {
    date: string | null;
    className?: string;
}

export default function UpdatedAt({ date, className }: UpdatedAtProps) {
    if (!date) {
        return (
            <div className="cell">-</div>
        );
    }

    const daysBetween = Math.floor(
        (new Date().getTime() - new Date(date).getTime()) / 
        (1000 * 60 * 60 * 24)
    );

    return (
        <div className={`cell bg-${getTailwindColor(ColorType.UpdatedAt, daysBetween)} ${className ?? ''}`}>
            {daysBetween === 0 ? 'Today' : daysBetween === 1 ? '1 day ago' : `${daysBetween} days ago`}
        </div>
    );
}
