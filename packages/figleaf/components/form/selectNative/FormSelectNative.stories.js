import FigFormSelectNative from './FormSelectNative.vue';
import {
    formInputStateClasses,
    formInputSizes
} from '../inputConstants.js';

export default {
    title: 'Components/Form/SelectNative',

    component: FigFormSelectNative,

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
    state: null,
    options: [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
    ]
};

