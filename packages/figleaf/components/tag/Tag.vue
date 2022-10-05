<script>
import { tagVariants, tagSizes } from './constants';

export default {
    name: 'Tag',

    props: {
        tag: {
            type: String,
            default: 'span'
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
            return [
                'fig-tag',
                `fig-tag-${this.variant}`,
                `fig-tag-size-${this.size}`
            ];
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
};
</script>

<style scoped>
.fig-tag {
    @apply px-2 py-1 font-semibold rounded-xl;
}
.fig-tag-info {
    @apply text-blue-900 bg-blue-200;
}
.fig-tag-success {
    @apply text-emerald-900 bg-emerald-200;
}
.fig-tag-error {
    @apply text-red-900 bg-red-200;
}
.fig-tag-warning {
    @apply text-amber-900 bg-amber-300;
}
.fig-tag-dark {
    @apply text-white bg-gray-900;
}
.fig-tag-light {
    @apply text-gray-700 bg-gray-200;
}

.fig-tag-size-sm {
    @apply text-xs;
}
.fig-tag-size-lg {
    @apply text-sm;
}
</style>
