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
            selected: null
        };
    },
    template: `
        <div>
            <div>Selected: {{ selected }}</div>
            <fig-select-country v-bind="$props" v-model="selected" />
        </div>
    `
});

export const SelectCountry = Template.bind({});
SelectCountry.args = {
    size: 'lg'
};

