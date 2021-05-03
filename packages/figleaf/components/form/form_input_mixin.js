import {
    formInputSizes
} from './inputConstants.js';

export default {
    props: {
        size: {
            type: String,
            default: formInputSizes.md,
            validator: (value) => Object.keys(formInputSizes).includes(value)
        },

        state: {
            type: Boolean,
            default: null
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        formInputMix_classNames() {
            const classes = [
                'fig-form-control',
                `fig-form-control-${this.size}`
            ];

            if(this.disabled) {
                classes.push('cursor-not-allowed bg-gray-100 text-gray-400');
            }
            else {
                classes.push(this.formInputMix_stateClass);
            }

            return classes;
        },


        formInputMix_stateClass() {
            if(this.state === true) {
                return 'fig-form-control-state-success';
            }
            if(this.state === false) {
                return 'fig-form-control-state-error';
            }
        }
    }

};
