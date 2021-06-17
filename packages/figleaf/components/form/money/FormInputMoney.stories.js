import FigFormInputMoney from './FormInputMoney.vue';
import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/Money',

    component: FigFormInputMoney,

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
        FigFormInputMoney
    },
    template: '<fig-form-input-money v-bind="$props" />'
});

export const TextInput = Template.bind({});
TextInput.args = {
    size: formInputSizes.md
    // state: null
};

