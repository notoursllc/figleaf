<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';
import FigSpinner from '../spinner/Spinner';
import {
    buttonSizes,
    buttonVariants,
    buttonTypes
} from './constants';

export default Vue.extend({
    name: 'Button',

    components: {
        FigIcon,
        FigSpinner
    },

    props: {
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
    },

    computed: {
        hasIcon() {
            return this.$slots.icon || this.icon;
        },

        classNames() {
            const classes = [];

            if(this.block) {
                classes.push('block w-full');
            }

            if(this.dotted) {
                classes.push('border-dashed border border-gray-500');
            }
            else {
                // transparent border so the button does not appear smaller
                // than a button with a dotted border
                classes.push('border border-transparent');
            }

            if(this.disabled) {
                classes.push('cursor-not-allowed');
            }

            if(this.hasIcon) {
                classes.push('align-bottom');
            }

            // variants
            if(this.disabled) {
                classes.push(
                    'text-gray-400 bg-gray-200'
                );
            }
            else {
                switch(this.variant) {
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

                        if(this.variant === 'plain-outline') {
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
                            'text-white bg-green-500 hover:bg-green-600'
                        );
                        break;

                    case 'success-outline':
                        classes.push(
                            'background-white text-green-700 border-green-600 hover:bg-green-600'
                        );
                        break;

                    case 'naked':
                        classes.push('border-0 background-transparent p-0');
                        break;
                }
            }

            // sizes
            const isNaked = this.variant === 'naked';
            switch(this.size) {
                case 'sm':
                    if(!isNaked) {
                        classes.push(
                            !this.$slots.default ? 'p-1' : 'py-1 px-3'
                        );
                    }
                    classes.push('text-sm');
                    break;

                case 'lg':
                    if(!isNaked) {
                        classes.push(
                            !this.$slots.default ? 'p-4' :'py-3 px-6'
                        );
                    }
                    classes.push('text-md');
                    break;

                default:
                    if(!isNaked) {
                        classes.push(
                            !this.$slots.default ? 'p-2' : 'py-2 px-3'
                        );
                    }
                    classes.push('text-md leading-tight');
            }

            return classes;
        },

        iconStrokeColor() {
            switch(this.variant) {
                case 'danger':
                case 'primary':
                case 'success':
                    return '#fff';

                default:
                    return '#565656';
            }
        },

        spinnerStrokeWidth() {
            switch(this.size) {
                case buttonSizes.sm:
                    return 3;

                default:
                    return 2;
            }
        },

        spinnerWidth() {
            switch(this.size) {
                case buttonSizes.sm:
                    return 18;

                case buttonSizes.md:
                    return 22;

                default:
                    return 26;
            }
        }
    }
});
</script>


<template>
    <button
        v-on="$listeners"
        :type="type"
        class="fig-button rounded font-medium flex items-center justify-center"
        :class="classNames"
        tabindex="0"
        :disabled="disabled"
        :aria-disabled="disabled">
        <fig-spinner
            v-if="loading"
            :color="iconStrokeColor"
            :stroke-width="spinnerStrokeWidth"
            :width="spinnerWidth" />
        <template v-else>
            <template v-if="hasIcon">
                <slot name="icon">
                    <fig-icon
                        :icon="icon"
                        :stroke-width="1.5"
                        :stroke="iconStrokeColor"
                        :width="20"
                        :height="20" />
                </slot>
            </template>
            <div :class="{'pl-1': hasIcon && $slots.default}"><slot></slot></div>
        </template>
    </button>
</template>
