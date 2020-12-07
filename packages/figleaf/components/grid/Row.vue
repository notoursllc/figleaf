<script>
// NOTE: used this tool to figure out the class names:
// https://tailwindgrids.com/#/

function fractionValidator(value) {
    return ['1/6', '1/5', '1/4', '1/3', '1/2', 'full', ''].includes(value);
}

function gapValidator(value) {
    return ['32', '24', '20', '16', '12', '10', '8', '6', '5', '4', '3', '2', '1', 'px', ''].includes(value);
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

    provide() {
        return {
            gridState: {
                colClasses: this.colClassNames
            }
        };
    },

    computed: {
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
        },

        rowClassNames() {
            const classes = ['flex', 'flex-wrap'];

            ['xl', 'lg', 'md', 'sm', 'default'].forEach((size) => {
                const val = this[size];
                if(val !== 'full' && val) {
                    const base = `-mx-${val}`;

                    classes.push(
                        size === 'default' ? base : `${size}:${base}`
                    );
                }
            });

            return classes;
        }
    }
};
</script>


<template>
    <div :class="rowClassNames"><slot></slot></div>
</template>
