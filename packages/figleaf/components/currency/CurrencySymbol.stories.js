import FigCurrencySymbol from './CurrencySymbol.vue';

export default {
    title: 'Components/currency/CurrencySymbol',

    component: FigCurrencySymbol,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCurrencySymbol
    },
    data() {
        return {
            currencies: [
                'AUD',
                'CAD',
                'EUR',
                'GBP',
                'JPY',
                'USD'
            ],
        }
    },
    template: `
        <div>
            <fig-currency-symbol
                v-for="code in currencies"
                :key="code"
                :currency="code"
                v-bind="$props" />
        </div>
    `
});

export const CurrencySymbol = Template.bind({});
CurrencySymbol.storyName = "CurrencySymbol";
CurrencySymbol.args = {
    tag: 'div'
};

