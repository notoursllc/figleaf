<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormRadio',

    props: {
        value: {}
    },

    data: () => ({
        isChecked: null
    }),

    watch: {
        value: {
            handler: function(newVal) {
                this.isChecked = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitInput(val) {
            this.$emit('input', this.isChecked);
        }
    }
});
</script>


<template>
    <label class="inline-flex items-center">
        <input
            type="radio"
            class="form-radio border-gray-500"
            v-bind="$attrs"
            @change="emitInput"
            v-model="isChecked">
        <span class="ml-2" v-if="$slots.default"><slot></slot></span>
    </label>
</template>
