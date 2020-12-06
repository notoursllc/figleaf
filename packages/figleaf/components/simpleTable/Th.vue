<script>
import Vue from 'vue';
import FigIcon from './icon/FigIcon';

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

    data() {
        return {

        };
    },

    inject: [
        'tableState'
    ],

    watch: {
        'sharedState.sort': {
            handler(newVal) {
                this.emitSort();
            },
            deep: true
        }
    },

    computed: {
        isActive() {
            return this.tableState.sort.by === this.prop;
        },

        classNames() {
            const classes = [];

            if(this.isActive) {
                classes.push(
                    'bg-coolGray-300',
                    'text-purple-600',
                    'transition-transform',
                    'duration-1000'
                );
            }
            else {
                classes.push(
                    'text-gray-600',
                    'border-b',
                    'border-gray-600'
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

        contentClasses() {
            const classes = [];

            if(this.isActive) {
                classes.push(
                    'border-purple-600'
                );
            }
            else {
                classes.push(
                    'border-gray-100'
                );
            }

            if(this.tableState.sortable) {
                classes.push(
                    'cursor-pointer',
                    'pr-3'
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
                this.emit('sort');
            }
        }
    }
});
</script>


<template>
    <th
        class="fig-table-th transition-colors relative font-medium bg-gray-100"
        :class="classNames"
        @click="onClick"
        v-bind="$attrs">
        <div
            class="p-2 border-b-2"
            :class="contentClasses">
            <slot></slot>
            <i
                v-if="sortable"
                class="fig-table-th-arrow"
                :class="arrowClasses">
                <fig-icon
                    icon="chevron-up"
                    :stroke-width="1"
                    stroke="#000"
                    :width="10"
                    :height="10" />
            </i>
        </div>
    </th>
</template>


<style lang="postcss" scoped>
.fig-table-th .fig-table-th-arrow {
    @apply absolute transition-transform duration-500 -mt-2;
    top: 50%;
    right: 8px;
}
.fig-table-th .fig-table-th-arrow-down {
    transform: rotateZ(180deg)
}
</style>
