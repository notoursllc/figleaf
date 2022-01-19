<script>
import Vue from 'vue';
import { tagVariants, tagSizes } from './constants';

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
            default: tagVariants.light,
            validator: (value) => Object.keys(tagVariants).includes(value)
        },

        size: {
            type: String,
            default: tagSizes.lg,
            validator: (value) => Object.keys(tagSizes).includes(value)
        }
    },

    computed: {
        classNames() {
            const classes = ['fig-tag px-2 py-1 font-semibold'];

            classes.push(
                this.size === tagSizes.lg ? 'text-sm' : 'text-xs'
            );

            classes.push(
                this.pill ? 'rounded-xl' : 'rounded-sm'
            );

            // variants
            switch(this.variant) {
                case tagVariants.info:
                    classes.push('text-blue-900 bg-blue-200');
                    break;

                case tagVariants.success:
                    classes.push('text-emerald-900 bg-emerald-200');
                    break;

                case tagVariants.error:
                    classes.push('text-red-900 bg-red-200');
                    break;

                case tagVariants.warning:
                    classes.push('text-amber-900 bg-amber-300');
                    break;

                case tagVariants.dark:
                    classes.push('text-white bg-gray-900');
                    break;

                case tagVariants.light:
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
