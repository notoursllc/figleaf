import FigPaymentTypeChooser from './PaymentTypeChooser.vue';
import { paymentTypes } from './constants';

export default {
    title: 'Components/PaymentTypeChooser',

    component: FigPaymentTypeChooser,

    argTypes: {
        // value: {
        //     control: {
        //         type: 'select',
        //         options: Object.keys(paymentTypes)
        //     }
        // }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaymentTypeChooser
    },
    data() {
        return {
            selected: paymentTypes.cc
        };
    },
    methods: {
        onSelected(val) {
            console.log("SELETED PAYMENT TYPE", val)
        }
    },
    template: `
        <div>
            <fig-payment-type-chooser v-bind="$props" v-model="selected" @input="onSelected" />
            <div class="pt-2">selected: {{ selected }}</div>
        </div>
    `
});

export const PaymentTypeChooser = Template.bind({});
PaymentTypeChooser.args = {
};

