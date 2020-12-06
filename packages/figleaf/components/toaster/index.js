import Vue from 'vue';
import { methods } from './toaster.js';
import Toaster from './Toaster.vue';

export default () => {

    Vue.component('FigToaster', Toaster);

    Vue.prototype.$toast = (message, toastConfig) => {
        return methods.addToast(
            Object.assign(
                {},
                {
                    title: null,
                    text: message,
                    closable: true,
                    timeout: 0
                },
                toastConfig
            )
        );
    };


    Vue.prototype.$successToast = (message, toastConfig) => {
        return Vue.prototype.$toast(
            message,
            Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
        );
    };


    Vue.prototype.$errorToast = (message, toastConfig) => {
        return Vue.prototype.$toast(
            message,
            Object.assign({}, toastConfig, { variant: 'error', timeout: 0 })
        );
    };

};
