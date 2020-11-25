<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormRadio',

    props: {
        value: {},
        checkedValue: {
            required: true
        }
    },

    data: () => ({
        isChecked: false
    }),

    watch: {
        value: {
            handler: function(newVal) {
                this.isChecked = (newVal === this.checkedValue);
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
    <label class="inline-flex items-center">
        <input
            :checked="isChecked"
            @change="emitInput"
            v-bind="$attrs"
            type="radio"
            class="form-radio border-gray-500">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
