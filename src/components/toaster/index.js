import { methods } from './toaster.js';

let installed = false;

export default {
    install: (app) => {
        if (installed) {
            return;
        }

        function toast(toastConfig) {
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
        }

        function successToast(toastConfig) {
            return toast(
                Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
            );
        }

        function errorToast(toastConfig) {
            return toast(
                Object.assign({}, toastConfig, { variant: 'error' })
            );
        }

        app.provide('figToast', toast);
        app.provide('figSuccessToast', successToast);
        app.provide('figErrorToast', errorToast);
        app.provide('figClearToasts', methods.removeAllToasts);

        installed = true;
    }
};
