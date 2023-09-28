import { ref } from 'vue';
import { FigPaymentTypeChooser } from '../../../index.js';
import { paymentTypes } from './constants.js';

export default {
    title: 'Components/PaymentTypeChooser',
    component: FigPaymentTypeChooser,
    argTypes: {
        value: {
            control: { type: 'select' },
            options: Object.keys(paymentTypes)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaymentTypeChooser
    },
    setup() {
        const selected = ref(paymentTypes.cc);

        function onSelected(val) {
            console.log("ON SELECTED", val)
        }

        return {
            args,
            selected,
            onSelected
        };
    },
    template: `
        <div>
            <fig-payment-type-chooser
                v-bind="args"
                v-model="selected"
                @input="onSelected" />

            <div class="pt-4">selected: {{ selected }}</div>
        </div>
    `
});

export const PaymentTypeChooser = Template.bind({});
PaymentTypeChooser.args = {
};

