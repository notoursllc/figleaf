<script>
// This component was heavily inspired by:  https://thomlom.dev/how-to-build-reusable-and-accessible-switch-vue/

export default {
    name: 'FormInputToggle',

    inheritAttrs: false,

    props: {
        value: {
            type: Boolean
        },

        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        },

        variant: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return ['success', 'error', 'primary'].includes(value);
            }
        },

        inverse: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        isChecked: null
    }),

    watch: {
        value: {
            handler: function(newVal) {
                this.isChecked = this.inverse ? !newVal : newVal;
            },
            immediate: true
        }
    },

    computed: {
        switchClasses() {
            return [
                `toggle-switch-${this.size}`,
                `toggle-switch-${this.variant}`
            ];
        }
    },

    methods: {
        emitInput() {
            this.$emit('input', this.inverse ? !this.isChecked : this.isChecked)
        }
    }
};
</script>


<template>
    <label class="fig-toggle flex cursor-pointer items-center">
        <!-- note: input classes visually hide the checkbox input element -->
        <input
            v-bind="$attrs"
            type="checkbox"
            class="toggle-input sr-only"
            v-model="isChecked"
            @change="emitInput">
        <span
            class="toggle-switch flex items-center relative bg-gray-300 rounded-full"
            :class="switchClasses"></span>
        <span
            v-if="$slots.default"
            class="ml-2 overflow-hidden truncate"><slot></slot></span>
    </label>
</template>


<style lang="postcss">
.toggle-switch-sm {
    --switch-container-width: 34px;
}
.toggle-switch-md {
    --switch-container-width: 46px;
}
.toggle-switch-lg {
    --switch-container-width: 60px;
}

.toggle-switch-success {
    --switch-checked-color: #48bb78;
}
.toggle-switch-error {
    --switch-checked-color: #f87171;
}
.toggle-switch-primary {
    --switch-checked-color: #60a5fa;
}

.toggle-switch {
    --switch-size: calc(var(--switch-container-width) / 2);

    /* Vertically center the inner circle */
    height: var(--switch-size);
    flex-basis: var(--switch-container-width);
    transition: background-color 0.25s ease-in-out;

    /* In case the label gets long, the toggle shouldn't shrink. */
    flex-shrink: 0;
}

.toggle-switch::before {
    @apply absolute rounded-full bg-white border-2 border-gray-300;

    content: "";
    left: 2px; /* Move a little bit the inner circle to the right */
    height: calc(var(--switch-size) - 4px);
    width: calc(var(--switch-size) - 4px);
    transition: transform 0.375s ease-in-out;
}

.toggle-input:checked + .toggle-switch {
    /* @apply bg-green-500; */
    background-color: var(--switch-checked-color);
}
.toggle-input:checked + .toggle-switch::before {
    /* @apply border-green-500; */
    border-color: var(--switch-checked-color);

    /* Move the inner circle to the right */
    transform: translateX(
        calc(var(--switch-container-width) - var(--switch-size))
    );
}

/* .toggle-input:focus + .toggle-switch::before,
.toggle-input:focus:checked + .toggle-switch::before {
    @apply shadow-outline;
} */

.toggle-input:disabled + .toggle-switch {
    @apply bg-gray-300 cursor-not-allowed;
}
.toggle-input:disabled + .toggle-switch::before {
    @apply bg-gray-500 border-gray-500;
}
</style>
