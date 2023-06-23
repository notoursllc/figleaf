<script>
export default {
    props: {
        stripe: {
            type: Object,
            required: true
        },

        appearanceConfig: {
            type: Object
        },

        shippingConfig: {
            type: Object
        }
    },

    data: function() {
        return {
            addressElement: null
        };
    },

    beforeDestroy () {
        this.addressElement.destroy();
    },

    methods: {
        async init() {
            const elements = this.stripe.elements({
                loader: 'always',
                // locale: '' // https://edge.stripe.com/docs/js/appendix/supported_locales?type=cvc_update

                // Stripe appearance API:
                // https://stripe.com/docs/elements/appearance-api#theme
                appearance: this.appearanceConfig || {
                    theme: 'none',
                    rules: {
                        '.Tab': {
                            border: '1px solid #E0E6EB',
                            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
                        },
                        '.Tab:hover': {
                            color: 'var(--colorText)',
                        },
                        '.Tab--selected': {
                            borderColor: '#E0E6EB',
                            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
                        },
                        '.Input': {
                            border: '1px solid #cccccc',
                            borderRadius: '2px',
                        },
                        '.Input--invalid': {
                            boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
                        },
                    }
                }
            });

            // https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options
            this.addressElement = elements.create('address', {
                autocomplete: {
                    mode: 'automatic'
                },
                blockPoBox: true,
                fields: {
                    phone: 'always',
                },
                validation: {
                    phone: {
                        required: 'always',
                    }
                },
                display: {
                    name: 'split'
                },
                ...this.shippingConfig,
                mode: 'shipping' // last so this cant be overridden
            });

            this.addressElement.mount("#address-element");

            this.addressElement.on('change', (event) => {
                if (event.complete){
                    this.$emit('complete', event.value)
                }
            })
        }
    },

    mounted() {
        this.init();
    }
};
</script>


<template>
    <div id="address-element"></div>
</template>
