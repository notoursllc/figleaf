import { reactive, ref } from 'vue';
import { FigAddressForm } from '../../../index.js';

export default {
    title: 'Components/AddressForm',
    component: FigAddressForm,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigAddressForm
    },
    setup() {
        const form = reactive({
            firstName: null,
            lastName: 'LaBla',
            streetAddress: null,
            extendedAddress: null,
            city: null,
            state: null,
            postalCode: null,
            countryCodeAlpha2: null,
            company: null,
            phone: null,
            email: null,
            is_gift: false
        });

        const formIsInvalid = ref(true);

        function onInvalid(val) {
            formIsInvalid.value = val;
        }

        return {
            args,
            formIsInvalid,
            onInvalid,
            form
        };
    },
    template: `
        <div>
            <fig-address-form
                v-model:firstName="form.firstName"
                v-model:lastName="form.lastName"
                v-model:streetAddress="form.streetAddress"
                v-model:extendedAddress="form.extendedAddress"
                v-model:city="form.city"
                v-model:state="form.state"
                v-model:postalCode="form.postalCode"
                v-model:countryCodeAlpha2="form.countryCodeAlpha2"
                v-model:company="form.company"
                v-model:phone="form.phone"
                v-model:email="form.email"
                v-model:is_gift="form.is_gift"
                v-bind="args"
                @invalid="onInvalid" />

            <div class="pt-10">
                <pre>{{ form }}</pre>
                <div>FORM IS INVALID: {{ formIsInvalid }}</div>
            </div>
        </div>
    `
});

export const AddressForm = Template.bind({});
AddressForm.args = {
    // required: []
};

