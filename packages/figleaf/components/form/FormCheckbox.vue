<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormCheckbox',

    props: {
        value: {},
        checkedValue: {},
        uncheckedValue: {}
    },

    data: () => ({
        isChecked: null
    }),

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
        emitInput(val) {
            if(this.isChecked && this.checkedValueSet) {
                this.$emit('input', this.checkedValue);
            }
            else if(!this.isChecked && this.uncheckedValueSet) {
                this.$emit('input', this.uncheckedValue);
            }
            else {
                this.$emit('input', this.isChecked);
            }
        }
    }
});
</script>


<template>
    <label class="inline-flex items-center">
        <input
            type="checkbox"
            class="form-checkbox border-gray-350"
            v-bind="$attrs"
            @change="emitInput"
            v-model="isChecked">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
