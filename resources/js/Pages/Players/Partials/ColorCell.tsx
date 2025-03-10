import { getTailwindColor, ColorType } from '../Utils/colorUtils';

interface ColorCellProps {
    type: ColorType;
    value: number;
    prefix?: string;
}

export default function ColorCell({ type, value, prefix }: ColorCellProps) {
    return (
        <div className={`cell bg-${getTailwindColor(type, value)}`}>
            {`${prefix || ''}${value || '-'}`}
        </div>
    );
}
