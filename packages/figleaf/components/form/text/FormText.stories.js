import FigFormText from './FormText.vue';
import {
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/TextInput',

    component: FigFormText,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formInputSizes)
            }
        },

        placeholder: {
            control: {
                type: 'text'
            }
        }
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormText
    },
    template: '<fig-form-text v-bind="$props" />'
});

export const TextInput = Template.bind({});
TextInput.args = {
    size: formInputSizes.md,
    state: null
};


///////////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormText
    },
    template: `
        <fig-form-text v-bind="$props">
            <div slot="label">First name</div>
        </fig-form-text>
    `
});


export const WithLabel = Template2.bind({});
WithLabel.args = {
    size: formInputSizes.md,
    state: null
};

