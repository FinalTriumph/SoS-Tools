export enum ColorType {
    MkLevel,
    MkSkills,
    Skill,
    FormationSystemLevel,
    T12Skill,
    Plasma,
    TroopsTier,
    PlaneStars,
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
            44: 'red-d',
            43: 'red',
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
            16: 'gold',
            11: 'purple',
            6: 'blue',
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
    [ColorType.T12Skill]: {
        type: ColorType.T12Skill,
        thresholds: {
            13: 'red',
            8: 'gold',
            3: 'purple',
            1: 'blue',
        },
    },
    [ColorType.Plasma]: {
        type: ColorType.Plasma,
        thresholds: {
            15: 'red',
            14: 'gold',
            13: 'purple',
            12: 'blue',
            11: 'green',
            1: 'grey',
        },
    },
    [ColorType.TroopsTier]: {
        type: ColorType.TroopsTier,
        thresholds: {
            12: 'red',
            11: 'gold',
            10: 'purple',
            9: 'blue',
            8: 'green',
            1: 'grey',
        },
    },
    [ColorType.PlaneStars]: {
        type: ColorType.MkSkills,
        thresholds: {
            6: 'red',
            5: 'gold',
            4: 'purple',
            3: 'blue',
            2: 'green',
            1: 'grey',
        },
    },
};

export const getTailwindColorName = (color: string) => {
    if (!color) {
        return '';
    }

    return `custom-td-${color}`;
}

export const getTailwindColor = (type: ColorType, value: number) => {
    const config = colorConfigs[type];
    let color = '';

    for (const threshold of Object.keys(config.thresholds).sort((a, b) => parseInt(b) - parseInt(a))) {
        if (value >= parseInt(threshold)) {
            color = config.thresholds[threshold];
            break;
        }
    }

    return getTailwindColorName(color);
}
