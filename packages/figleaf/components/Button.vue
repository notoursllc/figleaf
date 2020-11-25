<script>
import Vue from 'vue';
import FigIcon from './icon/FigIcon';

export default Vue.extend({
    name: 'Button',

    components: {
        FigIcon
    },

    props: {
        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        },

        variant: {
            type: String,
            default: 'plain',
            validator: (value) => {
                return [
                    'danger',
                    'ghost',
                    'link',
                    'plain',
                    'plain-outline',
                    'primary',
                    'success',
                    'success-outline'].includes(value);
            }
        },

        type: {
            type: String,
            default: 'button',
            validator: (value) => {
                return ['button', 'submit', 'reset'].includes(value);
            }
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

        icon: {
            type: String,
            default: null
        }
    },

    computed: {
        isDisabled() {
            return this.isLoading || ['true', true].indexOf(this.$attrs.disabled) > -1;
        },

        classNames() {
            const classes = [];

            if(this.block) {
                classes.push('block');
            }

            if(this.dotted) {
                classes.push('border-dashed border border-gray-500')
            }

            if(this.isDisabled) {
                classes.push('cursor-not-allowed');
            }

            // variants
            switch(this.variant) {
                case 'danger':
                    classes.push(
                        'text-white',
                        this.isDisabled ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'
                    );
                    break;

                case 'ghost':
                    classes.push(
                        // 'bg-transparent',
                        this.isDisabled ? 'text-gray-600' : 'text-gray-900 hover:bg-gray-400'
                    );
                    break;

                case 'link':
                    classes.push(
                        'bg-transparent',
                        this.isDisabled ? 'text-gray-600' : 'text-blue-700 hover:bg-blue-100'
                    );
                    break;

                case 'plain':
                case 'plain-outline':
                    classes.push(
                        this.isDisabled ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    );

                    if(this.variant === 'plain-outline') {
                        classes.push('border-1 border-gray-700')
                    }
                    break;


                case 'primary':
                    classes.push(
                        'text-white',
                        this.isDisabled ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    );
                    break;

                case 'success':
                    classes.push(
                        'text-white',
                        this.isDisabled ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'
                    );
                    break;

                case 'success-outline':
                    classes.push(
                        'background-white',
                        this.isDisabled ? 'text-gray-600' : 'text-green-700 border-green-600 hover:bg-green-600'
                    );
                    break;
            }

            // sizes
            switch(this.size) {
                case 'sm':
                    classes.push('py-1 px-3 text-sm');
                    break;

                case 'lg':
                    classes.push('py-4 px-6 text-md');
                    break;

                default:
                    classes.push('py-2 px-3 text-md leading-tight');
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
        }
    }
});
</script>


<template>
    <button
        v-on="$listeners"
        :type="type"
        class="fig-button rounded font-medium"
        :class="classNames"
        tabindex="0"
        :disabled="isDisabled"
        :aria-disabled="isDisabled">
        <div class="flex flex-row items-center">
            <span v-if="$slots.icon" class="pr-1"><slot name="icon"></slot></span>
            <fig-icon
                v-if="icon"
                :icon="icon"
                :stroke-width="2"
                :stroke="iconStrokeColor"
                :width="18"
                :height="18"
                class="mr-1" />
            <slot></slot>
        </div>
    </button>
</template>
