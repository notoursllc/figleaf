import FigFormSelectStateProvince from './FormSelectStateProvince.vue';
import FigFormSelectCountry from '../selectCountry/FormSelectCountry.vue';

export default {
    title: 'Components/Form/SelectStateProvince',

    component: FigFormSelectStateProvince,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormSelectStateProvince,
        FigFormSelectCountry
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
                <fig-form-select-country v-model="selectedCountry" />
            </div>

            <div>Selected: {{ selected }}</div>
            <fig-form-select-state-province v-bind="$props" v-model="selected" :country="selectedCountry" />
        </div>
    `
});

export const SelectStateProvince = Template.bind({});
SelectStateProvince.args = {
};
