<script>
export default {
    name: 'Badge'
}
</script>

<script setup>
import { ref, computed } from 'vue';
import { badgeVariants, badgeSizes } from './constants.js';

const props = defineProps({
    tag: {
        type: String,
        default: 'div'
    },

    variant: {
        type: String,
        default: 'light',
        validator: (value) => {
            return Object.values(badgeVariants).includes(value);
        }
    },

    size: {
        type: String,
        default: 'sm',
        validator: (value) => {
            return Object.values(badgeSizes).includes(value);
        }
    }
});

const classes = computed(() => {
    return {
        'fig-badge': true,
        'fig-badge-md': props.size === badgeSizes.md,
        'fig-badge-sm': props.size === badgeSizes.sm,
        [`fig-badge-${props.variant}`]: true

    }
});
</script>


<template>
    <component :is="tag" :class="classes"><slot /></component>
</template>


<style scoped>
.fig-badge {
    @apply rounded-full flex items-center justify-center font-semibold whitespace-nowrap absolute tracking-normal px-1 py-0;
    padding-bottom: 1px;
}

/* Sizes */
.fig-badge-sm {
    @apply text-sm leading-5 h-5;
    min-width: 20px;
}
.fig-badge-md {
    @apply text-lg leading-6 h-6;
    min-width: 24px;
}

/* Variants */
.fig-badge-info {
    @apply text-white bg-blue-600;
}
.fig-badge-success {
    @apply text-white bg-emerald-600;
}
.fig-badge-error {
    @apply text-white bg-red-600;
}
.fig-badge-warning {
    @apply text-white bg-orange-600;
}
.fig-badge-dark {
    @apply text-white bg-gray-500;
}
.fig-badge-light {
    @apply text-gray-700 bg-gray-300;
}
</style>
