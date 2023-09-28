import { ref } from 'vue';
import { FigSelectCountry } from '../../../index.js';
import {
    formInputSizes
} from '../form/inputConstants.js';

export default {
    title: 'Components/SelectCountry',
    component: FigSelectCountry,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(formInputSizes)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSelectCountry
    },
    setup() {
        const selected = ref('CA');

        return {
            args,
            selected
        };
    },
    template: `
        <div>
            <fig-select-country
                v-bind="args"
                v-model="selected" />

            <div class="pt-6">Selected: {{ selected }}</div>
        </div>
    `
});

export const SelectCountry = Template.bind({});
SelectCountry.args = {
    size: 'lg'
};

