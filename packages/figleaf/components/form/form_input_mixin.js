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
                if(this.state === true) {
                    classes.push('border-green-500');
                }
                if(this.state === false) {
                    classes.push('border-red-500');
                }
            }

            return classes;
        }
    }

};
