import Vue from 'vue';
import { methods } from './toaster.js';
import Toaster from './Toaster.vue';

export default () => {

    Vue.component('FigToaster', Toaster);

    Vue.prototype.$toast = (toastConfig) => {
        return methods.addToast(
            Object.assign({}, toastConfig)
        );
    };

    Vue.prototype.$successToast = (toastConfig) => {
        return methods.addToast(
            Object.assign({}, toastConfig, { variant: 'success' })
        );
    };

    Vue.prototype.$errorToast = (toastConfig) => {
        return methods.addToast(
            Object.assign({}, toastConfig, { variant: 'error' })
        );
    };

};
