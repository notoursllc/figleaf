/*
* Bunny Optimizer allows us to use CSS class names to specify image size, for better security:
* https://bunny.net/blog/introducing-bunny-optimizer-image-classes/
*
* Additional docs: https://support.bunny.net/hc/en-us/articles/360027448392-Bunny-Optimizer-Engine-Documentation
*/
export function getImage(src, config) {
    let url = new URL(src, 'https://bv-pullzone-1.b-cdn.net');

    if(config.preset) {
        url.searchParams.set('class', config.preset)
    }

    if(config?.modifiers?.width) {
        url.searchParams.set('class', `w${config.modifiers.width}`)
    }

    return {
        url: url.href
    };
}


export const presets = {
    prodthumb: {
        modifiers: {
            format: 'jpg',
            width: 75,
            height: 75
        }
    },
    prodthumbxs: {
        modifiers: {
            format: 'jpg',
            width: 45,
            height: 45
        }
    },
    w45: {},
    w75: {},
    w150: {
        modifiers: {
            format: 'jpg',
            width: 150
        }
    },
    w375: {
        modifiers: {
            format: 'jpg',
            width: 375
        }
    },
    w500: {},
    w550: {},
    w575: {},
    w1280: {
        modifiers: {
            format: 'jpg',
            width: 1280
        }
    },
};
