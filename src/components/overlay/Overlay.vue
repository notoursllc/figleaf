<script>
export default {
    name: 'Overlay'
}
</script>

<script setup>
import { computed, watch } from 'vue';
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

    /**
     * The size of the spinner
     */
    size: {
        type: String,
        default: overlaySizes.md,
        validator: (val) => Object.keys(overlaySizes).includes(val)
    },

    /**
     * The variant (color) of the spinner
     */
    variant: {
        type: String,
        default: overlayVariants.primary,
        validator: (val) => Object.keys(overlayVariants).includes(val)
    },

    zIndex: {
        type: Number,
        default: 10
    },

    lockWindow: {
        type: Boolean,
        default: true
    },

    showSpinner: {
        type: Boolean,
        default: true
    }
});

const classNames = computed(() =>{
    return {
        'fig-overlay': true,
        'fig-overlay-visible': props.show
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

watch(
    () => props.show,
    (val) => {
        document.body.style.overflow = val && props.lockWindow ? 'hidden' : 'auto';
    },
    { immediate: true }
)
</script>


<template>
    <div 
        :class="classNames"
        :style="`z-index:${zIndex}`">
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
            <div 
                v-if="showSpinner" 
                class="spinner-container">
                <fig-spinner
                    :width="spinnerWidth"
                    :color="spinnerColor"
                    :stroke-width="strokeWidth" />
            </div>
        </div>
    </div>
</template>


<style>
.fig-overlay {
    @apply fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-black invisible opacity-0;
    /* transition: visibility 0.3s linear, opacity 0.3s linear; */
    transition: visibility 0.3s linear;
    transition-delay: 100ms
}

.fig-overlay-visible {
    @apply visible opacity-25;
    transition-delay: 0ms;
}

.spinner-container {
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
}
</style>
