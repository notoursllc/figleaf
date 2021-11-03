<script>
import {
    labelValueGroupBreakpoints,
    labelValueGroupDensity,
    labelValueGroupDisplay } from './constants.js';

export default {
    name: 'LabelValueGroup',

    props: {
        display: {
            type: String,
            default: labelValueGroupDisplay.block,
            validator: (value) => Object.keys(labelValueGroupDisplay).includes(value)
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
                'fig-lvg',
                `fig-lvg-${this.display}`,
                `fig-lvg-density-${this.density}`,
                `fig-lvg-breakpoint-${this.breakpoint}`,
            ];
        }
    }
};
</script>


<template>
    <div :class="classNames">
        <slot></slot>
    </div>
</template>


<style>
.fig-lvg-block {
    @apply block;
}

.fig-lvg-table {
    @apply table;
}

.fig-lvg-row {
    @apply flex flex-row;
}
</style>
