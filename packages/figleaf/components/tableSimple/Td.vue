<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'FigTd',

    inject: [
        'tableState'
    ],

    computed: {
        classNames() {
            const classes = [];

            if(this.tableState.striped) {
                classes.push(
                    'border-b',
                    'border-gray-300'
                );
            }

            if(this.tableState.bordered) {
                classes.push(
                    'border',
                    'border-gray-300'
                );
            }

            classes.push(
                `p-${this.tableState.cellPadding}`
            );

            return classes;
        }
    }
});
</script>


<template>
    <td
        class="fig-td transition-colors"
        :class="classNames"
        v-bind="$attrs"><slot></slot></td>
</template>

