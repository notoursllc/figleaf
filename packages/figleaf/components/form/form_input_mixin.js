export default {

    props: {
        state: {
            type: Boolean,
            default: null
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

            return classes;
        }
    }

}
