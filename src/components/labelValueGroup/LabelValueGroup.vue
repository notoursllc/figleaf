<script>
export default {
    name: 'LabelValueGroup'
}
</script>

<script setup>
import { computed } from 'vue';
import {
    labelValueGroupBreakpoints,
    labelValueGroupDensity,
    labelValueGroupDisplay } from './constants.js';

const props = defineProps({
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
});

const classNames = computed(() => {
    return [
        'fig-lvg',
        `fig-lvg-${props.display}`,
        `fig-lvg-density-${props.density}`,
        `fig-lvg-breakpoint-${props.breakpoint}`,
    ];
});
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
