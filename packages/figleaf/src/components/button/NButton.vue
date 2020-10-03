<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'NButton',

    props: {
        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        },
        variant: {
            type: String,
            default: 'plain-outline',
            validator: (value) => {
                return ['primary', 'primary-outline', 'success', 'success-outline', 'danger', 'danger-outline', 'plain-outline', 'ghost'].includes(value);
            }
        },
        type: {
            type: String,
            default: 'button',
            validator: (value) => {
                return ['button', 'submit', 'reset'].includes(value);
            }
        },
        isDisabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        isBlock: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        classNames() {
            const classes = [
                'n-btn',
                `n-btn-${this.variant}`,
                `n-btn-${this.size}`,
            ];

            if(this.isBlock) {
                classes.push('n-btn-block');
            }

            return classes;
        }
    },

    render(h) {
        const children = [];

        if(this.$slots.icon) {
            children.push(
                h(
                    'div',
                    {
                        class: 'inlineBlock'
                    },
                    this.$slots.icon
                )
            );
        }

        children.push(this.$slots.default);

        return h(
            'button',
            {
                class: this.classNames,
                props: this.$props,
                attrs: {
                    type: this.type,
                    tabIndex: 0,
                    disabled: this.isDisabled || this.isLoading,
                    'aria-disabled': this.isDisabled || this.isLoading
                },
                on: {
                    click: ($event) => this.$emit('click', $event)
                }
            },
            children
        );
    }
});
</script>
