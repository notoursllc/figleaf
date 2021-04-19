import {
    formInputStateClasses,
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
        formInputMix_stateClassNames() {
            const classes = [];

            switch(this.state) {
                case true:
                    classes.push('border-green-500');
                    break;

                case false:
                    classes.push('border-red-500');
                    break;

                default:
                    classes.push('border-gray-300');
            }

            return classes;
        },

        stateCssClass() {
            if(this.state === true || this.state === false) {
                return this.state ? formInputStateClasses.success : formInputStateClasses.error;
            }
            return null;
        },

        sizeCssClass() {
            return `fig-form-control-${this.size}`;
        },

        disabledCssClasses() {
            return this.disabled ? 'bg-gray-200': 'bg-white';
        }
    }

};
