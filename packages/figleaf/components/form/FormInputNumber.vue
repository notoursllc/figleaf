<script>
import Vue from 'vue';
import isFinite from 'lodash.isfinite';
import { isNumber } from '../utils/common';
import FormInput from './FormInput';
import FigButton from '../Button';
import FormInputEndcapper from './FormInputEndcapper';


export default Vue.extend({
    name: 'FormInputNumber',

    inheritAttrs: false,

    components: {
        FormInput,
        FigButton,
        FormInputEndcapper
    },

    props: {
        value: {
            // type: Number
        },

        max: {
            type: Number,
            default: null
        },

        min: {
            type: Number,
            default: null
        },

        step: {
            type: Number,
            default: 1
        },

        size: {
            type: String,
            required: false
        },

        controls: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        plusDisabled() {
            return isFinite(this.max) && parseFloat(this.selectedValue) >= this.max;
        },

        minusDisabled() {
            return isFinite(this.min) && parseFloat(this.selectedValue) <= this.min;
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                if(newVal != null) {
                    this.setValue(newVal, false);
                }
            },
            immediate: true
        }
    },

    methods: {

        /*
        * fixes an issue when adding floating point numbers: .01 + .05 = 0.060000000000000005
        * https://stackoverflow.com/questions/588004/is-floating-point-math-broken/51723472#51723472
        */
        floatify(number) {
            if(number) {
                if(!isNumber(number)) {
                    number = parseFloat(number);
                }
                return parseFloat(number).toFixed(10);
            }
        },

        emitInput() {
            if(this.selectedValue !== this.value) {
                this.$emit('input', parseFloat(this.selectedValue));
            }
        },

        up() {
            this.setValue(
                this.floatify(this.selectedValue + this.step)
            );
        },

        down() {
            this.setValue(
                this.floatify(this.selectedValue - this.step)
            );
        },

        setValue(newVal, emit) {
            const val = isNaN(newVal) ? this.min : newVal;

            if(this.max && (val > this.max)) {
                this.selectedValue = this.max;
            }
            else if(this.min && (val < this.min)) {
                this.selectedValue = this.min;
            }
            else {
                this.selectedValue = val;
            }

            if(emit !== false) {
                this.emitInput();
            }
        }

    }
});
</script>


<template>
    <form-input-endcapper>
        <fig-button
            slot="prefix"
            variant="naked"
            @click="up"
            :disabled="plusDisabled"
            icon="plus" />

        <form-input
            v-model="selectedValue"
            type="number"
            :min="min"
            :max="max"
            :step="step"
            :size="size"
            @input="emitInput"
            v-bind="$attrs"
            square-left
            square-right
            input-classes="text-center" />

        <fig-button
            slot="suffix"
            variant="naked"
            @click="down"
            :disabled="minusDisabled"
            icon="minus" />
    </form-input-endcapper>
</template>
