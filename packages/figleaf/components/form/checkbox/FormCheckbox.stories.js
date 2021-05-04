import FigFormCheckbox from './FormCheckbox.vue';

export default {
    title: 'Components/Form/Checkbox',

    component: FigFormCheckbox,

    argTypes: {

    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormCheckbox
    },
    template: '<fig-form-checkbox v-bind="$props" />'
});

export const Checkbox = Template.bind({});
Checkbox.args = {
};




