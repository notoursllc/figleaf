<script>
import Vue from 'vue';
import accounting from 'accounting';
import { CurrencyDirective } from 'vue-currency-input';
import FigIcon from '../icon/FigIcon';
import form_input_mixin from './form_input_mixin';


export default Vue.extend({
    name: 'FormInput',

    inheritAttrs: false,

    directives: {
        currency: CurrencyDirective
    },

    components: {
        FigIcon
    },

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {},

        type: {
            type: String,
            default: 'text'
        },

        clearable: {
            type: Boolean,
            default: false
        },

        inputClasses: {
            type: String
        },

        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md'].includes(value);
            }
        }
    },

    data: () => ({
        selectedValue: null,
        endCapBaseClasses: 'flex items-center leading-normal bg-gray-100 border-t border-b border-gray-350 px-2 whitespace-no-wrap text-grey-dark text-sm'
    }),

    computed: {
        inputClassNames() {
            const classes = [
                ...this.formInputMix_stateClassNames,
                this.inputClasses
            ];

            if(this.clearable) {
                classes.push('pr-8');
            }

            if(this.type === 'color') {
                classes.push('p-1');
            }

            // size
            classes.push(
                this.size === 'sm' ? 'h-8' : 'h-10'
            );

            classes.push(
                this.$slots.prefix ? 'rounded-l-none' : 'rounded-l-md',
                this.$slots.suffix ? 'rounded-r-none' : 'rounded-r-md'
            );

            if(this.$attrs.disabled) {
                classes.push('cursor-not-allowed bg-gray-100 text-gray-400');
            }

            return classes;
        },

        isMoneyType() {
            return this.type === 'money';
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                if(this.isMoneyType) {

                    /**
                     * Value is sent as a number (in cents) that needs
                     * to be converted to 'dollars' (divide by 100)
                     */
                    this.selectedValue = newVal ? parseInt(newVal, 10)/100 : 0;
                }
                else {
                    this.selectedValue = newVal;
                }
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            if(this.isMoneyType) {
                let clean = 0;

                if(this.selectedValue) {
                    clean = accounting.toFixed(parseFloat(this.selectedValue) * 100, 0);

                    // accounting returns a string.  This converts back to a float
                    clean = parseFloat(clean);
                    this.$emit('input', clean);
                }

                this.$emit('input', clean);
            }
            else {
                this.$emit('input', this.selectedValue);
            }
        },

        emitClear() {
            this.$emit('clear', this.selectedValue);
        },

        onClear() {
            this.selectedValue = null;
            this.emitInput();
            this.emitClear();
        }
    },

    render(h) {
        let prefixElement = null;
        let suffixElement = null;
        const self = this;

        // prefix slot
        if(self.$slots.prefix) {
            prefixElement = h(
                'div',
                {
                    class: 'flex -mr-px'
                },
                [
                    h(
                        'span',
                        {
                            class: [
                                self.endCapBaseClasses,
                                'rounded-l-md rounded-r-none border-l'
                            ]
                        },
                        self.$slots.prefix
                    )
                ]
            );
        };

        // suffix slot
        if(this.$slots.suffix) {
            suffixElement = h(
                'div',
                {
                    class: 'flex -mr-px'
                },
                [
                    h(
                        'span',
                        {
                            class: [
                                self.endCapBaseClasses,
                                'rounded-r-md rounded-l-none border-r'
                            ]
                        },
                        self.$slots.suffix
                    )
                ]
            );
        };

        // input element
        const directives = [];
        if(self.isMoneyType) {
            directives.push({
                name: 'currency',
                value: {
                    currency: 'USD',
                    locale: 'en-US',
                    valueAsInteger: false,
                    allowNegative: false,
                    distractionFree: true,
                    autoDecimalMode: true,
                    valueRange: { min: 0 }
                }
            });
        }

        const inputElement = h(
            'input',
            {
                attrs: {
                    type: self.isMoneyType ? 'text' : self.type,
                    ...self.$attrs
                },

                class: [
                    'form-input flex-shrink flex-grow leading-normal border px-3 relative',
                    ...self.inputClassNames
                ],

                domProps: {
                    value: self.selectedValue
                },

                on: {
                    input: self.emitInput
                },

                directives: directives
            }
        );

        const parentChildren = [];

        if(prefixElement) {
            parentChildren.push(prefixElement);
        }

        parentChildren.push(inputElement);

        if(suffixElement) {
            parentChildren.push(suffixElement);
        }

        return h(
            'div',
            {
                class: 'flex flex-no-wrap items-stretch relative'
            },
            parentChildren
        );
    }
});
</script>
