<script>
import Vue from 'vue';
import isObject from 'lodash.isobject';
import FigFormSelect from '../formSelect/FormSelect';
import FigFormInput from '../FormInput';
import { formSelectProps } from '../formSelect/constants';

const countryStatesMap = {
    // United States
    US: {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming'
    },
    // Canada
    CA: {
        AB: 'Alberta',
        BC: 'British Columbia',
        MB: 'Manitoba',
        NB: 'New Brunswick',
        NL: 'Newfoundland and Labrador',
        NT: 'Northwest Territories',
        NS: 'Nova Scotia',
        NU: 'Nunavut',
        ON: 'Ontario',
        PE: 'Prince Edward Island',
        QC: 'Quebec',
        SK: 'Saskatchewan',
        YT: 'Yukon'
    },
    // Australia
    AU: {
        ACT: 'Australian Capital Territory',
        NSW: 'New South Wales',
        NT: 'Northern Territory',
        QLD: 'Queensland',
        SA: 'South Australia',
        TAS: 'Tasmania',
        VIC: 'Victoria',
        WA: 'Western Australia'
    },
    // Brazil
    BR: {
        AC: 'Acre',
        AL: 'Alagoas',
        AP: 'Amapá',
        AM: 'Amazonas',
        BA: 'Bahia',
        CE: 'Ceará',
        DF: 'Distrito Federal',
        ES: 'Espírito Santo',
        GO: 'Goiás',
        MA: 'Maranhão',
        MT: 'Mato Grasso',
        MS: 'Mato Grosso do Sul',
        MG: 'Minas Gerais',
        PA: 'Pará',
        PB: 'Paraíba',
        PR: 'Paraná',
        PE: 'Pernambuco',
        PI: 'Piauí',
        RJ: 'Rio de Janeiro',
        RN: 'Rio Grande do Norte',
        RS: 'Rio Grande do Sul',
        RO: 'Rondônia',
        RR: 'Roraima',
        SC: 'Santa Catarina',
        SP: 'São Paulo',
        SE: 'Sergipe',
        TO: 'Tocantins'
    },
    // Mexico
    MX: {
        AGS: 'Aguascalientes',
        BC: 'Baja California',
        BCS: 'Baja California Sur',
        CAMP: 'Campeche',
        CHIS: 'Chiapas',
        CHIH: 'Chihuahua',
        COAH: 'Coahuila',
        COL: 'Colima',
        DF: 'Distrito Federal',
        DGO: 'Durango',
        GTO: 'Guanajuato',
        GRO: 'Guerrero',
        HGO: 'Hidalgo',
        JAL: 'Jalisco',
        EDM: 'México',
        MICH: 'Michoacán',
        MOR: 'Morelos',
        NAY: 'Nayarit',
        NL: 'Nuevo León',
        OAX: 'Oaxaca',
        PUE: 'Puebla',
        QRO: 'Querétaro',
        QROO: 'Quintana Roo',
        SLP: 'San Luis Potosi',
        SIN: 'Sinaloa',
        SON: 'Sonora',
        TAB: 'Tabasco',
        TAMPS: 'Tamaulipas',
        TLAX: 'Tlaxcala',
        VER: 'Veracruz',
        YUC: 'Yucatán',
        ZAC: 'Zacatecas'
    }
};


export default Vue.extend({
    components: {
        FigFormSelect,
        FigFormInput
    },

    props: {
        ...formSelectProps,

        value: {
            type: String
        },

        country: String,
        disabled: Boolean,
        placeholder: String
    },

    data() {
        return {
            selectedState: null
        };
    },

    computed: {
        stateOptions: function() {
            const options = [];

            if(this.country && countryStatesMap[this.country]) {
                const states = countryStatesMap[this.country];

                for(const key in states) {
                    options.push(
                        { label: states[key], value: key}
                    );
                }
            }

            return options;
        }
    },

    watch: {
        value: {
            handler(newVal) {
                this.selectedState = newVal;
            },
            immediate: true
        },

        country: {
            handler(newVal) {
                this.selectedState = null;
                this.emitInput(this.selectedState);
            },
            immediate: true
        }
    },

    methods: {
        emitInput(val) {
            this.$emit('input', isObject(val) ? val.value : val);
        }
    }
});
</script>


<template>
    <div class="inline-block">
        <fig-form-select
            v-if="stateOptions.length"
            v-model="selectedState"
            v-bind="$props"
            :options="stateOptions"
            @input="emitInput" />
        <fig-form-input
            v-else
            v-model="selectedState"
            @input="emitInput"
            :placeholder="placeholder"
            :disabled="disabled" />
    </div>
</template>
