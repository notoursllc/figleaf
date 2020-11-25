<script>
import Vue from 'vue';
import isFinite from 'lodash.isfinite';
import { isNumber } from '../utils/common';
import FigIcon from '../icon/FigIcon';
import FormInput from './FormInput';


export default Vue.extend({
    name: 'FormInputNumber',

    inheritAttrs: false,

    components: {
        FigIcon,
        FormInput
    },

    props: {
        value: {
            type: String
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
            required: false,
            default: 'md'
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        plusDisabled() {
            return isFinite(this.max) && parseFloat(this.selectedVal) >= this.max;
        },

        minusDisabled() {
            return isFinite(this.min) && parseFloat(this.selectedVal) <= this.min;
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
            if(this.selectedVal !== this.value) {
                this.$emit('input', parseFloat(this.selectedVal));
            }
        },

        up() {
            this.setValue(
                this.floatify(this.selectedVal + this.step)
            );
        },

        down() {
            this.setValue(
                this.floatify(this.selectedVal - this.step)
            );
        },

        setValue(newVal, emit) {
            const val = isNaN(newVal) ? this.min : newVal;

            if(this.max && (val > this.max)) {
                this.selectedVal = this.max;
            }
            else if(this.min && (val < this.min)) {
                this.selectedVal = this.min;
            }
            else {
                this.selectedVal = val;
            }

            if(emit !== false) {
                this.emitInput();
            }
        }

    }
});
</script>


<template>
    <div class="relative w-full">
        <form-input
            v-model="selectedValue"
            class="px-8"
            type="number"
            :min="min"
            :max="max"
            :step="step"
            :size="size"
            @input="emitInput"
            v-bind="$attrs" />

        <!-- minus button -->
        <button
            type="button"
            @click="down"
            :disabled="minusDisabled"
            class="absolute top-0 right-0 background-transparent p-1 pr-2 flex items-center min-h-full text-center border-0">
            <fig-icon
                icon="minus"
                :stroke-width="2"
                stroke="#555"
                :width="18"
                :height="18" />
        </button>

        <!-- plus button -->
        <button
            type="button"
            @click="up"
            :disabled="plusDisabled"
            class="absolute top-0 left-0 background-transparent p-1 pl-2 flex items-center min-h-full text-center border-0">
            <fig-icon
                icon="plus"
                :stroke-width="2"
                stroke="#555"
                :width="18"
                :height="18" />
        </button>
    </div>
</template>
