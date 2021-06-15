import FigCartCtaLayout from './CartCtaLayout.vue';

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
    template: `
        <fig-cart-cta-layout v-bind="$props">
            <div slot="left">left side</div>
            <div slot="right">right side</div>
        </fig-cart-cta-layout>
    `
});

export const CartCtaLayout = Template.bind({});
CartCtaLayout.args = {
};

