<script>
import { labelValueGroupDensity, labelValueClassNames_tablecell, labelValueClassNames_pr } from './constants.js';

export default {
    name: 'LabelValue',

    inject: {
        display: {
            default: undefined
        }
    },

    props: {
        valueClasses: {
            type: Array,
            default: () => {
                return [];
            }
        },

        required: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        containerClasses() {
            const classNames = [
                'fig-label-value-row',
                this.display.block ? 'block mb-2' : 'table-row'
            ];

            if(this.display.block) {
                switch(this.display.density) {
                    case labelValueGroupDensity.md:
                        classNames.push('mb-2');
                        break;

                    case labelValueGroupDensity.lg:
                        classNames.push('mb-4');
                        break;

                    case labelValueGroupDensity.xl:
                        classNames.push('mb-6');
                        break;

                    default:
                        classNames.push('mb-0');
                }
            }

            return classNames;
        },

        blockClasses() {
            const classNames = ['align-top'];

            if(this.display.block) {
                classNames.push('block');
            }
            else if(this.display.breakpoint) {
                classNames.push(
                    'block',

                    // NOTE: doing it this way so that a static list of class
                    // names can be set in constants.js, so those class names
                    // can be added to the 'safelist' config prop in tailwind.config.js
                    labelValueClassNames_tablecell[this.display.breakpoint]
                );
            }
            else {
                classNames.push('table-cell');
            }

            return classNames;
        },

        tableCellClasses() {
            const classNames = [];

            switch(this.display.density) {
                case labelValueGroupDensity.md:
                    classNames.push('pb-2');
                    break;

                case labelValueGroupDensity.lg:
                    classNames.push('pb-4');
                    break;

                case labelValueGroupDensity.xl:
                    classNames.push('pb-6');
                    break;

                default:
                    classNames.push('pb-0');
            }

            return classNames;
        },

        labelClasses() {
            const classNames = [].concat(this.blockClasses);

            if(!this.display.block && !this.display.breakpoint) {
                classNames.push('pr-2');
            }

            if(this.display.breakpoint) {
                classNames.push(
                    labelValueClassNames_pr[this.display.breakpoint]
                );
            }

            return classNames;
        },

        spanClasses() {
            let classNames = this.valueClasses.concat(this.blockClasses);

            if(!this.display.block) {
                classNames = classNames.concat(this.tableCellClasses);
            }

            return classNames;
        }
    }
};
</script>


<template>
    <div :class="containerClasses">
        <span v-if="$slots.label" :class="labelClasses"><slot name="label" /><span v-if="required" class="text-red-700">*</span></span>
        <span :class="spanClasses">
            <div><slot /></div>
            <div v-if="$slots.error" class="text-red-600 text-sm"><slot name="error" /></div>
        </span>
    </div>
</template>
