import FigCreditCard from './CreditCard.vue';
import { cardTypes } from './constants';

export default {
    title: 'Components/CreditCard',

    component: FigCreditCard,

    argTypes: {
        type: {
            control: {
                type: 'select',
                options: Object.keys(cardTypes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCreditCard
    },
    template: '<fig-credit-card v-bind="$props" />'
});

export const CreditCard = Template.bind({});
CreditCard.args = {
    type: cardTypes.visa
};

