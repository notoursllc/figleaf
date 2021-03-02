<script>
import Vue from 'vue';
import FigBadge from './Badge';

export default Vue.extend({
    name: 'FigBooleanBadge',

    components: {
        FigBadge
    },

    props: {
        bool: {
            type: Boolean,
            default: true
        },

        trueLabel: {
            type: String
        },

        falseLabel: {
            type: String
        },

        tag: {
            type: String
        },

        size: {
            type: String
        }
    },

    computed: {
        variant() {
            return this.bool ? 'success' : 'error';
        },

        badgeLabel() {
            if(this.bool) {
                return this.trueLabel || this.$t('true');
            }

            return this.falseLabel || this.$t('false');
        }
    }
});
</script>

<template>
    <fig-badge
        :tag="tag"
        :size="size"
        :variant="variant"
        v-on="$listeners"
        v-bind="$attrs">{{ badgeLabel }}</fig-badge>
</template>
