<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormGroup',

    props: {
        stacked: {
            type: Boolean,
            default: true
        },

        smartLabel: {
            type: Boolean,
            default: false
        },

        isButton: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        containerClasses() {
            const classes = [
                'relative',
                this.stacked ? 'flex-col' : 'flex-row'
            ];

            if(this.smartLabel) {
                classes.push('fig-form-group-smart-label');
            }

            return classes;
        },

        canShowLabel() {
            return this.$slots.label || this.isButton;
        },

        labelClasses() {
            const classes = ['fig-form-group-label'];

            if(!this.stacked) {
                classes.push('pr-2');
            }

            return classes;
        }
    }
});
</script>


<template>
    <div
        role="group"
        class="flex"
        :class="containerClasses">
        <label
            v-if="!smartLabel && $slots.label || isButton"
            :class="labelClasses">
            <slot name="label">&nbsp;</slot>
        </label>

        <template v-if="!isButton">
            <slot></slot>

            <label
                v-if="smartLabel && canShowLabel"
                :class="labelClasses">
                <slot name="label">&nbsp;</slot>
            </label>

            <div
                v-if="$slots.error"
                class="text-red-600 pt-1"
                tabindex="-1"
                role="alert"
                aria-live="assertive"><slot name="error" /></div>

            <div
                v-if="$slots.description"
                class="text-gray-500 pt-1 text-sm"
                tabindex="-1"><slot name="description" /></div>
        </template>
    </div>
</template>


<style scoped>
.fig-form-group-label {
    @apply text-left block relative;
}

.fig-form-group-smart-label .fig-form-group-label {
    @apply hidden absolute;
}

.fig-form-group-smart-label .form-input:focus + .fig-form-group-label {
    @apply inline-block  bg-white;
    top: -0.8em;
    left: 1em;
    padding: 0px 0.5em;
    z-index: 2;
    font-size: 11px;
}
</style>
