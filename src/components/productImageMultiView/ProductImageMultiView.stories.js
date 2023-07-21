import { FigProductImageMultiView } from '../../../index.js';

export default {
    title: 'Components/ProductImageMultiView',
    component: FigProductImageMultiView,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigProductImageMultiView
    },
    setup() {
        const className550 = "?class=w550";
        const className1280 = "?class=w1280";

        return { 
            className550,
            className1280,
            args 
        };
    },
    template: `
        <fig-product-image-multi-view
            v-bind="args">
            <template v-slot:slideImage="slotProps">
                <img 
                    :src="slotProps?.image.url + className550" 
                    :alt="slotProps?.image.alt_text" 
                    class="w-full"
                    @click="slotProps?.onClick" /> 
            </template>

            <template v-slot:fullImage="slotProps">
                <!-- <fig-nuxt-img-bunny
                    v-if="obj.url"
                    :src="obj.url"
                    :alt="obj.alt_text"
                    preset="w1280"
                    :loading="index > 1 ? 'lazy' : 'eager'" /> -->
                <img 
                    :src="slotProps?.image.url + className1280" 
                    :alt="slotProps?.image.alt_text" 
                    class="w-full"
                    @click="slotProps?.onClick" /> 
            </template>
        </fig-product-image-multi-view>
    `
});

export const ProductImageMultiView = Template.bind({});
ProductImageMultiView.args = {
    pics: [
        {
            "url": "https://bv-pullzone-1.b-cdn.net/prod/images/1667772055823-IMG_9642_optimized.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car with white background 1"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/prod/images/1667772055769-IMG_9643_optimized.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car with white background 2"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/prod/images/1667772055765-IMG_9644_optimized.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car showing the mug handle 1"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/prod/images/1667772055829-IMG_9641_optimized.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car showing the mug handle 2"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/images/1656831276572-IMG_3661.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car - angle 1"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/images/1656831281998-FullSizeRender.JPG",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car - angle 2"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/images/1656831285138-IMG_3662.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car - angle 3"
        },
        {
            "url": "https://bv-pullzone-1.b-cdn.net/images/1656831289939-IMG_3663.jpg",
            "alt_text": "An 11oz mug featuring a Breadvan 250 GT race car - angle 4"
        }
    ]
};

