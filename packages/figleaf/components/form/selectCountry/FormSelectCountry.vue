<script>
import Vue from 'vue';
import isObject from 'lodash.isobject';
import FormSelect from '../select/FormSelect';
import countries_mixin from '../../../mixins/countries_mixin';
import form_input_mixin from '../form_input_mixin';
import { formSelectProps } from '../select/constants';

export default Vue.extend({
    components: {
        FormSelect
    },

    mixins: [
        countries_mixin,
        form_input_mixin
    ],

    props: {
        ...formSelectProps
    },

    data: function() {
        return {
            selectedCountry: null
        };
    },

    watch: {
        value: {
            handler(newVal) {
                this.selectedCountry = this.countrymix_getCountryObj(newVal);
            },
            immediate: true
        }
    },

    methods: {
        onChange(obj) {
            this.$emit(
                'input',
                isObject(obj) ? obj.alpha2 : null
            );
        }
    }
});
</script>


<template>
    <form-select
        v-model="selectedCountry"
        :options="countrymix_countryList"
        label="name"
        @input="onChange"
        v-bind="$props" />
</template>
