<script>
export default {
    name: 'Button'
}
</script>

<script setup>
import { computed, useSlots } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import FigSpinner from '../spinner/Spinner.vue';
import {
    buttonSizes,
    buttonVariants,
    buttonTypes
} from './constants';

const props = defineProps({
    size: {
        type: String,
        default: buttonSizes.md,
        validator: (value) => Object.keys(buttonSizes).includes(value)
    },

    variant: {
        type: String,
        default: buttonVariants.plain,
        validator: (value) => Object.keys(buttonVariants).includes(value)
    },

    type: {
        type: String,
        default: buttonTypes.button,
        validator: (value) => Object.keys(buttonTypes).includes(value)
    },

    loading: {
        type: Boolean,
        default: false
    },

    block: {
        type: Boolean,
        default: false
    },

    dotted: {
        type: Boolean,
        default: false
    },

    disabled: {
        type: Boolean,
        default: false
    },

    icon: {
        type: String,
        default: null
    }
});

const slots = useSlots();

const hasIcon = computed(() => {
    return slots.icon || props.icon;
});

const classNames = computed(() => {
    const classes = [];

    if(props.block) {
        classes.push('block w-full');
    }

    if(props.dotted) {
        classes.push('border-dashed border border-gray-500');
    }
    else {
        // transparent border so the button does not appear smaller
        // than a button with a dotted border
        classes.push('border border-transparent');
    }

    if(props.disabled) {
        classes.push('cursor-not-allowed');
    }

    if(props.hasIcon) {
        classes.push('align-bottom');
    }

    if(props.loading) {
        classes.push('fig-button-loading');
    }

    // variants
    if(props.disabled) {
        classes.push(
            'text-gray-400 bg-gray-200'
        );
    }
    else {
        switch(props.variant) {
            case 'danger':
                classes.push(
                    'text-white bg-red-600 hover:bg-red-700'
                );
                break;

            case 'ghost':
                classes.push(
                    // 'bg-transparent',
                    'text-gray-900 hover:bg-gray-300'
                );
                break;

            case 'link':
                classes.push(
                    'bg-transparent text-blue-700 hover:bg-blue-100'
                );
                break;

            case 'plain':
            case 'plain-outline':
                classes.push(
                    'bg-gray-200 hover:bg-gray-300 text-gray-800'
                );

                if(props.variant === 'plain-outline') {
                    classes.push('border-1 border-gray-700');
                }
                break;


            case 'primary':
                classes.push(
                    'text-white bg-blue-500 hover:bg-blue-600'
                );
                break;

            case 'success':
                classes.push(
                    'text-white bg-emerald-500 hover:bg-emerald-600'
                );
                break;

            case 'success-outline':
                classes.push(
                    'background-white text-emerald-700 border-emerald-600 hover:bg-emerald-600'
                );
                break;

            case 'naked':
                classes.push('border-0 background-transparent p-0');
                break;

            case 'warning':
                classes.push(
                    'text-gray-900 bg-amber-400 hover:bg-amber-500'
                );
                break;
        }
    }

    // sizes
    const isNaked = props.variant === 'naked';
    switch(props.size) {
        case 'sm':
            if(!isNaked) {
                classes.push(
                    !slots.default ? 'p-1' : 'py-1 px-3'
                );
            }
            classes.push('text-sm');
            break;

        case 'lg':
            if(!isNaked) {
                classes.push(
                    !slots.default ? 'p-4' :'py-3 px-6'
                );
            }
            break;

        default:
            if(!isNaked) {
                classes.push(
                    !slots.default ? 'p-2' : 'py-2 px-3'
                );
            }
            classes.push('text-base leading-tight');
    }

    return classes;
});

const iconStrokeColor = computed(() => {
    switch(props.variant) {
        case 'danger':
        case 'primary':
        case 'success':
            return '#fff';

        default:
            return '#565656';
    }
});

const spinnerStrokeWidth = computed(() => {
    switch(props.size) {
        case buttonSizes.sm:
            return 3;

        default:
            return 2;
    }
});

const spinnerWidth = computed(() => {
    switch(props.size) {
        case buttonSizes.sm:
            return 18;

        case buttonSizes.md:
            return 22;

        default:
            return 26;
    }
});
</script>


<template>
    <button
        :type="props.type"
        class="fig-button"
        :class="classNames"
        tabindex="0"
        :disabled="props.disabled"
        :aria-disabled="props.disabled">
        <fig-spinner
            v-if="props.loading"
            :color="iconStrokeColor"
            :stroke-width="spinnerStrokeWidth"
            :width="spinnerWidth" />
        <div v-else class="flex items-center justify-center">
            <template v-if="hasIcon">
                <slot name="icon">
                    <fig-icon
                        :icon="props.icon"
                        :stroke-width="1.5"
                        :stroke="iconStrokeColor"
                        :width="20"
                        :height="20" />
                </slot>
            </template>
            <div :class="{'pl-1': hasIcon && slots.default}"><slot></slot></div>
        </div>
    </button>
</template>

<style>
.fig-button {
    @apply rounded font-medium;
}

.fig-button svg {
    @apply inline-block;
}

.fig-button-loading {
    @apply text-center;
}
</style>
