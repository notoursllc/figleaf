<script>
import FigPopover from '../popover/Popover.vue';
import FigIcon from '../icon/FigIcon';
import popover_mixin from '../popover/popover_mixin';

export default {
    name: 'Signpost',

    components: {
        FigPopover,
        FigIcon
    },

    mixins: [
        popover_mixin
    ],

    props: {
        icon: {
            type: String,
            default: 'info-circle'
        },

        iconStrokeColor: {
            type: String
        },

        iconWidth: {
            type: [String, Number],
            default: 20
        }
    }
};
</script>


<template>
    <fig-popover v-bind="$props">
        <template v-slot:toggler>
            <fig-icon
                :icon="icon"
                :stroke-width="1.5"
                :stroke="iconStrokeColor"
                :width="iconWidth"
                :height="iconWidth"
                class="cursor-pointer" />
        </template>
        <slot />
    </fig-popover>
</template>
