import { reactive } from 'vue';
import { toastVariants } from './constants.js';

const currentToasts = reactive([]);
let count = 0;

function generateId() {
    count = count + 1;
    return count;
};

function addToast(toastConfig) {
    const cfg = Object.assign(
        {},
        {
            timeout: 4000,
            icon: true,
            variant: toastVariants.info,
            closable: true,
            title: null,
            text: null,
            dangerousText: null
        },
        toastConfig,
        {
            id: generateId()
        }
    );

    // add toasts to the front of the array so
    // the new ones appear at the top of the UI
    currentToasts.unshift(cfg);

    if(cfg.timeout === 0) {
        return;
    }

    setTimeout(
        () => {
            removeToast(cfg.id);
        }, 
        cfg.timeout || 4000
    );
}

function removeToast(id) {
    currentToasts.splice(
        currentToasts.findIndex(toastConfig => toastConfig.id === id), 
        1
    );
}

function clearToasts() {
    currentToasts.splice(0, currentToasts.length);
}

function showToast(toastConfig) {
    return addToast(
        Object.assign({}, toastConfig)
    );
}

function showSuccessToast(toastConfig) {
    return addToast(
        Object.assign({}, toastConfig, { variant: 'success', timeout: 5000 })
    );
}

function showErrorToast(toastConfig) {
    return addToast(
        Object.assign({}, toastConfig, { variant: 'error' })
    );
}

export default function useToaster() {
    return {
        currentToasts,
        removeToast,
        showSuccessToast,
        showErrorToast,
        showToast,
        clearToasts
    }
}