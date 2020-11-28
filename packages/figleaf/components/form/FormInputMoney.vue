<script>
import accounting from 'accounting';
import { CurrencyDirective } from 'vue-currency-input';
import form_input_mixin from './form_input_mixin';


export default {
    directives: {
        currency: CurrencyDirective
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: Number,
            default: 0
        }
    },

    data: function() {
        return {
            selectedPrice: null
        };
    },

    computed: {
        inputClassNames() {
            return this.formInputMix_stateClassNames;
        }
    },

    watch: {
        value: {

            /**
             * Value is sent as a number (in cents) that needs
             * to be converted to 'dollars' (divide by 100)
             */
            handler(newVal) {
                this.selectedPrice = newVal ? parseInt(newVal, 10)/100 : 0;

            },
            immediate: true
        }
    },

    methods: {

        /**
         * Value is emitted as a number (cents)
         *
         * @param val String
         */
        emitInput() {
            let clean = 0;

            if(this.selectedPrice) {
                clean = accounting.toFixed(parseFloat(this.selectedPrice) * 100, 0);

                // accounting returns a string.  This converts back to a float
                clean = parseFloat(clean);
            }

            // console.log('MONEY EMIT CLEAN', clean, typeof clean)
            this.$emit('input', clean);
        }
    }
};
</script>


<template>
    <input
        type="text"
        v-model="selectedPrice"
        @input="emitInput"
        class="form-input w-full fig-input-money"
        :class="inputClassNames"
        v-currency="{
            currency: 'USD',
            locale: 'en-US',
            valueAsInteger: false,
            allowNegative: false,
            distractionFree: true,
            autoDecimalMode: true,
            valueRange: { min: 0 },
            allowNegative: false }">
</template>


<style scoped>
.fig-input-money {
    min-width: 70px;
}
</style>
