import FigSelectStateProvince from './SelectStateProvince.vue';
import FigSelectCountry from '../selectCountry/SelectCountry.vue';
import {
    formInputSizes
} from '../form/inputConstants.js';

export default {
    title: 'Components/SelectStateProvince',

    component: FigSelectStateProvince,

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
        FigSelectStateProvince,
        FigSelectCountry
    },
    data: function() {
        return {
            selected: null,
            selectedCountry: null
        };
    },
    template: `
        <div>
            <div class="mb-4">
                <div>Country:</div>
                <fig-select-country v-model="selectedCountry" />
            </div>

            <div>Selected: {{ selected }}</div>
            <fig-select-state-province v-bind="$props" v-model="selected" :country="selectedCountry" />
        </div>
    `
});

export const SelectStateProvince = Template.bind({});
SelectStateProvince.args = {
    size: 'lg'
};
