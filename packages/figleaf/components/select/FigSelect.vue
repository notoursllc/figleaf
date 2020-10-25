<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import FigIcon from '../icon/FigIcon';

export default Vue.extend({
    name: 'FigSelect',

    components: {
        FigIcon,
        vSelect
    },

    props: {
        size: {
            type: String,
            default: 'md',
            validator: (value) => {
                return ['sm', 'md', 'lg'].includes(value);
            }
        }
    },

    computed: {
        classNames() {
            return [
                'fig-select',
                `fig-select-${this.size}`
            ];
        }
    }
});
</script>

<template>
    <v-select
        :class="classNames"
        v-bind="$attrs"
        v-on="$listeners">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <fig-icon icon="chevron-down" :stroke-width="1" :width="20" :height="20" />
            </span>
        </template>
        <slot></slot>
    </v-select>
</template>

<style lang="scss">
.fig-select {
    .fig-icon-chevron-down {
        margin-top: -3px;
    }
}
</style>


