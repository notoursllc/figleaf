import { FigCurrencySymbol } from '../../../index.js';

export default {
    title: 'Components/CurrencySymbol',
    component: FigCurrencySymbol,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCurrencySymbol
    },
    setup() {
        const currencies = [
            'AUD',
            'CAD',
            'EUR',
            'GBP',
            'JPY',
            'USD'
        ];

        return {
            args,
            currencies
        };
    },
    template: `
        <div>
            <fig-currency-symbol
                v-for="code in currencies"
                :key="code"
                :currency="code"
                v-bind="args" />
        </div>
    `
});

export const CurrencySymbol = Template.bind({});
CurrencySymbol.storyName = "CurrencySymbol";
CurrencySymbol.args = {
    tag: 'div'
};

