<script>
export default {
    name: 'ButtonFab'
}
</script>

<script setup>
import { computed, useAttrs } from 'vue';
import FigIcon from '../icon/FigIcon.vue';

const props = defineProps({
    icon: {
        type: String,
        required: false,
        default: 'plus'
    },

    column: {
        type: Number,
        required: false,
        default: 1
    },

    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
});

const classes = computed(() => {
    return {
        'fig-button-fab': true,
        'fig-button-fab2': props.column === 2,
        'fig-button-fab-disabled': props.disabled,
        'fig-button-fab-red': props.icon === 'trash',
        'fig-button-fab-blue': props.icon === 'edit',
        'fig-button-fab-white': props.icon === 'x'
    }
});
</script>

<template>
    <button
        type="button"
        tabindex="0"
        class="fig-button-fab fixed rounded-full p-14px z-1"
        :class="classes"
        v-on="$listeners">
        <fig-icon
            :icon="icon"
            :height="28"
            :width="28"
            stroke="#fff" />
    </button>
</template>


<style scoped>
.fig-button-fab {
    @apply bg-emerald-500;
    bottom: 20px;
    right: 20px;
}
.fig-button-fab:not(.fig-button-fab-disabled):hover {
    @apply bg-emerald-600
}

.fig-button-fab2 {
    right: 100px;
}

.fig-button-fab-disabled {
    @apply opacity-50 cursor-not-allowed;
}

.fig-button-fab-red:not(.fig-button-fab-disabled) {
    @apply bg-red-600 hover:bg-red-700;
}
.fig-button-fab-blue:not(.fig-button-fab-disabled) {
    @apply bg-blue-600 hover:bg-blue-700;
}
.fig-button-fab-white:not(.fig-button-fab-disabled) {
    @apply bg-white hover:bg-gray-100;
}
</style>
