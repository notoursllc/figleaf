import FigSpinner from './Spinner.vue';

export default {
    title: 'Components/Spinner',

    component: FigSpinner,

    argTypes: {
        width: {
            control: {
                type: 'number'
            }
        },

        strokeWidth: {
            control: {
                type: 'number'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSpinner
    },
    template: `
        <fig-spinner v-bind="$props" />
    `
});

export const Spinner = Template.bind({});
// Spinner.storyName = 'icon on the left';
Spinner.args = {};
