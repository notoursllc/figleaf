import FigPercentage from './Percentage.vue';

export default {
    title: 'Components/Percentage',

    component: FigPercentage,

    argTypes: {

    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPercentage
    },
    template: '<fig-percentage v-bind="$props" />'
});

export const Percentage = Template.bind({});
Percentage.args = {
    value: '0.09625',
    fixed: 3
};
