import Vue from 'vue';
import { methods } from './toaster.js';
import Toaster from './Toaster.vue';

export default () => {

    Vue.component('FigToaster', Toaster);

    Vue.prototype.$toast = (toastConfig) => {
        return methods.addToast(
            Object.assign(
                {},
                {
                    variant: 'info',
                    title: null,
                    text: null,
                    closable: true,
                    timeout: 0
                },
                toastConfig
            )
        );
    };


    Vue.prototype.$successToast = (toastConfig) => {
        return Vue.prototype.$toast(
            Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
        );
    };


    Vue.prototype.$errorToast = (toastConfig) => {
        return Vue.prototype.$toast(
            Object.assign({}, toastConfig, { variant: 'error' })
        );
    };

};
