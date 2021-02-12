<script>
import Vue from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

// Config options: https://flatpickr.js.org/options/
// Events:  https://flatpickr.js.org/events/
// Formatting tokens:  https://flatpickr.js.org/formatting/

const defaultConfig = {
    dateFormat: 'Z',
    wrap: true,
    altFormat: 'M j, Y',
    altInput: true,
    enableTime: true,
    hourIncrement: 1,
    minuteIncrement: 1
};


export default Vue.extend({
    inheritAttrs: false,

    props: {
        value: {
            default: null
        }
    },

    components: {
        flatPickr
    },

    data () {
        return {
            selectedDate: null
        };
    },

    computed: {
        finalConfig() {
            return Object.assign({}, defaultConfig, this.$attrs.config);
        }
    },

    created() {
        const unwatch = this.$watch('value', function (newVal, oldVal) {
            if(newVal && !oldVal) {
                this.selectedDate = newVal;
                unwatch();
            }
        });
    },

    methods: {
        onChange(selectedDates, dateString) {
            this.$emit('input', dateString);
        }
    }
});
</script>


<template>
    <div class="f-date-picker">
        <flat-pickr
            v-model="selectedDate"
            :config="finalConfig"
            @on-change="onChange"
            v-bind="$attrs" />
        <slot></slot>
    </div>
</template>


<style lang="postcss">
.f-date-picker input[readonly] {
    @apply cursor-pointer bg-gray-200;
}
</style>
