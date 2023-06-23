import { FigStockLevelWarning } from '../../../index.js';

export default {
    title: 'Components/StockLevelWarning',
    component: FigStockLevelWarning,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigStockLevelWarning
    },
    setup() {
        return { args };
    },
    template: '<fig-stock-level-warning v-bind="args" />'
});

export const StockLevelWarning = Template.bind({});
StockLevelWarning.args = {
};

