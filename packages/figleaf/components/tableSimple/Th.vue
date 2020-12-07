<script>
import Vue from 'vue';
import FigIcon from '../icon/FigIcon';

const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);

export default Vue.extend({
    name: 'FigTh',

    components: {
        FigIcon
    },

    props: {
        prop: {
            type: String,
            default: uid
        },

        sortable: {
            type: Boolean,
            default: false
        }
    },

    inject: [
        'tableState'
    ],

    computed: {
        isActive() {
            return this.tableState.sort.by === this.prop;
        },

        classNames() {
            const classes = [];

            if(this.isActive) {
                classes.push(
                    'bg-gray-200',
                    'text-purple-800',
                    'border-b-2',
                    'border-purple-600',
                    'transition-transform',
                    'duration-500'
                );
            }
            else {
                classes.push(
                    'text-gray-500',
                    'border-b',
                    'border-gray-300'
                );
            }

            if(this.sortable) {
                classes.push(
                    'cursor-pointer',
                    'pr-3'
                );
            }

            if(this.tableState.bordered) {
                classes.push(
                    'border',
                    'border-gray-600'
                );
            }

            return classes;
        },

        arrowClasses() {
            const classes = [];

            if(this.isActive && !this.tableState.sort.isAsc) {
                classes.push(
                    'fig-table-th-arrow-down'
                );
            }

            return classes;
        }
    },

    methods: {
        onClick(e) {
            e.preventDefault();

            if(this.sortable) {
                const isAsc = this.tableState.sort.by === this.prop ? !this.tableState.sort.isAsc : false;
                this.tableState.sort.by = this.prop;
                this.tableState.sort.isAsc = isAsc;
            }
        }
    }
});
</script>


<template>
    <th
        class="fig-table-th transition-colors relative font-normal text-gray-600 bg-gray-100 border-b border-gray-300 text-sm text-left px-2 py-1"
        :class="classNames"
        @click="onClick"
        v-bind="$attrs">
        <slot></slot>
        <span
            v-if="sortable"
            class="fig-table-th-arrow"
            :class="arrowClasses">
            <fig-icon
                class="block"
                icon="chevron-up"
                :stroke-width="2"
                stroke="#737373"
                :width="16"
                :height="16" />
        </span>
    </th>
</template>


<style lang="postcss" scoped>
.fig-table-th .fig-table-th-arrow {
    @apply absolute transition-transform duration-500 mt-1;
    /* top: 50%; */
    right: 8px;
}
.fig-table-th .fig-table-th-arrow-down {
    transform: rotateZ(180deg)
}
</style>
