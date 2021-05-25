<script>
import Vue from 'vue';
import form_input_mixin from '../form_input_mixin';
import { radioBoxPadding } from './constants';

export default Vue.extend({
    name: 'FormRadio',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: [String, Number]
        },

        checkedValue: {
            required: true
        },

        block: {
            type: Boolean
        },

        padding: {
            type: [String, Number],
            default: 0,
            validator: (value) => radioBoxPadding.includes(parseInt(value, 10))
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        radioClasses() {
            const classes = [
                'form-radio',
                'fig-form-control',
                this.disabledCssClass
            ];

            if(!this.disabled) {
                classes.push('cursor-pointer');
            }

            return classes;
        },

        labelClasses() {
            const classes = [
                'fig-radio-label',
                this.disabled ? 'text-gray-500' : 'cursor-pointer'
            ];

            if(this.padding) {
                classes.push(`p-${this.padding}`);
            }

            if(this.block) {
                classes.push('block');
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
        emitInput(e) {
            this.$emit('input', this.checkedValue);
        }
    }
});
</script>


<template>
    <label :class="labelClasses">
        <div class="inline-flex items-center">
            <input
                type="radio"
                v-bind="$attrs"
                :value="checkedValue"
                v-model="selectedValue"
                @change="emitInput"
                :disabled="disabled"
                :aria-disabled="disabled"
                :class="radioClasses">
            <span class="ml-2" v-if="$slots.default"><slot></slot></span>
        </div>
    </label>
</template>
