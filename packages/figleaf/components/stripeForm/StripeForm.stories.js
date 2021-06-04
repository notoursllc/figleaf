// import '@stripe/stripe-js'; // https://www.npmjs.com/package/@stripe/stripe-js
import {loadStripe} from '@stripe/stripe-js';
import FigStripeForm from './StripeForm.vue';
import FigButton from '../button/Button';

const testStripeKey = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export default {
    title: 'Components/StripeForm',

    component: FigStripeForm,

    argTypes: {
        stripePublishableKey: {
            control: {
                type: 'text'
            }
        }
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
        // FigStripeForm assumes the Stripe API is already loaded
        // on the page. This is just a little hack that loads it
        // for us here in this story
        const stripe = await loadStripe(testStripeKey);
        this.ready = true;
    },
    template: `
        <fig-stripe-form
            v-if="ready"
            v-bind="$props"
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
    stripePublishableKey: testStripeKey
};
