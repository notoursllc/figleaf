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
                return ['sm', 'md'].includes(value);
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
                this.inputClasses
            ];

            if(this.type === 'color') {
                classes.push('p-1');
            }

            // size
            classes.push(
                this.size === 'sm' ? 'h-8' : 'default-input-height'
            );

            classes.push(
                this.squareLeft ? 'rounded-l-none' : 'rounded-l-md',
                this.squareRight ? 'rounded-r-none' : 'rounded-r-md'
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


<style scoped>
.default-input-height {
    height: 2.2rem;
}
</style>
