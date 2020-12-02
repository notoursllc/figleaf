<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormInputFileButton',

    props: {
        multiple: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        },

        accept: {
            type: String,
            default: ''
        }
    },

    methods: {
        onFileChange(e) {
            this.$emit('change', e.target.files || e.dataTransfer.files);

            // resetting the value so the same file can be uploaded sequentially if desired
            // (without this, the change event wont trigger the second time)
            this.$refs.fig_file_input.value = '';
        }
    }
});
</script>


<template>
    <label>
        <div><slot></slot></div>
        <input
            ref="fig_file_input"
            type="file"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="onFileChange"
            class="hidden">
    </label>
</template>
