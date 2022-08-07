import FigCurrency from './Currency.vue';

export default {
    title: 'Components/currency/Currency',

    component: FigCurrency,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCurrency
    },
    template: `
        <div>
            <div v-for="(val, code) in $props.exchangeRates" :key="code">
                {{ code }} ({{ val }}): &nbsp;
                <fig-currency
                    :currency="code"
                    :price="$props.price"
                    :exchange-rates="$props.exchangeRates"
                    tag="span" />
            </div>
        </div>
    `
});

export const Currency = Template.bind({});
Currency.args = {
    price: 1100,
    currency: 'USD',
    exchangeRates: {
        AUD: 1.427255,
        CAD: 1.280814,
        EUR: 0.979436,
        GBP: 0.820111,
        JPY: 133.02593581,
        USD: 1
    },
    tag: 'div'
};

