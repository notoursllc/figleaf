import { FigNumber } from '../../../index.js';

export default {
    title: 'Components/Number',
    component: FigNumber,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigNumber
    },
    setup() {
        return { args };
    },
    template: `
        <div>
            <fig-number v-bind="args" />

            <div class="mt-6">
                <div>Other examples:</div>
                <div>Percent: <fig-number :value="0.123456789" format="percent" :config="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }" /></div>
                <div>Currency: <fig-number :value="1234567890" format="currency" :config="{ minimumFractionDigits: 2, maximumFractionDigits: 2 }" /></div>
                <div><fig-number :value="1234.567" :round="1" /></div>
            </div>
        </div>
    `
});

export const Number = Template.bind({});
Number.args = {
    value: 1234567890,
    format: 'decimal', // percent, decimal, currency
    config: { minimumFractionDigits: 2, maximumFractionDigits: 2 }, // useGrouping: false
};

