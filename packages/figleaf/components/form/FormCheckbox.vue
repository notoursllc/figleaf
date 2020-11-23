<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormCheckbox',

    props: {
        value: {},
        uncheckedValue: {}
    },

    data: () => ({
        selectedValue: null
    }),

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedValue = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitInput(val) {
            console.log("CHECKBOX EMIT", val, this.selectedValue)
            this.$emit('input', this.selectedValue);
        }
    }
});
</script>


<template>
    <label class="inline-flex items-center">
        <input
            type="checkbox"
            class="form-checkbox"
            v-bind="$attrs"
            @change="emitInput"
            v-model="selectedValue">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
