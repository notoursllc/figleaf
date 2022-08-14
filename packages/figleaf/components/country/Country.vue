<script>
import useCountry from './useCountry.js';

const { getCountries } = useCountry();
const countries = getCountries();

export default {
    name: 'Country',

    props: {
        alpha2: {
            type: String,
            default: null
        }
    },

    computed: {
        countryName() {
            return countries[this.alpha2] || '';
        }
    }
}
</script>


<template>
    <span>{{ countryName }}</span>
</template>
