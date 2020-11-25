<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';
import form_input_mixin from './form_input_mixin';


export default Vue.extend({
    name: 'FormInput',

    inheritAttrs: false,

    components: {
        FigIcon
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {},

        type: {
            type: String,
            default: 'text'
        },

        clearable: {
            type: Boolean,
            default: false
        },

        inputClasses: {
            type: String
        }
    },

    data: () => ({
        selectedValue: null,
        endCapBaseClasses: 'flex items-center leading-normal bg-gray-100 border-t border-b border-gray-350 px-3 whitespace-no-wrap text-grey-dark text-sm'
    }),

    computed: {
        inputClassNames() {
            const classes = [
                ...this.formInputMix_stateClassNames,
                this.inputClasses
            ];

            if(this.clearable) {
                classes.push('pr-8');
            }

            if(this.type === 'color') {
                classes.push('p-1 h-10');
            }

            classes.push(
                this.$slots.prefix ? 'rounded-l-none' : 'rounded-l-md',
                this.$slots.suffix ? 'rounded-r-none' : 'rounded-r-md'
            );

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
        },

        emitClear() {
            this.$emit('clear', this.selectedValue);
        },

        onClear() {
            this.selectedValue = null;
            this.emitInput();
            this.emitClear();
        }
    }
});
</script>


<template>
    <div class="flex flex-wrap items-stretch w-full relative">
        <div
            v-if="$slots.prefix"
            class="flex -mr-px">
            <span
                :class="endCapBaseClasses"
                class="rounded-l-md rounded-r-none border-l"><slot name="prefix"></slot></span>
        </div>

        <input
            :type="type"
            v-model="selectedValue"
            @input="emitInput"
            class="form-input flex-shrink flex-grow leading-normal w-px flex-1 border h-10 px-3 relative"
            :class="inputClassNames"
            v-bind="$attrs">
        <button
            v-if="clearable"
            type="button"
            @click="onClear"
            class="absolute top-0 right-0 background-transparent p-1 pr-2 flex items-center min-h-full text-center border-0">
            <fig-icon
                icon="x"
                :stroke-width="2"
                stroke="#555"
                :width="16"
                :height="16" />
        </button>

        <div
            v-if="$slots.suffix"
            class="flex -mr-px">
            <span
                :class="endCapBaseClasses"
                class="rounded-r-md rounded-l-none border-r"><slot name="suffix"></slot></span>
        </div>
    </div>
</template>
