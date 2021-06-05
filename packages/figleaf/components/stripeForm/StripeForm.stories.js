// import '@stripe/stripe-js'; // https://www.npmjs.com/package/@stripe/stripe-js
import {loadStripe} from '@stripe/stripe-js';
import FigStripeForm from './StripeForm.vue';
import FigButton from '../button/Button';

const testStripeKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export default {
    title: 'Components/StripeForm',

    component: FigStripeForm,

    argTypes: {
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigStripeForm,
        FigButton
    },
    data: () => {
        return {
            ready: false,
            Stripe: null,
            isValid: false,
            generatedToken: null
        };
    },
    methods: {
        onStripeFormValid(isValid) {
            this.isValid = isValid;
        },
        onStripeTokenGenerated(token) {
            this.generatedToken = token;
            console.log("generated token", token);
        }
    },
    async mounted() {
        this.Stripe = await loadStripe(testStripeKey);
        this.ready = true;
    },
    template: `
        <fig-stripe-form
            v-if="ready"
            :stripe="Stripe"
            @valid="onStripeFormValid"
            @token="onStripeTokenGenerated">

            <template v-slot:content="props">
                <div class="mt-4">
                    <fig-button
                        variant="primary"
                        @click="props.createToken"
                        :disabled="!isValid">PLACE YOUR ORDER</fig-button>
                </div>

                <div v-if="generatedToken">Payment token</div>
                <div>{{ generatedToken }}</div>
            </template>

        </fig-stripe-form>
    `
});

export const StripeForm = Template.bind({});
StripeForm.args = {
};
