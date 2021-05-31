<script>
import Vue from 'vue';
import form_input_mixin from '../form_input_mixin';

export default Vue.extend({
    name: 'FormText',

    mixins: [
        form_input_mixin
    ],

    props: {
        value: {},

        type: {
            type: String,
            default: 'text'
        },

        placeholder: {
            type: String
        },

        autocomplete: {
            type: Boolean
        },

        requird: {
            type: Boolean,
            default: false
        },

        inputClasses: {
            type: String
        },

        squareLeft: {
            type: Boolean,
            default: false
        },

        squareRight: {
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
                'form-input w-full fig-form-control rounded-sm',
                this.sizeCssClass,
                this.disabledCssClass
            ];

            if(this.stateCssClass) {
                classes.push(this.stateCssClass);
            }

            if(this.type === 'color') {
                classes.push('p-1');
            }

            classes.push(
                this.squareLeft ? 'rounded-l-none' : 'rounded-l-sm',
                this.squareRight ? 'rounded-r-none' : 'rounded-r-sm'
            );

            return classes;
        },

        canShowLabel() {
            return this.$slots.label && !this.selectedValue;
        },

        computedPlaceholder() {
            return this.canShowLabel ? null : this.placeholder;
        }
    },

    watch: {
        value: {
            handler: function(newVal) {
                this.selectedValue = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitInput() {
            this.$emit('input', this.selectedValue);
        }
    }
});
</script>


<template>
    <div class="relative">
        <input
            :type="type"
            v-model="selectedValue"
            @input="emitInput"
            class="form-input w-full"
            :class="classNames"
            :disabled="disabled"
            :readonly="readonly"
            :autocomplete="autocomplete"
            :placeholder="computedPlaceholder"
            v-bind="$attrs">
        <div v-if="canShowLabel" class="form-input-label"><slot name="label"></slot></div>
    </div>
</template>

<style scoped>
.form-input-label {
    @apply absolute text-gray-400;
    left: 1em;
    pointer-events: none;
}
.fig-form-control-sm + .form-input-label {
    top: 0.05em;
}
.fig-form-control-md + .form-input-label {
    top: 0.25em;
}
.fig-form-control-lg + .form-input-label {
    top: 0.55em;
}

.fig-form-control:focus + .form-input-label {
    @apply inline-block bg-white text-gray-800;
    top: -0.8em;
    left: 1em;
    padding: 0px 0.5em;
    z-index: 2;
    font-size: 11px;
}
</style>

