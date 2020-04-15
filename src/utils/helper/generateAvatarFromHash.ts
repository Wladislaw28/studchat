import tinycolor from 'tinycolor2';

export interface IColorsForAvatar {
    color: string;
    colorLighter: string;
}

export const generateAvatarFromHash = (hash: string): IColorsForAvatar => {
    const [r, g, b]: Array<number> = hash.substring(0, 3)
        .split('')
        .map(char => char.charCodeAt(0) > 255 ? 255
            : char.charCodeAt(0) < 0 ? 0
                : char.charCodeAt(0));
    return {
        color: tinycolor({ r, g, b }).toHexString(),
        colorLighter: tinycolor({ r, g, b }).lighten(40).toHexString()
    };
};