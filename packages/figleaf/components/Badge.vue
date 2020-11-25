<script>
import Vue from 'vue';


export default Vue.extend({
    name: 'Badge',

    props: {
        tag: {
            type: String,
            default: 'span'
        },

        pill: {
            type: Boolean,
            default: true
        },

        variant: {
            type: String,
            default: 'secondary',
            validator: (value) => {
                return [
                    'primary',
                    'secondary',
                    'success',
                    'error',
                    'warning',
                    'info',
                    'dark'
                ].includes(value);
            }
        }
    },

    computed: {
        classNames() {
            const classes = ['fig-badge p-1'];

            if(this.pill) {
                classes.push('rounded-l-full rounded-r-full');
            }

            // variants
            switch(this.variant) {
                case 'primary':
                    classes.push('text-white bg-blue-600');
                    break;

                case 'secondary':
                    classes.push('text-white bg-gray-700');
                    break;

                case 'success':
                    classes.push('text-white bg-green-500');
                    break;

                case 'error':
                    classes.push('text-white bg-red-600');
                    break;

                case 'warning':
                    classes.push('text-gray-800 bg-yellow-500');
                    break;

                case 'info':
                    classes.push('text-blue-800 bg-blue-300');
                    break;

                case 'dark':
                    classes.push('text-white bg-gray-900');
                    break;
            }

            return classes;
        }
    },

    render(h, ctx) {
        return h(
            this.tag,
            {
                class: this.classNames,
                on: this.$listeners,
                attrs: this.$attrs
            },
            this.$slots.default
        );
    }
});
</script>
