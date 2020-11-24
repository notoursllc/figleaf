<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';
import form_input_mixin from './form_input_mixin';


export default Vue.extend({
    name: 'FormInput',

    components: {
        FigIcon
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: String
        },

        type: {
            type: String,
            default: 'text'
        },

        clearable: {
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
                ...this.formInputMix_stateClassNames
            ];

            if(this.clearable) {
                classes.push('pr-8');
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
    <div class="relative w-full">
        <input
            :type="type"
            v-model="selectedValue"
            @input="emitInput"
            class="form-input w-full"
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
    </div>
</template>
