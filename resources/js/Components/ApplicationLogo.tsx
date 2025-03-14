import { ImgHTMLAttributes } from 'react';

interface ApplicationLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: 36 | 80;
}

export default function ApplicationLogo({
    size = 80,
    ...props
}: ApplicationLogoProps) {
    const imagePath = `/images/logo_${size}.png`;
    
    return (
        <img
            {...props}
            src={imagePath}
            alt="Application Logo"
            className={props.className || ''}
        />
    );
}
