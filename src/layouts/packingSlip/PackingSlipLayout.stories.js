import { FigPackingSlipLayout } from '../../../index.js';

export default {
    title: 'Layouts/PackingSlipLayout',
    component: FigPackingSlipLayout,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPackingSlipLayout
    },
    setup() {
        return { args };
    },
    template: `
        <fig-packing-slip-layout v-bind="args">
            <template v-slot:logo>logo goes here</template>
            <template v-slot:address_company>company address</template>
            <template v-slot:address_shipping>Shipping address</template>
            <template v-slot:address_billing>Billing address</template>
            table goes here

            <template v-slot:footer>this is the footer</template>
        </fig-packing-slip-layout>
    `
});

export const PackingSlipLayout = Template.bind({});
PackingSlipLayout.storyName = 'PackingSlipLayout';
PackingSlipLayout.args = {
};

