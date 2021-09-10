<script>
import { labelValueGroupDensity, labelValueGroupBreakpoints } from './constants.js';

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
                classNames.push('block');

                // NOTE: a much cleaner approach would be to simply concatenate the
                // breakpoint to create the tailwind class, like this:
                // `${this.display.breakpoint}:table-cell`
                // However doing so would prevent PurgeCSS from finding the full class name
                // which may result from them being removed.
                // So unfortunately I gotta put in a switch statement
                switch(this.display.breakpoint) {
                    case labelValueGroupBreakpoints.sm:
                        classNames.push('sm:table-cell');
                        break;

                    case labelValueGroupBreakpoints.md:
                        classNames.push('md:table-cell');
                        break;

                    case labelValueGroupBreakpoints.lg:
                        classNames.push('lg:table-cell');
                        break;

                    case labelValueGroupBreakpoints.xl:
                        classNames.push('xl:table-cell');
                        break;
                }
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

            if(!this.display.block) {
                classNames.push('pr-2');
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
