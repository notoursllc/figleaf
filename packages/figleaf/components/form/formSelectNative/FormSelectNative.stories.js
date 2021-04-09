import FigFormSelectNative from './FormSelectNative.vue';
import {
    formInputStateClasses,
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/FormSelectNative',

    component: FigFormSelectNative,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formInputSizes)
            }
        },

        state: {
            control: {
                type: 'select',
                options: Object.keys(formInputStateClasses)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormSelectNative
    },
    methods: {
        onInput() {
            console.log('input');
        }
    },
    template: '<fig-form-select-native @input="onInput" v-bind="$props"></fig-form-select-native>'
});

export const FormSelectNative = Template.bind({});
FormSelectNative.args = {
    size: formInputSizes.md,
    state: formInputStateClasses.success,
    options: [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
    ]
};

