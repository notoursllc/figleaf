<script>
import useCurrency from './useCurrency.js';
const { exchangeRatePrice, limitDecimalPrecision } = useCurrency();

export default {
    name: 'Currency',

    props: {
        price: {
            type: Number
        },

        tag: {
            type: String,
            default: 'span'
        },

        currency: {
            type: String,
            default: 'USD'
        },

        exchangeRates: {
            type: Object,
            default() {
                return {};
            }
        },

        applyExchangeRate: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        exchangeRate() {
            return this.exchangeRates[this.currency] || 1;
        },

        /*
        * Since prices are in cents, divides by 100 to display
        * as 'dollars', and also applies the exchange rate
        */
        convertedPrice() {
            const p = this.getExchangeRatePrice();

            // convert cents to dollars (/100)
            // and limit the float decimal precision to 2 places
            return limitDecimalPrecision(p/100, 2);
        }
    },

    methods: {
        getExchangeRatePrice() {
            let p = this.price;

            if(this.applyExchangeRate) {
                p = exchangeRatePrice(this.price, this.exchangeRate);
            }

            this.$emit('exchangeRatePrice', p);

            return p;
        }
    }
};
</script>


<template>
    <i18n-n
        v-if="convertedPrice !== null"
        :tag="tag"
        :value="convertedPrice"
        :format="{ key: 'currency', currency: currency }">
        <template #currency="slotProps">
            <span class="fig-currency-symbol">{{ slotProps.currency }}</span>
        </template>
    </i18n-n>
</template>


<style scoped>
.fig-currency-symbol {
    padding-right: 2px;
}
</style>
