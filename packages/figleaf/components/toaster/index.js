import Vue from 'vue';
import isObject from 'lodash.isobject';
import { methods } from './toaster.js';
import Toaster from './Toaster.vue';

export default () => {

    Vue.component('FigToaster', Toaster);

    if(!isObject(Vue.prototype.$figleaf)) {
        Vue.prototype.$figleaf = {};
    }

    Vue.prototype.$figleaf.toast = (toastConfig) => {
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


    Vue.prototype.$figleaf.successToast = (toastConfig) => {
        return Vue.prototype.$figleaf.toast(
            Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
        );
    };


    Vue.prototype.$figleaf.errorToast = (toastConfig) => {
        return Vue.prototype.$figleaf.toast(
            Object.assign({}, toastConfig, { variant: 'error' })
        );
    };

    Vue.prototype.$figleaf.clearToasts = methods.removeAllToasts;

};
