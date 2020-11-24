<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Button',

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
                return ['danger', 'ghost', 'plain', 'primary', 'success'].includes(value);
            }
        },

        type: {
            type: String,
            default: 'button',
            validator: (value) => {
                return ['button', 'submit', 'reset'].includes(value);
            }
        },

        isLoading: {
            type: Boolean,
            default: false
        },

        isBlock: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        isDisabled() {
            return this.isLoading || ['true', true].indexOf(this.$attrs.disabled) > -1;
        },

        classNames() {
            const classes = [];

            if(this.isBlock) {
                classes.push('block');
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
                        'bg-transparent',
                        this.isDisabled ? 'text-gray-600' : 'text-gray-900 hover:bg-gray-200'
                    );
                    break;

                case 'plain':
                    classes.push(
                        'bg-white',
                        this.isDisabled ? 'bg-gray-200 text-gray-600' : 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                    );
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
            }

            // sizes
            switch(this.size) {
                case 'sm':
                    classes.push('py-1 px-3 text-sm');
                    break;

                case 'md':
                    classes.push('py-2 px-3 text-sm');
                    break;

                case 'lg':
                    classes.push('py-4 px-4 text-md');
                    break;
            }

            return classes;
        }
    }
});
</script>


<template>
    <button
        v-bind="$attrs"
        v-on="$listeners"
        :type="type"
        class="fig-button leading-14px rounded font-bold"
        :class="classNames"
        tabindex="0"
        :disabled="isDisabled"
        :aria-disabled="isDisabled"><slot></slot></button>
</template>
