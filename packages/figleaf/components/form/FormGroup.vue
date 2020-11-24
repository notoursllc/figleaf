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
            return this.stacked ? 'flex-col' : 'flex-row';
        }
    }
});
</script>


<template>
    <div
        role="group"
        class="flex"
        :class="containerClasses">
        <div
            v-if="$slots.label || isButton"
            class="text-left"
            :class="{'pr-2': !stacked}">
            <slot name="label">&nbsp;</slot>
        </div>

        <div v-if="!isButton">
            <slot></slot>

            <div
                v-if="$slots.error"
                class="text-red-600 pt-1"
                tabindex="-1"
                role="alert"
                aria-live="assertive"><slot name="error" /></div>

            <div
                v-if="$slots.description"
                class="text-gray-600 pt-1 text-sm"
                tabindex="-1"><slot name="description" /></div>
        </div>
    </div>
</template>
