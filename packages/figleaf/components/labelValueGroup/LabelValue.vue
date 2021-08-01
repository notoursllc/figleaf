<script>
import { labelValueGroupDensity } from './constants.js';

export default {
    name: 'LabelValue',

    inject: {
        display: {
            default: undefined
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
                    `${this.display.breakpoint}:table-cell`
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
                    `${this.display.breakpoint}:pr-3`
                );
            }

            return classNames;
        },

        spanClasses() {
            let classNames = [].concat(this.blockClasses);

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
        <span v-if="$slots.label" :class="labelClasses"><slot name="label" /></span>
        <span :class="spanClasses"><slot /></span>
    </div>
</template>
