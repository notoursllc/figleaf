import useTime from '../../composables/useTime.js';
import FigSelectCountry from './SelectCountry.vue';
import {
    formInputSizes
} from '../form/inputConstants.js';

export default {
    title: 'Components/SelectCountry',

    component: FigSelectCountry,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formInputSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSelectCountry
    },
    data: function() {
        return {
            selected: null,
            timezone: null,
            country: null
        };
    },
    created() {
        const { getTimezone, getCountryFromTimezone } = useTime();
        this.timezone = getTimezone();
        this.country = getCountryFromTimezone();
    },
    template: `
        <div>
            <fig-select-country v-bind="$props" v-model="selected" />

            <div class="pt-6">Selected: {{ selected }}</div>
            <div>Your timezone: {{ timezone }}</div>
            <div>Your country: {{ country }}</div>
        </div>
    `
});

export const SelectCountry = Template.bind({});
SelectCountry.args = {
    size: 'lg'
};

