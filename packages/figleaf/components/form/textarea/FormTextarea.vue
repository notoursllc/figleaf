<script>
import Vue from 'vue';
import form_input_mixin from '../form_input_mixin';

export default Vue.extend({
    name: 'FormTextarea',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: String
        }
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
        emitInput() {
            this.$emit('input', this.selectedValue);
        }
    }
});
</script>


<template>
    <textarea
        v-model="selectedValue"
        @input="emitInput"
        v-bind="$props"
        class="form-textarea fig-form-control block w-full"></textarea>
</template>
