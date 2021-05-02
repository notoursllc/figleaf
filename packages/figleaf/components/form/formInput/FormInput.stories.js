import FigFormInput from './FormInput.vue';
import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/TextInput',

    component: FigFormInput,

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
        FigFormInput
    },
    template: '<fig-form-input v-bind="$props" />'
});

export const TextInput = Template.bind({});
TextInput.args = {
    size: formInputSizes.md,
    state: null
};

