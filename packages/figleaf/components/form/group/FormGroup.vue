<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FormGroup',

    props: {
        stacked: {
            type: Boolean,
            default: true
        },

        isButton: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        containerClasses() {
            const classes = [
                'fig-form-group',
                this.stacked ? 'flex-col' : 'flex-row'
            ];

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
            v-if="canShowLabel"
            :class="labelClasses">
            <slot name="label">&nbsp;</slot>
        </label>

        <template v-if="!isButton">
            <slot></slot>

            <div
                v-if="$slots.error"
                class="text-red-600 pt-1 text-sm"
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
.fig-form-group {
    @apply relative;
}

.fig-form-group-label {
    @apply text-left block relative;
}
</style>
