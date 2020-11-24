let count = 0;

const generateId = () => {
    count = count + 1;
    return count;
};

function isObject(value) {
    const type = typeof value;
    return value != null && (type === 'object' || type === 'function')
}

export const state = {
    toasts: []
};

export const methods = {
    addToast(toastConfig) {
        if(!isObject(toastConfig)) {
            return;
        }

        toastConfig.id = generateId();
        toastConfig.variant = toastConfig.group || 'info';

        // add toasts to the front of the array so
        // the new ones appear at the top of the UI
        state.toasts.unshift(toastConfig);

        if(toastConfig.timeout !== 0) {
            setTimeout(() => {
                this.removeToast(toastConfig.id);
            }, toastConfig.timeout || 4000);
        }
    },

    removeToast(id) {
        state.toasts.splice(state.toasts.findIndex(toastConfig => toastConfig.id === id), 1);
    },

    removeAllToasts() {
        state.toasts.splice(0, state.toasts.length);
    }
};
