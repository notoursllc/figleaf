<script>
// widths: https://tailwindcss.com/docs/width
const FRACTIONS = [
    '1/2',
    '1/3',
    '2/3',
    '1/4',
    '2/4',
    '3/4',
    '1/5',
    '2/5',
    '3/5',
    '4/5',
    '1/6',
    '2/6',
    '3/6',
    '4/6',
    '5/6',
    '1/12',
    '2/12',
    '3/12',
    '4/12',
    '5/12',
    '6/12',
    '7/12',
    '8/12',
    '9/12',
    '10/12',
    '11/12',
    'full',
    ''];

// https://tailwindcss.com/docs/padding
const GAPS = [
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '14',
    '16',
    '20',
    '24',
    '28',
    '32',
    '36',
    '40',
    '44',
    '48',
    '52',
    '56',
    '60',
    '64',
    '72',
    '80',
    '96',
    'px',
    ''
];


function fractionValidator(value) {
    return FRACTIONS.includes(value);
}

function gapValidator(value) {
    return GAPS.includes(value);
}


export default {
    name: 'FigRow',

    props: {
        // desktop
        xl: {
            type: String,
            default: null,
            validator: fractionValidator
        },

        // laptop
        lg: {
            type: String,
            default: null,
            validator: fractionValidator
        },

        // tablet
        md: {
            type: String,
            default: null,
            validator: fractionValidator
        },

        // wide mobile
        sm: {
            type: String,
            default: null,
            validator: fractionValidator
        },

        // mobile (default)
        default: {
            type: String,
            default: 'full',
            validator: fractionValidator
        },


        // desktop gap
        xlGap: {
            type: String,
            default: null,
            validator: gapValidator
        },

        // laptop gap
        lgGap: {
            type: String,
            default: null,
            validator: gapValidator
        },

        // tablet gap
        mdGap: {
            type: String,
            default: null,
            validator: gapValidator
        },

        // wide mobile gap
        smGap: {
            type: String,
            default: null,
            validator: gapValidator
        },

        // mobile gap (default)
        defaultGap: {
            type: String,
            default: '3',
            validator: gapValidator
        }
    },

    data() {
        return {
            sharedState: {
                colClasses: this.colClassNames()
            }
        };
    },

    provide() {
        return {
            gridState: {
                ...this.sharedState
            }
        };
    },

    computed: {
        rowClassNames() {
            const classes = ['flex', 'flex-wrap'];

            ['xl', 'lg', 'md', 'sm', 'default'].forEach((size) => {
                const val = this[size];
                if(!['full', 'screen', 'min', 'max', 'auto'].includes(val) && val) {
                    const base = `-mx-${val}`;

                    classes.push(
                        size === 'default' ? base : `${size}:${base}`
                    );
                }
            });

            return classes;
        }
    },

    methods: {
        colClassNames() {
            const classes = [];

            // width classes
            ['xl', 'lg', 'md', 'sm', 'default'].forEach((size) => {
                // width classes
                const val = this[size];
                if(val) {
                    const base = `w-${val}`;
                    classes.push(
                        size === 'default' ? base : `${size}:${base}`
                    );
                }

                // gap classes
                const gapVal = this[`${size}Gap`];
                if(gapVal) {
                    classes.push(
                        size === 'default'
                            ? `px-${gapVal} my-${gapVal}`
                            : `${size}:px-${gapVal} ${size}:my-${gapVal}`
                    );
                }
            });

            return classes;
        }
    }
};


function getWhiteListClasses() {
    const whitelist = [];

    ['xl', 'lg', 'md', 'sm', 'default'].forEach((size) => {
        FRACTIONS.forEach(fraction => {
            const base = `w-${fraction}`;

            whitelist.push(
                size === 'default'
                    ? base
                    : `${size}:${base}`
            );
        });

        GAPS.forEach(gap => {
            const basePx = `px-${gap}`;
            const baseMy = `my-${gap}`;

            whitelist.push(
                size === 'default'
                    ? (basePx, baseMy)
                    : (`${size}:${basePx}`, `${size}:${baseMy}`)
            );
        });
    });

    return whitelist;
}

export const whiteListClasses = getWhiteListClasses();
</script>


<template>
    <div :class="rowClassNames"><slot></slot></div>
</template>
