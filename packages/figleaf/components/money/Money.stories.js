import FigMoney from './Money.vue';

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
    template: '<fig-money v-bind="$props" />'
});

export const Money = Template.bind({});
Money.args = {
    cents: 123
};

