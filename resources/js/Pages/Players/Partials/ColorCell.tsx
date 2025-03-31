import { getTailwindColor, ColorType } from '../Utils/colorUtils';

interface ColorCellProps {
    type: ColorType;
    value: number;
    prefix?: string;
    className?: string;
}

export default function ColorCell({ type, value, prefix, className }: ColorCellProps) {
    return (
        <div className={`cell bg-${getTailwindColor(type, value)} ${className ?? ''}`}>
            {`${prefix || ''}${value || '-'}`}
        </div>
    );
}
