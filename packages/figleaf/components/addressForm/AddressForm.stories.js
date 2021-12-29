import FigAddressForm from './AddressForm.vue';

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
    data: () => {
        return {
            form: {
                countryCodeAlpha2: null,
                firstName: 'testfirstname',
                lastName: null,
                streetAddress: null,
                extendedAddress: null,
                city: null,
                state: null,
                postalCode: null,
                company: null,
                phone: null,
                email: null,
                is_gift: false
            },
            formIsInvalid: true
        };
    },
    methods: {
        onInvalid(val) {
            this.formIsInvalid = val;
        }
    },
    template: `
        <div>
            <fig-address-form v-model="form" v-bind="$props" @invalid="onInvalid" />

            <div class="pt-6">
                <div>FORM: {{ form }}</div>
                <div>FORM IS INVALID: {{ formIsInvalid }}</div>
            </div>
        </div>
    `
});

export const AddressForm = Template.bind({});
AddressForm.args = {
    // required: ['lastName'],
    rowSpacing: 1,
    cellSpacing: 2
};

