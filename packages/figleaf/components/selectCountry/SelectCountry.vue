<script>
import isObject from 'lodash.isobject';
import FormSelect from '../form/select/FormSelect';
import form_input_mixin from '../form/form_input_mixin';
import { formSelectProps } from '../form/select/constants';
import useCountry from '../country/useCountry.js';

const { getCountries } = useCountry();

export default {
    components: {
        FormSelect
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        ...formSelectProps
    },

    data: function() {
        return {
            selectedCountry: null,
            selectOptions: [],
        };
    },

    watch: {
        value: {
            handler(newVal) {
                this.selectedCountry = newVal
            },
            immediate: true
        }
    },

    methods: {
        onChange(val) {
            this.$emit('input', val);
        }
    },

    created() {
        const countries = getCountries();
        const opts = [];
        for(let countryCode in countries) {
            opts.push({
                label: this.$t(countries[countryCode]),
                value: countryCode
            })
        }
        this.selectOptions = opts;
    }
};
</script>


<template>
    <form-select
        v-model="selectedCountry"
        :options="selectOptions"
        @input="onChange"
        :reduce="(obj) => obj.value"
        v-bind="$props" />
</template>
