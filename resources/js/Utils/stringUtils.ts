export const ucfirst = (str: string | null): string => {
    if (!str) {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};
