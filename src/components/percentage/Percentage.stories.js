import { FigPercentage } from '../../../index.js';

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
    setup() {
        return { args };
    },
    template: '<fig-percentage v-bind="args" />'
});

export const Percentage = Template.bind({});
Percentage.args = {
    value: '0.09625',
    fixed: 3
};
