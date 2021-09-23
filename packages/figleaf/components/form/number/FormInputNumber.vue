<script>
import FormText from '../text/FormText';

export default {
    name: 'FormInputNumber',

    components: {
        FormText
    },

    props: {
        value: {
            // type: Number
        },

        max: {
            type: Number,
            default: null
        },

        min: {
            type: Number,
            default: null
        },

        step: {
            type: Number,
            default: 1
        },

        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        },

        center: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        selectedValue: null
    }),

    computed: {
        classNames() {
            const classes = [
                `fig-input-number-${this.size}`
            ];

            if(this.center) {
                classes.push('text-center')
            }

            return classes;
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                if(newVal != null) {
                    this.setValue(newVal, false);
                }
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            if(this.selectedValue !== this.value) {
                this.$emit('input', parseFloat(this.selectedValue));
            }
        },

        setValue(newVal, emit) {
            const val = isNaN(newVal) ? this.min : newVal;

            if(this.max && (val > this.max)) {
                this.selectedValue = this.max;
            }
            else if(this.min && (val < this.min)) {
                this.selectedValue = this.min;
            }
            else {
                this.selectedValue = val;
            }

            if(emit !== false) {
                this.emitInput();
            }
        }
    }
};
</script>


<template>
    <form-text
        v-model="selectedValue"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :size="size"
        @input="emitInput" />
</template>


<style scoped>
.fig-input-number {
    @apply relative w-full;
    min-width: 80px;
}
.fig-input-number-sm {
    @apply leading-7;
    min-width: 66px;
}
.fig-input-number-md {
    @apply leading-8;
}
.fig-input-number-lg {
    @apply leading-9;
}
</style>
