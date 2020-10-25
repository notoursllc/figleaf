<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import FigIcon from '../icon/FigIcon';

export default Vue.extend({
    name: 'FigSelect',

    // functional: true,

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
    },

    // https://vuejs.org/v2/guide/render-function.html#Passing-Attributes-and-Events-to-Child-Elements-Components
    // render(h, context) {
    //     const children = [];

    //     children.push(
    //         h(
    //             'template',
    //             {
    //                 attrs: {
    //                     '#open-indicator': attributes
    //                 }
    //             }
    //         )
    //     )
    //     return h(
    //         vSelect,
    //         context.data,
    //         context.children
    //     );
    // }
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
        margin-bottom: -4px;
    }
}
</style>


