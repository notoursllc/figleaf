import { FigCartCtaLayout } from '../../../index.js';

export default {
    title: 'Layouts/CartCtaLayout',
    component: FigCartCtaLayout,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCartCtaLayout
    },
    setup() {
        return { args };
    },
    template: `
        <fig-cart-cta-layout v-bind="args">
            <template v-slot:left>left side</template>
            <template v-slot:right>right side</template>
        </fig-cart-cta-layout>
    `
});

export const CartCtaLayout = Template.bind({});
CartCtaLayout.args = {
};

