// this component was influenced by:
// https://github.com/bootstrap-vue/bootstrap-vue/blob/7ea0cc4a16d27b179eca47d351eaa9fe6fdfd56e/src/components/modal/helpers/bv-modal.js#L85

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
                centered: true
            },
            config
        );

        const confirm = new AtcConfirmComponent({
            propsData: {
                centered: cfg.centered
            },

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


        if(cfg.title) {
            confirm.$slots.title = confirm.$createElement(
                'div',
                {
                    class: 'text-center'
                },
                cfg.title
            );
        }

        if(cfg.checkoutLabel) {
            confirm.$slots.checkoutLabel = confirm.$createElement(
                'div',
                {
                    class: cfg.checkoutLabelClass || 'text-blue-600 font-semibold'
                },
                cfg.checkoutLabel
            );
        }

        if(cfg.viewCartLabel) {
            confirm.$slots.viewCartLabel = confirm.$createElement(
                'div',
                {
                    class: cfg.viewCartLabelClass || 'text-blue-600 font-semibold'
                },
                cfg.viewCartLabel
            );
        }

        if(message) {
            confirm.$slots.message = confirm.$createElement(
                'div',
                {
                },
                Array.isArray(message) ? message : [message]
            );
        }

        // Return a promise that resolves when hidden, or rejects on destroyed
        return new Promise((resolve, reject) => {
            let resolved = false;

            confirm.$once('hook:destroyed', () => {
                if (!resolved) {
                    reject(new Error('Figleaf AtcConfirm was destroyed before resolve'));
                }
            });

            confirm.$on('hide', confirmEvt => {
                if (!confirmEvt.defaultPrevented) {
                    resolved = true;
                    resolve(confirmEvt.figConfirm.confirmed);
                    confirm.$destroy();
                }
            });

            // Create a mount point (a DIV) and mount the msgBo which will trigger it to show
            const div = document.createElement('div');
            document.body.appendChild(div);
            confirm.$mount(div);
        });

    };

};
