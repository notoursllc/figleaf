<script>
import Vue from 'vue';
import countries_mixin from '../mixins/countries_mixin';

export default Vue.extend({
    name: 'Country',

    mixins: [
        countries_mixin
    ],

    props: {
        alpha2: {
            type: String,
            default: null
        }
    },

    computed: {
        countryName() {
            if(this.alpha2) {
                return '';
            }

            const countryObj = this.countrymix_getCountryObj(this.alpha2);
            return countryObj && countryObj.name ? countryObj.name : '';
        }
    }
});
</script>


<template>
    <span>{{ countryName }}</span>
</template>
