<script>
import FigFormGroup from '../form/group/FormGroup';

export default {
    components: {
        FigFormGroup
    },

    props: {
        stripe: {
            type: Object,
            required: true
        }
    },

    data: function() {
        return {
            elements: {
                card: null,
                expiry: null,
                cvc: null
            },
            validation: {
                error: {
                    card: null,
                    expiry: null,
                    cvc: null
                },
                success: {
                    card: false,
                    expiry: false,
                    cvc: false
                }
            }
        };
    },

    async mounted() {
        this.init();
    },

    beforeDestroy () {
        for(const name in this.elements) {
            this.elements[name].destroy();
        }
    },

    methods: {
        emitValid() {
            const isValid = this.validation.success.card && this.validation.success.expiry && this.validation.success.cvc;
            this.$emit('valid', isValid);
        },

        async createToken () {
            const { token, error } = await this.stripe.createToken(this.elements.card);

            if (error) {
                document.getElementById('card-error').innerHTML = error.message;
                return;
            }

            this.$emit('token', {...token});
        },

        async init() {
            // Create an instance of Elements.
            const stripeElements = this.stripe.elements();

            // Style Object documentation here: https://stripe.com/docs/js/appendix/style
            const style = {
                base: {
                    color: 'black',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    },
                    lineHeight: '28px'
                },
                invalid: {
                    color: 'red',
                    iconColor: 'red'
                }
            };

            this.elements.card = stripeElements.create('cardNumber', { style });
            this.elements.card.mount('#card-number');

            this.elements.expiry = stripeElements.create('cardExpiry', { style });
            this.elements.expiry.mount('#card-expiry');

            this.elements.cvc = stripeElements.create('cardCvc', { style });
            this.elements.cvc.mount('#card-cvc');

            // Monitor change events on the Card Element to display any errors:

            const getErrorMessage = (obj) => {
                return obj && obj.error && obj.error.message ? obj.error.message : null;
            };

            const getValidationSuccess = (obj) => {
                return obj && obj.complete && !obj.error;
            };

            // Add a change listener on each element to get it's error or success message
            for(const el in this.elements) {
                this.elements[el].on('change', (obj) => {
                    this.validation.error[el] = getErrorMessage(obj);
                    this.validation.success[el] = getValidationSuccess(obj);
                    this.emitValid();
                });
            }
        }
    }
};
</script>

<template>
    <div>

        <div class="flex flex-wrap -mx-2 overflow-hidden">
            <!-- card -->
            <div class="my-2 px-2 w-full overflow-hidden md:w-1/2">
                <fig-form-group>
                    <template slot="label">{{ $t('Card number') }}</template>
                    <div id="card-number" class="form-input w-full fig-form-control fig-form-control-lg rounded"></div>
                    <div slot="error" v-show="validation.error.card">{{ validation.error.card }}</div>
                </fig-form-group>
            </div>

            <!-- expiration -->
            <div class="my-2 px-2 w-full overflow-hidden md:w-1/4">
                <fig-form-group>
                    <template slot="label">{{ $t('Expiration date') }}</template>
                    <div id="card-expiry" class="form-input w-full fig-form-control fig-form-control-lg rounded"></div>
                    <div slot="error" v-show="validation.error.expiry">{{ validation.error.expiry }}</div>
                </fig-form-group>
            </div>

            <!-- security code -->
            <div class="my-2 px-2 w-full overflow-hidden md:w-1/4">
                <fig-form-group>
                    <template slot="label">{{ $t('Security code') }}</template>
                    <div id="card-cvc" class="form-input w-full fig-form-control fig-form-control-lg rounded"></div>
                    <div slot="error" v-show="validation.error.cvc">{{ validation.error.cvc }}</div>
                </fig-form-group>
            </div>
        </div>

        <div id="card-error" class="text-red-600"></div>

        <slot
            name="content"
            v-bind:createToken="createToken"
            v-bind:cardElement="elements.card"></slot>
    </div>
</template>
