<script>
export default {
    name: 'FigRow',

    props: {
        // desktop
        xl: {
            type: String,
            default: null
        },

        // laptop
        lg: {
            type: String,
            default: null
        },

        // tablet
        md: {
            type: String,
            default: null
        },

        // wide mobile
        sm: {
            type: String,
            default: null
        },

        // mobile (default)
        default: {
            type: String,
            default: 'full'
        },

        // desktop gap
        xlGap: {
            type: String,
            default: null
        },

        // laptop gap
        lgGap: {
            type: String,
            default: null
        },

        // tablet gap
        mdGap: {
            type: String,
            default: null
        },

        // wide mobile gap
        smGap: {
            type: String,
            default: null
        },

        // mobile gap (default)
        defaultGap: {
            type: String,
            default: '3'
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
</script>


<template>
    <div :class="rowClassNames"><slot></slot></div>
</template>
