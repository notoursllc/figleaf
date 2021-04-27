<script>
import Vue from 'vue';
import { textCardVariants } from './constants';

export default Vue.extend({
    name: 'TextCard',

    props: {
        variant: {
            type: String,
            default: textCardVariants.plain,
            validator: (value) => Object.keys(textCardVariants).includes(value)
        },

        shadow: {
            type: Boolean
        },

        showBody: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        sectionClasses() {
            const classes = ['fig-text-card border border-gray-200 p-0'];

            if(this.shadow) {
                classes.push('shadow');
            }
            return classes;
        },

        headerClasses() {
            const classes = ['flex items-center py-1 px-3'];

            switch(this.variant) {
                case textCardVariants.dark:
                    classes.push(
                        'bg-gray-600 text-white'
                    );
                    break;

                default:
                    classes.push(
                        'bg-gray-200 text-gray-800'
                    );
                    break;
            }

            return classes;
        }
    }
});
</script>


<template>
    <section :class="sectionClasses">
        <header :class="headerClasses" v-if="$slots['header-left'] || $slots['header-right']">
            <div v-if="$slots['header-left']" class="flex items-center flex-grow"><slot name="header-left" /></div>
            <div v-if="$slots['header-right']" class="flex items-center"><slot name="header-right" /></div>
        </header>
        <div v-if="showBody" class="p-3"><slot /></div>
    </section>
</template>
