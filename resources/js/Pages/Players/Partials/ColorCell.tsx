import { getTailwindColor, ColorType } from '../Utils/colorUtils';

interface ColorCellProps {
    type: ColorType;
    value: number;
}

export default function ColorCell({ type, value }: ColorCellProps) {
    return (
        <div className={`cell bg-${getTailwindColor(type, value)}`}>
            {value || '-'}
        </div>
    );
}
