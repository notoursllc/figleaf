import { removeLeadingSlash } from '../../utils/common';


/*
* Bunny Optimizer allows us to use CSS class names to specify image size, for better security:
* https://bunny.net/blog/introducing-bunny-optimizer-image-classes/
*
* Additional docs: https://support.bunny.net/hc/en-us/articles/360027448392-Bunny-Optimizer-Engine-Documentation
*/
export function getImage(src, config) {
    const path = removeLeadingSlash(src);

    let className = config.preset;
    if(config.modifiers) {
        className = `w${config.modifiers.width}`;
    }

    return {
        url: `https://bv-pullzone-1.b-cdn.net/${path}?class=${className}`
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
    }
};
