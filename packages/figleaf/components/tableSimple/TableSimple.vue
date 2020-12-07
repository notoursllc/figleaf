<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'SimpleTable',

    props: {
        striped: {
            type: Boolean,
            default: false
        },

        hover: {
            type: Boolean,
            default: false
        },

        bordered: {
            type: Boolean,
            default: false
        },

        shadow: {
            type: Boolean,
            default: false
        },

        cellPadding: {
            type: Number,
            default: 2
        }
    },

    data() {
        return {
            sharedState: {
                striped: this.striped,
                bordered: this.bordered,
                cellPadding: this.cellPadding,
                sort: {
                    by: null,
                    isAsc: false
                }
            }
        };
    },

    provide() {
        return {
            tableState: this.sharedState
        };
    },

    watch: {
        'sharedState.sort': {
            handler(newVal) {
                this.emitSort();
            },
            deep: true
        }
    },

    computed: {
        tableClasses() {
            const classes = [];

            if(this.striped) {
                classes.push('fig-table-striped');
            }

            if(this.hover) {
                classes.push('fig-table-hover');
            }

            return classes;
        }
    },

    methods: {
        emitSort() {
            this.$emit('sort', { ...this.sharedState.sort });
        }
    }
});
</script>


<template>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div class="align-middle inline-block min-w-full overflow-hidden bg-white shadow-dashboard pt-3">
            <table
                class="fig-table"
                :class="tableClasses">
                <thead>
                    <slot name="head"></slot>
                </thead>

                <slot></slot>
            </table>
        </div>
    </div>
</template>


<style lang="postcss" scoped>
.fig-table {
    @apply min-w-full border border-gray-300;
}

.fig-table > tbody {
    @apply bg-white;
}

.fig-table-striped tbody tr:nth-of-type(even){
    @apply bg-gray-50;
}

.fig-table-hover tbody > tr:hover td {
    @apply bg-blue-100;
}
</style>
