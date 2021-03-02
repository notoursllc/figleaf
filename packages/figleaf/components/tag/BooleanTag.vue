<script>
import Vue from 'vue';
import FigTag from './Tag';

export default Vue.extend({
    name: 'FigBooleanTag',

    components: {
        FigTag
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

        tagLabel() {
            if(this.bool) {
                return this.trueLabel || this.$t('true');
            }

            return this.falseLabel || this.$t('false');
        }
    }
});
</script>

<template>
    <fig-tag
        :tag="tag"
        :size="size"
        :variant="variant"
        v-on="$listeners"
        v-bind="$attrs">{{ tagLabel }}</fig-tag>
</template>
