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
        },

        labelClasses() {
            const classes = [];

            if(this.stacked) {
                classes.push(
                    'pt-1'
                );
            }
            else {
                classes.push(
                    'pr-2'
                );
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
            v-if="$slots.label || isButton"
            class="text-left"
            :class="labelClasses">
            <slot name="label">&nbsp;</slot>
        </label>

        <div v-if="!isButton">
            <slot></slot>

            <div
                v-if="$slots.error"
                class="text-red-600 pt-1 block"
                tabindex="-1"
                role="alert"
                aria-live="assertive"><slot name="error" /></div>

            <div
                v-if="$slots.description"
                class="text-gray-700 pt-1 block"
                tabindex="-1"><slot name="description" /></div>
        </div>
    </div>
</template>
