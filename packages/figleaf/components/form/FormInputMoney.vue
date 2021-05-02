<script>
import accounting from 'accounting';
// import { CurrencyDirective } from 'vue-currency-input';
import form_input_mixin from './form_input_mixin';
import FormInputNumber from './FormInputNumber';
import FormInputEndcapper from './FormInputEndcapper';



export default {
    components: {
        FormInputNumber,
        FormInputEndcapper
    },

    // directives: {
    //     currency: CurrencyDirective
    // },

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {
            type: [Number, String],
            default: 0
        },

        size: {
            type: String
        }
    },

    data: function() {
        return {
            selectedPrice: null
            // currencyConfig: {
            //     currency: 'USD',
            //     locale: 'en-US',
            //     valueAsInteger: true,
            //     allowNegative: false,
            //     distractionFree: true,
            //     autoDecimalMode: true,
            //     valueRange: { min: 0 }
            // }
        };
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

            this.$emit('input', clean);
        }
    }
};
</script>


<template>
    <form-input-endcapper>
        <template slot="prefix">$</template>
        <form-input-number
            v-model="selectedPrice"
            @input="emitInput"
            :size="size"
            :min="0"
            :step=".01"
            input-classes="fig-input-money" />
    </form-input-endcapper>
</template>


<style>
.fig-input-money {
    min-width: 65px;
}
</style>
