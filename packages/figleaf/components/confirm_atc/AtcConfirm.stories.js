import FigAtcConfirm from './index';
import FigButton from '../button/Button';

export default {
    title: 'Components/ConfirmAtc',

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigButton
    },
    created() {
        FigAtcConfirm();
    },
    methods: {
        showConfirm() {
            const messageNodes = [];
            const h = this.$createElement;

            messageNodes.push(
                h(
                    'div', { class: 'text-gray-800 font-medium mb-1' }, 'Product title'
                )
            );

            return this.$figleaf.atcConfirm(
                messageNodes,
                {
                    title: 'Title',
                    checkoutLabel: 'Checkout',
                    viewCartLabel: 'View Cart'
                }
            );
        }
    },
    template: `
        <div>
            <fig-button @click="showConfirm()">Show</fig-button>
        </div>`
});

export const ConfirmAtc = Template.bind({});
ConfirmAtc.args = {
};

