import FigFormTextarea from './FormTextarea.vue';

export default {
    title: 'Components/Form/Textarea',

    component: FigFormTextarea,

    argTypes: {
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
        FigFormTextarea
    },
    template: '<fig-form-textarea v-bind="$props" />'
});

export const Textarea = Template.bind({});
Textarea.args = {
    state: null
};
