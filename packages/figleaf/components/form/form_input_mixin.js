export default {

    props: {
        state: {
            type: Boolean,
            default: null
        },

        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md'].includes(value);
            }
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
                    classes.push('border-gray-500');
            }

            if(this.size === 'sm') {
                classes.push('form-input-sm');
            }

            return classes;
        }
    }

};
