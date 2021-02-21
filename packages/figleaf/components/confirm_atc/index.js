import Vue from 'vue';
import isObject from 'lodash.isobject';
import AtcConfirm from './AtcConfirm.vue';

export default () => {

    if(!isObject(Vue.prototype.$figleaf)) {
        Vue.prototype.$figleaf = {};
    }

    Vue.prototype.$figleaf.atcConfirm = (message, config) => {
        const AtcConfirmComponent = Vue.extend(AtcConfirm);

        const cfg = Object.assign(
            {},
            {
                title: null,
                checkoutLabel: null,
                checkoutLabelClass: null,
                viewCartLabel: null,
                viewCartLabelClass: null,
                timeout: 6000
            },
            config
        );

        const confirm = new AtcConfirmComponent({
            mounted() {
                // Self destruct handler
                const handleDestroy = () => {
                    this.$nextTick(() => {
                        this.$destroy();
                    });
                };

                // Self destruct if parent destroyed
                // this.$parent.$once('hook:destroyed', handleDestroy);

                // Self destruct after hidden
                this.$once('hidden', handleDestroy);

                // Self destruct on route change
                if (this.$router && this.$route) {
                    // Destroy ourselves if route changes
                    this.$once('hook:beforeDestroy', this.$watch('$router', handleDestroy));
                }

                this.show();

                if(this.$refs.btn_confirm_checkout) {
                    this.$refs.btn_confirm_checkout.focus();
                }
            },

            destroyed() {
                if (this.$el && this.$el.parentNode) {
                    this.$el.parentNode.removeChild(this.$el);
                }
            }
        });


        // Title
        if(cfg.title) {
            confirm.$slots.title = confirm.$createElement(
                'div',
                {},
                cfg.title
            );
        }

        // View Cart button label
        if(cfg.viewCartLabel) {
            confirm.$slots.viewCartLabel = confirm.$createElement(
                'div',
                {
                    class: cfg.viewCartLabelClass || 'font-semibold'
                },
                cfg.viewCartLabel
            );
        }

        // Checkout button label
        if(cfg.checkoutLabel) {
            confirm.$slots.checkoutLabel = confirm.$createElement(
                'div',
                {
                    class: cfg.checkoutLabelClass || 'text-green-800 font-semibold'
                },
                cfg.checkoutLabel
            );
        }

        // The main body
        if(message) {
            confirm.$slots.message = confirm.$createElement(
                'div',
                {},
                Array.isArray(message) ? message : [message]
            );
        }

        // Return a promise that resolves with the index of the button that was clicked
        // 1 = first button, 2 = second button, 0 = closed without clicking button
        return new Promise((resolve, reject) => {
            // Create a mount point (a DIV) and mount the AtcConfirm which will trigger it to show
            const div = document.createElement('div');
            document.body.appendChild(div);
            confirm.$mount(div);

            confirm.$on('hide', (buttonIndex) => {
                resolve(buttonIndex);
                confirm.$destroy();
            });

            // Hide the confirm after the configured timeout, if set.
            if(cfg.timeout) {
                setTimeout(() => {
                    confirm.$emit('hide', 0);
                }, cfg.timeout);
            }
        });

    };

};
