<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormTextarea',

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
        v-bind="$attrs"
        class="form-textarea block w-full border-gray-350"></textarea>
</template>
