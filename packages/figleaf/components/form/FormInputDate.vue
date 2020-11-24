<script>
import Vue from 'vue';
import flatpickr from '../../directives/flatpickr';
import FormInput from './FormInput';

export default Vue.extend({
    directives: {
        flatpickr
    },

    components: {
        FormInput
    },

    props: {
        value: {
            type: String,
            default: null
        },

        config: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },

    data () {
        return {
            selectedDate: null
        };
    },

    computed: {
        finalConfig() {
            // Config options: https://flatpickr.js.org/options/
            // Events:  https://flatpickr.js.org/events/
            // Formatting tokens:  https://flatpickr.js.org/formatting/

            const format = this.config.enableTime === false ? 'dateFormatPicker_mdy' : 'dateFormatPicker_mdy_hm';

            return Object.assign(
                {
                    dateFormat: 'Z',
                    altFormat: this.$t(format),
                    altInput: true,
                    enableTime: true,
                    hourIncrement: 1,
                    minuteIncrement: 1
                },
                this.config,
                {
                    wrap: false // needs to be false
                }
            );
        }
    },

    created() {
        const unwatch = this.$watch('value', function (newVal, oldVal) {
            if(newVal && !oldVal) {
                this.selectedDate = newVal;

                if(unwatch) {
                    unwatch();
                }
            }
        },
        { immediate: true });
    },

    methods: {
        onChange(val, dateString) {
            this.$emit('input', val);
        },

        onClear() {
            this.$refs.dateInput.$el._flatpickr.clear();
        }
    }
});
</script>


<template>
    <form-input
        v-model="selectedDate"
        clearable
        @input="onChange"
        @click="onClear"
        v-on="$listeners"
        v-flatpickr="finalConfig"
        ref="dateInput" />
</template>

