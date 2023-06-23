import { FigBvLogo } from '../../../index.js';

export default {
    title: 'Components/BvLogo',
    component: FigBvLogo,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigBvLogo
    },
    setup() {
        return { args };
    },
    template: '<fig-bv-logo v-bind="args" />'
});

export const BvLogo = Template.bind({});
BvLogo.args = {
};

