<script>
import usePaginationBar from '../paginationBar/usePaginationBar.js';
export const {
    paginationBarProps,
    paginationBarEmits
} = usePaginationBar();

export default {
    name: 'FigPaginationBar'
}
</script>

<script setup>
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import FigPaginationNav from '../paginationNav/PaginationNav.vue';
import FigFormSelectNative from '../../form/selectNative/FormSelectNative.vue';
import usePagination from '../usePagination.js';

const props = defineProps({
    ...paginationBarProps
});

const emit = defineEmits(paginationBarEmits);

const Pagination = usePagination();
const { t } = useI18n();

function emitGeneric(name) {
    emit(name, { ...Pagination.data });
}

function onPageSizeChange(val) {
    Pagination.setPageSize(val);
    Pagination.setPageNumber(1);
    emitGeneric('change');
    emitGeneric('pageSize');
}

function onPageNumberChange(val) {
    Pagination.setPageNumber(val);
    emitGeneric('change');
    emitGeneric('pageNumber');
}

const displayingText = computed(() => {
    const start = (Pagination.data.pageNo - 1) * (Pagination.data.pageSize) + 1;
    let end = Pagination.data.pageNo * Pagination.data.pageSize;

    if (props.totalRows < end) {
        end = props.totalRows;
    }

    return t('Displaying {start} - {end}', { start, end });
});

const totalNumberOfResultsText = computed(() => {
    const total = parseInt(props.totalRows, 10) || 0;
    return t('{num} result | {num} results', { num: total }, total);
});

const perPageSelectOptions = computed(() => {
    return props.perPageOptions.map((val) => ({ label: val, value: parseInt(val, 10) }))
});

watch(
    () => props.pageSize,
    (newVal) => {
        Pagination.setPageSize(newVal);
    }
);

watch(
    () => props.pageNumber,
    (newVal) => {
        Pagination.setPageNumber(newVal);
    }
);
</script>


<template>
    <div class="fig-pagination-bar">
        <div v-if="totalRows" class="text-gray-600 whitespace-nowrap">
            <div class="flex gap-2 items-center">
                <div>{{ totalNumberOfResultsText }}</div>
                <div>&middot;</div>
                <div>{{ displayingText }}</div>
                <div>&middot;</div>
                        
                <!-- per page -->
                <div class="flex items-center">
                    <div class="pr-2">{{ $t('Per page') }}</div>
                    <fig-form-select-native
                        v-model="Pagination.data.pageSize"
                        :options="perPageSelectOptions"
                        @update:modelValue="onPageSizeChange"
                        size="sm" />
                </div>
            </div>
        </div>

        <!-- number buttons -->
        <div class="flex flex-grow justify-end pl-4">
            <fig-pagination-nav
                v-model="Pagination.data.pageNo"
                :per-page="Pagination.data.pageSize"
                :total-rows="totalRows"
                :button-limit="buttonLimit"
                @update:modelValue="onPageNumberChange" />
        </div>
    </div>
</template>


<style scoped>
.fig-pagination-bar {
    @apply my-3 flex items-center text-sm w-full;
}
</style>
