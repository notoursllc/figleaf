<script>
import { textCardVariants } from './constants';

export default {
    name: 'TextCard',

    props: {
        variant: {
            type: String,
            default: textCardVariants.light,
            validator: (value) => Object.keys(textCardVariants).includes(value)
        },

        shadow: {
            type: Boolean
        },

        showBody: {
            type: Boolean,
            default: true
        },

        border: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        sectionClasses() {
            const classes = ['fig-text-card p-0 rounded-sm'];

            if(this.shadow) {
                classes.push('shadow');
            }

            if(this.border) {
                classes.push('border border-gray-200')
            }

            return classes;
        },

        headerClasses() {
            const classes = ['flex items-center py-1 px-3'];

            switch(this.variant) {
                case textCardVariants.dark:
                    classes.push(
                        'bg-gray-700 text-white'
                    );
                    break;

                case textCardVariants.light:
                    classes.push(
                        'bg-gray-200 text-gray-800'
                    );
                    break;

                default:
                    classes.push(
                        'bg-white text-gray-800 border-b border-gray-200'
                    );
                    break;
            }

            return classes;
        }
    }
};
</script>


<template>
    <section :class="sectionClasses">
        <header :class="headerClasses" v-if="$slots['header-left'] || $slots['header-right']">
            <div v-if="$slots['header-left']" class="flex items-center grow"><slot name="header-left" /></div>
            <div v-if="$slots['header-right']" class="flex items-center"><slot name="header-right" /></div>
        </header>
        <div v-if="showBody" class="p-3 bg-white"><slot /></div>
    </section>
</template>
