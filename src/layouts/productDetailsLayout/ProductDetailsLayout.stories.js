import { FigProductDetailsLayout } from '../../../index.js';

export default {
    title: 'Layouts/ProductDetailsLayout',
    component: FigProductDetailsLayout,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigProductDetailsLayout
    },
    setup() {
        return { args };
    },
    template: `
        <fig-product-details-layout v-bind="args">
            <template v-slot:pics>Pics slot</template>
            <template v-slot:title>Title slot</template>
            <template v-slot:price>Price slot</template>
            <template v-slot:thumbs>Thumbs slot</template>
            <template v-slot:sizes>Sizes slot</template>
            <template v-slot:button>Button slot</template>
            <template v-slot:description>Description slot</template>
            <template v-slot:artist>Artist slot</template>
            <template v-slot:video>Video slot</template>
            <template v-slot:under>Under slot</template>
        </fig-product-details-layout>
    `
});

export const ProductDetailsLayout = Template.bind({});
ProductDetailsLayout.args = {
};

