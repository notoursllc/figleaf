<script>
import { labelValueGroupBreakpoints, labelValueGroupDensity } from './constants.js';

export default {
    name: 'LabelValueGroup',

    props: {
        block: {
            type: Boolean,
            default: false
        },

        breakpoint: {
            type: String,
            default: labelValueGroupBreakpoints.sm,
            validator: (value) => Object.keys(labelValueGroupBreakpoints).includes(value)
        },

        density: {
            type: String,
            default: labelValueGroupDensity.sm,
            validator: (value) => Object.keys(labelValueGroupDensity).includes(value)
        }
    },

    computed: {
        classNames() {
            return [
                'fig-label-value-group',
                this.block ? 'block' : 'table'
            ];
        }
    },

    provide() {
        return {
            display: {
                block: this.block,
                breakpoint: this.breakpoint,
                density: this.density
            }
        };
    }
};
</script>


<template>
    <div :class="classNames">
        <slot></slot>
    </div>
</template>
