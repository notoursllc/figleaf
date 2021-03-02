<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Tag',

    props: {
        tag: {
            type: String,
            default: 'span'
        },

        pill: {
            type: Boolean,
            default: false
        },

        variant: {
            type: String,
            default: 'light',
            validator: (value) => {
                return [
                    'success',
                    'error',
                    'warning',
                    'info',
                    'dark',
                    'light'
                ].includes(value);
            }
        },

        size: {
            type: String,
            default: 'lg',
            validator: (value) => {
                return [
                    'sm',
                    'lg'
                ].includes(value);
            }
        }
    },

    computed: {
        classNames() {
            const classes = ['fig-tag px-2 py-1 font-semibold'];

            classes.push(
                this.size === 'lg' ? 'text-sm' : 'text-xs'
            );

            classes.push(
                this.pill ? 'rounded-xl' : 'rounded-sm'
            );

            // variants
            switch(this.variant) {
                case 'info':
                    classes.push('text-blue-900 bg-blue-200');
                    break;

                case 'success':
                    classes.push('text-green-900 bg-green-200');
                    break;

                case 'error':
                    classes.push('text-red-900 bg-red-200');
                    break;

                case 'warning':
                    classes.push('text-orange-900 bg-orange-300');
                    break;

                case 'dark':
                    classes.push('text-white bg-gray-900');
                    break;

                case 'light':
                    classes.push('text-gray-700 bg-gray-200');
                    break;
            }

            return classes;
        }
    },

    render(h) {
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
