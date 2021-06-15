import FigCheckoutWrapper from './CheckoutWrapper.vue';


export default {
    title: 'Layouts/CheckoutWrapper',

    component: FigCheckoutWrapper,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigCheckoutWrapper
    },
    template: `
        <fig-checkout-wrapper v-bind="$props">
            <div class="bg-gray-200 w-full">Sample content<div>
        </fig-checkout-wrapper>
    `
});

export const CheckoutWrapper = Template.bind({});
CheckoutWrapper.args = {
};

