<script>
import Vue from 'vue';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import FormInput from './FormInput';

export default Vue.extend({
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
        },

        clearable: {
            type: Boolean,
            default: true
        }
    },

    data () {
        return {
            selectedDate: null,
            Flatpickr: null
        };
    },

    computed: {
        finalConfig() {
            // Config options: https://flatpickr.js.org/options/
            // Events:  https://flatpickr.js.org/events/
            // Formatting tokens:  https://flatpickr.js.org/formatting/

            const format = this.config.enableTime === false ? 'M j, Y' : 'M j, Y h:i K';

            const defaultConfig = {
                dateFormat: 'Z',
                altFormat: format,
                altInput: true,
                enableTime: true,
                hourIncrement: 1,
                minuteIncrement: 1
            };

            return Object.assign(
                {},
                defaultConfig,
                this.config,
                {
                    wrap: false // needs to be false
                }
            );
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedDate = newVal;
            },
            immediate: true
        }
    },

    mounted() {
        this.$watch(
            'config',
            function (newVal) {
                this.Flatpickr = new Flatpickr(
                    this.$refs.formInputDateTime.$el.firstChild,
                    this.finalConfig
                );
            },
            { immediate: true }
        );
    },

    beforeDestroy() {
        this.Flatpickr.destroy();
    },

    methods: {
        emitInput() {
            this.$emit('input', this.selectedDate);
        },

        onClear() {
            this.Flatpickr.clear();
            this.emitInput();
        }
    }
});
</script>


<template>
    <form-input
        v-model="selectedDate"
        :clearable="clearable"
        @input="emitInput"
        @clear="onClear"
        ref="formInputDateTime"
        class="fig-input-date" />
</template>


<style>
.fig-input-date .form-input[readonly] {
    background-color: #fff !important;
    cursor: pointer !important;
}
</style>
