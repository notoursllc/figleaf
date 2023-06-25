import { methods } from './toaster.js';

export default {
    toast(toastConfig) {
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
    },

    successToast(toastConfig) {
        return toast(
            Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
        );
    },

    errorToast(toastConfig) {
        return toast(
            Object.assign({}, toastConfig, { variant: 'error' })
        );
    },

    clearToasts() {
        return methods.removeAllToasts();
    }
}