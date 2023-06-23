import { reactive } from 'vue';

export default {
    state: reactive({
        currentConfirm: null,
        resolveFn: null,
        rejectFn: null,
    }),

    reset() {
        this.state.currentConfirm = null;
        this.state.resolveFn = null;
        this.state.rejectFn = null;
    },

    resolve() {
        if(this.state.resolveFn) {
            this.state.resolveFn();
        }
        this.reset();
    },

    reject() {
        if(this.state.rejectFn) {
            this.state.rejectFn();
        }
        this.reset();
    },

    show(message, config = {}) {
        this.reset();

        this.state.currentConfirm = Object.assign(
            {},
            {
                title: null,
                okLabel: null,
                cancelLabel: null,
                size: 'sm',
                centered: true
            },
            config,
            {
                message: message
            }
        );

        return new Promise((resolve, reject) => {
            this.state.resolveFn = resolve;
            this.state.rejectFn = reject;
        });
    }
}
