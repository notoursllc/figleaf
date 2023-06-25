import { methods } from './toaster.js';

export const toast = (toastConfig) => {
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

export const successToast = (toastConfig) => {
    return toast(
        Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
    );
}

export const errorToast = (toastConfig) => {
    return toast(
        Object.assign({}, toastConfig, { variant: 'error' })
    );
}

export const clearToasts = () => {
    return methods.removeAllToasts();
}