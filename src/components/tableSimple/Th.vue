<script>
export default {
    name: 'FigTh'
}
</script>

<script setup>
import { inject, computed } from 'vue';
import FigIcon from '../icon/FigIcon.vue';
import debounce from 'lodash-es/debounce.js';

const props = defineProps({
    sort: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['sort']);
const tableState = inject('tableState');

function emitSort() {
    emit('sort', {
        by: tableState.sort.by,
        isAsc: tableState.sort.isAsc
    });
}

const isSelected = computed(() => {
    return props.sort && tableState.sort.by === props.sort;
});

const classNames = computed(() => {
    return {
        'fig-table-th-sortable': props.sort,
        'fig-table-th-sort-active': props.sort && isSelected.value,
        'fig-table-th-sort-asc': props.sort && isSelected.value && tableState.sort.isAsc,
        'fig-table-th-sort-desc': props.sort && isSelected.value && !tableState.sort.isAsc
    }
});

const contentClasses = computed(() => {
    return {
        'px-1': tableState.cellPadding === 1,
        'px-2': tableState.cellPadding === 2,
        'px-3': tableState.cellPadding === 3,
        'px-4': tableState.cellPadding === 4,
        'px-5': tableState.cellPadding === 5,
        'py-1': tableState.cellPadding === 1,
        'py-2': tableState.cellPadding === 2,
        'py-3': tableState.cellPadding === 3,
        'py-4': tableState.cellPadding === 4,
        'py-5': tableState.cellPadding === 5,
        'flex': true,
        'items-center': true
    }
});

const arrowIcon = computed(() => {
    if (props.sort) {
        return isSelected.value ? 'chevron-up' : 'chevron-down'
    }
    return null;
});

const arrowClasses = computed(() => {
    const selected = props.sort && isSelected.value;

    return {
        'transition-transform duration-500': selected,
        'fig-table-th-arrow-down': selected && !tableState.sort.isAsc
    }
});

const onClick = debounce(
    () => {
        if(props.sort) {
            tableState.sort.isAsc = isSelected.value ? !tableState.sort.isAsc : tableState.defaultSortAsc;
            tableState.sort.by = props.sort;
            emitSort()
        }
    },
    500,
    {
        leading: true,
        trailing: false
    }
);
</script>


<template>
    <th
        class="fig-table-th"
        :class="classNames"
        @click="onClick">
        <div :class="contentClasses">
            <div class="flex-grow"><slot></slot></div>
            <div v-if="arrowIcon" class="ml-1">
                <fig-icon
                    :class="arrowClasses"
                    :icon="arrowIcon"
                    :stroke-width="1.5"
                    stroke-color="#000"
                    :width="18"
                    :height="18" />
            </div>
        </div>
    </th>
</template>


<style scoped>
.fig-table-th {
    @apply border border-gray-300 text-sm text-gray-800 font-medium;
    transition: background-color .5s ease;
}

.fig-table-th-sortable {
    @apply cursor-pointer;
}
.fig-table-th-sortable:hover {
    @apply bg-blue-100;
}

.fig-table-th-arrow-down {
    transform: rotateZ(180deg);
}

.fig-table-th-sort-active {
    @apply text-blue-700 bg-blue-100 transition-transform duration-1000;
    transition: background-color .5s ease;
}
.fig-table-th-sort-active:hover {
    @apply bg-blue-200;
}

.fig-table-th-sort-asc {
    border-top: 1px solid #3182ce;
}
.fig-table-th-sort-desc {
    border-bottom: 1px solid #3182ce;
}
</style>
