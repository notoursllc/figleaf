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
    },

    boldLabels: {
        type: Boolean,
        default: false
    }
});

const classNames = computed(() => {
    return {
        'fig-lvg': true,
        [`fig-lvg-${props.display}`]: true,
        [`fig-lvg-density-${props.density}`]: true,
        [`fig-lvg-breakpoint-${props.breakpoint}`]: true,
        'fig-lvg-boldlabel': props.boldLabels
    }
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

.fig-lvg-boldlabel .fig-lv-label {
    @apply font-semibold;
}
</style>
