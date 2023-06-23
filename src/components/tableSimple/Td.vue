<script>
export default {
    name: 'FigTd'
}
</script>

<script setup>
import { inject, computed } from 'vue';

const tableState = inject('tableState');

const classNames = computed(() => {
    return {
        'border-b': tableState.striped,
        'border-gray-300': tableState.striped,
        'border': tableState.bordered,
        'border-gray-300': tableState.bordered,
        [`p-${tableState.cellPadding}`]: true
    }
});
</script>

<template>
    <td
        class="fig-td transition-colors"
        :class="classNames"><slot></slot></td>
</template>

