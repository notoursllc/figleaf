import FigStockLevelWarning from './StockLevelWarning.vue';

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
    template: '<fig-stock-level-warning v-bind="$props" />'
});

export const StockLevelWarning = Template.bind({});
StockLevelWarning.args = {
};

