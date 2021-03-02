<script>
import Vue from 'vue';
import form_input_mixin from './form_input_mixin';


export default Vue.extend({
    name: 'FormInput',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {},

        type: {
            type: String,
            default: 'text'
        },

        inputClasses: {
            type: String
        },

        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                // return ['sm', 'md'].includes(value);
                return ['xs', 'sm', 'md', 'lg'].includes(value);
            }
        },

        squareLeft: {
            type: Boolean,
            default: false
        },

        squareRight: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        inputClassNames() {
            const classes = [
                ...this.formInputMix_stateClassNames,
                `fig-input-${this.size}`,
                this.inputClasses
            ];

            if(this.type === 'color') {
                classes.push('p-1');
            }

            classes.push(
                this.squareLeft ? 'rounded-l-none' : 'rounded-l-sm',
                this.squareRight ? 'rounded-r-none' : 'rounded-r-sm'
            );

            if(this.$attrs.disabled) {
                classes.push('cursor-not-allowed bg-gray-100 text-gray-400');
            }

            return classes;
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedValue = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            this.$emit('input', this.selectedValue);
        }
    }
});
</script>


<template>
    <input
        :type="type"
        v-model="selectedValue"
        @input="emitInput"
        class="form-input w-full"
        :class="inputClassNames" />
</template>

