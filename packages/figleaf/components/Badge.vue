<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Badge',

    props: {
        tag: {
            type: String,
            default: 'div'
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
            const classes = ['fig-badge rounded-full inline-block font-semibold h-5 text-center whitespace-no-wrap absolute tracking-normal px-1 py-0'];

            classes.push(
                this.size === 'lg' ? 'text-base' : 'text-sm leading-5'
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
                    classes.push('text-white bg-gray-500');
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
