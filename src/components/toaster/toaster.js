import { reactive } from 'vue';
import { toastVariants } from './constants.js';

export const state = reactive({
    currentToasts: []
});


let count = 0;

const generateId = () => {
    count = count + 1;
    return count;
};

export const methods = {
    addToast(toastConfig) {
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
        state.currentToasts.unshift(cfg);

        if(cfg.timeout === 0) {
            return;
        }

        setTimeout(
            () => {
                this.removeToast(cfg.id);
            }, 
            cfg.timeout || 4000
        );
    },

    removeToast(id) {
        state.currentToasts.splice(state.currentToasts.findIndex(toastConfig => toastConfig.id === id), 1);
    },

    removeAllToasts() {
        state.currentToasts.splice(0, state.currentToasts.length);
    }
};
