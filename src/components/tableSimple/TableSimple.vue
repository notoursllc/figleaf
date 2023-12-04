<script>
export default {
    name: 'FigTableSimple',
    inheritAttrs: false,
}
</script>

<script setup>
import { computed, reactive, provide, watch } from 'vue';
import { tableSimplePaddingOptions } from './constants.js';

const props = defineProps({
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

    full: {
        type: Boolean,
        default: false
    },

    cellPadding: {
        type: Number,
        default: 2,
        validator: (value) => {
            return tableSimplePaddingOptions.includes(value);
        }
    },

    defaultSortBy: {
        type: String
    },

    defaultSortAsc: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'sort'
]);

const sharedState = reactive({
    sort: {
        by: props.defaultSortBy || '',
        isAsc: props.defaultSortAsc
    },
    ...props
});

provide('tableState', {...sharedState});

const tableClasses = computed(() => {
    return {
        'fig-table': true,
        'fig-table-striped': props.striped,
        'fig-table-hover': props.hover,
    }
});

function emitSort() {
    emit('sort', {
        by: sharedState.sort.by,
        isAsc: sharedState.sort.isAsc
    })
}

watch(
    () => sharedState.sort,
    emitSort,
    { deep: true }
);
</script>


<template>
    <div
        class="p-1 overflow-x-auto px-1 pb-1 align-middle inine-block"
        :class="{'min-w-full': full}">

        <div v-if="$slots.tools" class="mb-2 px-2">
            <slot name="tools"></slot>
        </div>

        <div class="overflow-hidden shadow-dashboard">
            <table :class="tableClasses" v-bind="$attrs">
                <thead class="bg-gray-100">
                    <slot name="head"></slot>
                </thead>

                <tbody>
                    <slot></slot>
                </tbody>

                <!-- tables can have multiple tbody elements, and other elements like tfoot
                so this slot allows for those options -->
                <slot name="belowTbody"></slot>
            </table>
        </div>
    </div>
</template>


<style scoped>
.fig-table {
    @apply border border-gray-300 text-gray-900 border-collapse bg-white;
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
