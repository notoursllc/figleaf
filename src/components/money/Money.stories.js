import { FigMoney } from '../../../index.js';

export default {
    title: 'Components/Money',
    component: FigMoney,
    argTypes: {
        cents: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigMoney
    },
    setup() {
        return { args };
    },
    template: '<fig-money v-bind="args" />'
});

export const Money = Template.bind({});
Money.args = {
    cents: 123
};

