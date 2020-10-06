<script>
import Vue from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

// Config options: https://flatpickr.js.org/options/
// Events:  https://flatpickr.js.org/events/
// Formatting tokens:  https://flatpickr.js.org/formatting/

const defaultConfig = {
    dateFormat: 'M j, Y'
};


export default Vue.extend({
    inheritAttrs: false,

    props: {
        value: {
            type: Object,
            default: null,
            validator: (value) => {
                return value instanceof Date;
            }
        }
    },

    components: {
        flatPickr
    },

    data () {
        return {
            selectedDate: new Date()
        };
    },

    computed: {
        finalConfig() {
            return Object.assign({}, defaultConfig, this.$attrs.config);
        }
    },

    watch: {
        value: {
            handler(newVal) {
                this.selectedDate = newVal;
            },
            immediate: true
        }
    },

    methods: {
        onChange(val) {
            if(Array.isArray(val) && val.length === 1) {
                this.$emit('input', val[0]);
                return;
            }

            this.$emit('input', val);
        }
    }
});
</script>


<template>
    <flat-pickr
        v-model="selectedDate"
        :config="finalConfig"
        @on-change="onChange"
        v-bind="$attrs" />
</template>
