interface HarmonyOption {
    label: string;
    description: string;
}

export const harmonyData: Record<string, HarmonyOption> = {
    'matching': {
        label: 'Matching',
        description: 'Finds colors that are similar or monochromatic.'
    },
    'complementary': {
        label: 'Complementary',
        description: 'Finds colors that are opposite on the color wheel.'
    },
    'neutral': {
        label: 'Neutral',
        description: 'Finds neutral colors like grays, blacks, whites, and browns.'
    }
};