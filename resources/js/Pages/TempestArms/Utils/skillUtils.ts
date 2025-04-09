export const getSkillColor = (quality: string | null): string => {
    const skillQualityColors: { [key: string]: string } = {
        common: 'purple',
        rare: 'gold',
        ultra: 'red',
    };

    return quality && quality in skillQualityColors ? skillQualityColors[quality] : '';
};

export const skillLevelToRoman = (level: number | null): string => {
    if (!level || level > 4) {
        return '';
    }

    const roman = ['I', 'II', 'III', 'IV'];
    return roman[level - 1];
};
