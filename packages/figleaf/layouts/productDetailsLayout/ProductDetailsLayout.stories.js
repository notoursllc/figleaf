import FigProductDetailsLayout from './ProductDetailsLayout.vue';


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
    template: `
        <fig-product-details-layout v-bind="$props">
            <template slot="pics">Pics slot</template>
            <template slot="title">Title slot</template>
            <template slot="price">Price slot</template>
            <template slot="thumbs">Thumbs slot</template>
            <template slot="sizes">Sizes slot</template>
            <template slot="button">Button slot</template>
            <template slot="description">Description slot</template>
            <template slot="artist">Artist slot</template>
            <template slot="video">Video slot</template>
            <template slot="under">Under slot</template>
        </fig-product-details-layout>
    `
});

export const ProductDetailsLayout = Template.bind({});
ProductDetailsLayout.args = {
};

