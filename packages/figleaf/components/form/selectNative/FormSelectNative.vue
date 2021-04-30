<script>
import Vue from 'vue';
import form_input_mixin from '../form_input_mixin';


export default Vue.extend({
    name: 'FormSelectNative',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: [String, Number],
            default: ''
        },

        options: {
            type: Array
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        classNames() {
            const classes = [
                'fig-form-select-native form-select fig-form-control',
                this.sizeCssClass,
                this.disabledCssClasses
            ];

            if(this.stateCssClass) {
                classes.push(this.stateCssClass);
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
        onChange() {
            this.$emit('input', this.selectedValue);
        }
    }
});
</script>


<template>
    <select
        :class="classNames"
        v-model="selectedValue"
        @change="onChange"
        :disabled="disabled"
        :aria-disabled="disabled">
        <slot name="options">
            <option
                v-for="(option, idx) in options"
                :key="idx"
                :value="option.value"
                :disabled="option.disabled">{{ option.label }}</option>
        </slot>
    </select>
</template>


<style scoped>
.fig-form-select-native {
    padding-right: 30px;
}
</style>

