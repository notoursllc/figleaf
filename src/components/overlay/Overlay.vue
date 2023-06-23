<script>
export default {
    name: 'Overlay'
}
</script>

<script setup>
import { computed } from 'vue';
import FigSpinner from '../spinner/Spinner.vue';
import {
    overlaySizes,
    overlayVariants
} from './constants';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },

    dark: {
        type: Boolean,
        default: false
    },

    opacity: {
        type: Number,
        default: 0.75,
        validator(val) {
            return val >= 0 && val <= 1;
        }
    },

    blur: {
        type: Number,
        default: 2
    },

    size: {
        type: String,
        default: overlaySizes.md,
        validator: (val) => Object.keys(overlaySizes).includes(val)
    },

    variant: {
        type: String,
        default: overlayVariants.primary,
        validator: (val) => Object.keys(overlayVariants).includes(val)
    },

    zIndex: {
        type: Number,
        default: 10
    }
});

const spinnerWidth = computed(() => {
    switch(props.size) {
        case overlaySizes.xs:
            return 14;

        case overlaySizes.sm:
            return 26;

        case overlaySizes.lg:
            return 60;

        case overlaySizes.xl:
            return 90;

        default:
            return 40;
    }
});

const strokeWidth = computed(() => {
    switch(props.size) {
        case overlaySizes.xs:
            return 4;

        case overlaySizes.sm:
            return 3;

        default:
            return 2;
    }
});

const spinnerColor = computed(() => {
    switch(props.variant) {
        case overlayVariants.success:
            return '#16a34a';

        case overlayVariants.error:
            return '#ef4444';

        case overlayVariants.secondary:
            return '#a8a29e';

        default:
            return '#60a5fa';
    }
});

const backdropStyle = computed(() => {
    const style = {
        opacity: props.opacity,
        backgroundColor: props.dark ? '#CBD5E0' : '#e7e5e4'
    };

    if(props.blur) {
        style.backdropFilter = `blur(${props.blur}px`;
    }

    return style;
});
</script>


<template>
    <div class="fig-overlay relative">
        <slot></slot>
        <div
            v-if="show"
            class="absolute inset-0"
            :style="{'zIndex': zIndex}">

            <!-- backdrop  -->
            <div
                class="absolute inset-0"
                :style="backdropStyle"></div>

            <!-- spinner -->
            <div class="spinner-container">
                <fig-spinner
                    :width="spinnerWidth"
                    :color="spinnerColor"
                    :stroke-width="strokeWidth" />
            </div>
        </div>
    </div>
</template>


<style>
.spinner-container {
    @apply absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>
