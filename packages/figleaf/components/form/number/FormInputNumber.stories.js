import FigFormInputNumber from './FormInputNumber.vue';

import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/Number',

    component: FigFormInputNumber,

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
        FigFormInputNumber
    },
    template: '<fig-form-input-number v-bind="$props" />'
});

export const TextInput = Template.bind({});
TextInput.args = {
    size: formInputSizes.md
    // state: null
};

