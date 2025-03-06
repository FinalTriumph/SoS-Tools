export enum ColorType {
    MkLevel,
    MkSkills,
    Skill,
    FormationSystemLevel,
}

interface CellColorConfig {
    type: ColorType;
    thresholds: { [key: string]: string };
}

const colorConfigs: { [key in ColorType]: CellColorConfig } = {
    [ColorType.MkLevel]: {
        type: ColorType.MkLevel,
        thresholds: {
            200: 'red',
            190: 'gold',
            180: 'purple',
            170: 'blue',
            160: 'green',
            150: 'grey',
        },
    },
    [ColorType.MkSkills]: {
        type: ColorType.MkSkills,
        thresholds: {
            44: 'red',
            33: 'gold',
            20: 'purple',
            8: 'blue',
            2: 'green',
            1: 'grey',
        },
    },
    [ColorType.Skill]: {
        type: ColorType.Skill,
        thresholds: {
            20: 'red',
            15: 'gold',
            10: 'purple',
            5: 'blue',
            1: 'green',
        },
    },
    [ColorType.FormationSystemLevel]: {
        type: ColorType.FormationSystemLevel,
        thresholds: {
            300: 'red',
            230: 'gold',
            150: 'purple',
        },
    },
};

export const getTailwindColorName = (color: string) => {
    if (!color) {
        return 'white';
    }

    return `custom-td-${color}`;
}

export const getTailwindColor = (type: ColorType, value: number) => {
    const config = colorConfigs[type];
    let color = 'white';

    for (const threshold of Object.keys(config.thresholds).sort((a, b) => parseInt(b) - parseInt(a))) {
        if (value >= parseInt(threshold)) {
            color = config.thresholds[threshold];
            break;
        }
    }

    return getTailwindColorName(color);
}
