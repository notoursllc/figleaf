<script>
export default {
    name: 'Currency'
}
</script>

<script setup>
import { computed } from 'vue';
import useCurrency from './useCurrency.js';
const { exchangeRatePrice, limitDecimalPrecision } = useCurrency();

const props = defineProps({
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
});

const emit = defineEmits(['exchangeRatePrice']);

/*
* Since prices are in cents, divides by 100 to display
* as 'dollars', and also applies the exchange rate
*/
const convertedPrice = computed(() => {
    const p = getExchangeRatePrice();

    // convert cents to dollars (/100)
    // and limit the float decimal precision to 2 places
    return limitDecimalPrecision(p/100, 2);
});

const exchangeRate = computed(() => {
    return props.exchangeRates[props.currency] || 1;
});

function getExchangeRatePrice() {
    let p = props.price;

    if(props.applyExchangeRate) {
        p = exchangeRatePrice(props.price, exchangeRate.value);
    }

    emit('exchangeRatePrice', p);

    return p;
}
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
