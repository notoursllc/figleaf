<script>
import form_input_mixin from '../form_input_mixin';

export default {
    name: 'FormCheckbox',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {},
        checkedValue: {},
        uncheckedValue: {}
    },

    data() {
        return {
            isChecked: null
        }
    },

    computed: {
        checkedValueSet() {
            return this.checkedValue !== undefined;
        },

        uncheckedValueSet() {
            return this.uncheckedValue !== undefined;
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                if(this.checkedValueSet && newVal === this.checkedValue) {
                    this.isChecked = true;
                }
                else if(this.uncheckedValueSet && newVal === this.uncheckedValue) {
                    this.isChecked = false;
                }
                else {
                    this.isChecked = newVal;
                }
            },
            immediate: true
        }
    },

    methods: {
        onChange(e) {
            this.isChecked = e.target.checked;

            if(this.isChecked && this.checkedValueSet) {
                this.emitInput(this.checkedValue);
            }
            else if(!this.isChecked && this.uncheckedValueSet) {
                this.emitInput(this.uncheckedValue);
            }
            else {
                this.emitInput(this.isChecked);
            }
        },

        emitInput(val) {
            this.$emit('input', val);
        }
    }
};
</script>


<template>
    <label class="inline-flex items-center">
        <input
            type="checkbox"
            class="form-checkbox fig-form-control"
            v-bind="$attrs"
            @change="onChange"
            v-model="isChecked">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
