<script>
export default {
    name: 'Country'
}
</script>

<script setup>
import { computed } from 'vue';
import useCountry from './useCountry.js';

const { getCountries } = useCountry();
const countries = getCountries();

const props = defineProps({
    alpha2: {
        type: String,
        default: null
    }
});

const countryName = computed(() => {
    return countries[props.alpha2] || '';
});
</script>


<template>
    <span>{{ countryName }}</span>
</template>
