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
            default: 'sm',
            validator: (value) => {
                return [
                    'sm',
                    'md'
                ].includes(value);
            }
        }
    },

    computed: {
        classNames() {
            const classes = ['fig-badge'];

            classes.push(
                this.size === 'md' ? 'fig-badge-md' : 'fig-badge-sm'
            );

            // variants
            switch(this.variant) {
                case 'info':
                    classes.push('text-white bg-blue-600');
                    break;

                case 'success':
                    classes.push('text-white bg-green-600');
                    break;

                case 'error':
                    classes.push('text-white bg-red-600');
                    break;

                case 'warning':
                    classes.push('text-white bg-orange-600');
                    break;

                case 'dark':
                    classes.push('text-white bg-gray-500');
                    break;

                case 'light':
                    classes.push('text-gray-700 bg-gray-300');
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


<style scoped>
.fig-badge {
    @apply rounded-full flex items-center justify-center font-semibold whitespace-no-wrap absolute tracking-normal px-1 py-0;
}
.fig-badge-sm {
    @apply text-sm leading-5 h-5;
    min-width: 20px;
}
.fig-badge-md {
    @apply text-lg leading-6 h-6;
    min-width: 24px;
}
</style>
