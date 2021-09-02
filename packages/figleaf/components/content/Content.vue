<script>
import { contentSizes } from './constants';

export default {
    props: {
        size: {
            type: String,
            default: contentSizes.xl,
            validator: (value) => Object.keys(contentSizes).includes(value)
        },

        nopad: {
            type: Boolean
        },

        fullHeight: {
            type: Boolean
        }
    },

    computed: {
        classNames() {
            const classes = [
                'fig-content',
                `fig-content-${this.size}`
            ];

            if(!this.nopad) {
                classes.push('px-2');
            }

            if(this.fullHeight) {
                classes.push('h-full');
            }

            return classes;
        }
    }
};
</script>

<template>
    <div :class="classNames"><slot /></div>
</template>


<style scoped>
.fig-content {
    @apply relative;
    max-width: 1586px;
    margin: 0 auto;
}
.fig-content-sm {
    max-width: 640px;
}
.fig-content-md {
    max-width: 768px;
}
.fig-content-lg {
    max-width: 1025px;
}
.fig-content-xl {
    max-width: 1586px;
}
</style>
