<script>
export default {
    name: 'FigPaginationNav'
}
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [Number, String],
        default: 1
    },

    pageSize: {
        type: Number,
        default: 100
    },

    totalRows: {
        type: Number,
        default: 0
    },

    buttonLimit: {
        type: Number,
        default: 5
    },
});

const emit = defineEmits([
    'update:modelValue'
]);

const totalPages = computed(() => {
    const total = parseInt(props.totalRows, 10);

    if(!total) {
        return 0;
    }

    return Math.ceil(
        total / parseInt(props.pageSize, 10)
    );
});

const currentPageNumber = computed(() => {
    return parseInt(props.modelValue, 10);
});

const pageData = computed(() => {
    const limit = parseInt(props.buttonLimit, 10) - 1;

    // padding is the number of page buttons that should appear on
    // either side of the 'current' page button. This is so the current
    // page button appears in the middle of the button set whenever possible
    const padding = Math.floor(limit / 2);

    let start = currentPageNumber.value - padding;
    if(start < 1) {
        start = 1;
    };

    let end = start + limit;
    if(end > totalPages.value) {
        end = totalPages.value;
        start = end - limit;
    }

    const pages = [];
    for(let i=end; i>=start && i>0; i--) {
        pages.unshift(i);
    }

    return {
        pages,
        leftArrowEnabled: start > 1,
        rightArrowEnabled: totalPages.value > pages[pages.length - 1],
        // showChevronsRight: (totalPages.value - end) > 1
    };
});

function goTo(pageNum) {
    emit('update:modelValue', pageNum);
}
</script>


<template>
    <nav class="fig-paginator">
        <ul>
            <template v-if="pageData.leftArrowEnabled">
                <li
                    class="fig-paginator-first fig-paginator-btn"
                    @click="goTo(1)">&#139;&#139;</li>
                <li
                    class="fig-paginator-prev fig-paginator-btn"
                    @click="goTo(currentPageNumber - 1)">&#139;</li>
            </template>

            <!-- pages -->
            <li
                v-for="(page, index) in pageData.pages"
                :key="index"
                @click="goTo(page)"
                class="fig-paginator-page fig-paginator-btn"
                :class="{'active': page === currentPageNumber}">{{ $n(page) }}</li>

            <template v-if="pageData.rightArrowEnabled">
                <li
                    class="fig-paginator-next fig-paginator-btn"
                    @click="goTo(currentPageNumber + 1)">&#155;</li>
                <li
                    class="fig-paginator-last fig-paginator-btn"
                    @click="goTo(totalPages)">&#155;&#155;</li>
            </template>
        </ul>
    </nav>
</template>


<style scoped>
.fig-paginator {
    @apply block;
}
.fig-paginator > ul {
    @apply flex list-none rounded-md p-0;
}

.fig-paginator-btn {
    @apply relative block px-3 py-2 border border-gray-300 bg-white text-blue-600 leading-tight text-sm cursor-pointer;
    margin-left: -1px;
    transition: background-color .3s ease;
}
.fig-paginator-btn.active {
    @apply bg-blue-500 text-white;
}
.fig-paginator-btn:not(.active):hover {
    @apply bg-gray-200 text-blue-700;
}
.fig-paginator-btn:first-child {
    @apply rounded-l-sm;
    margin-left: 0;
}
.fig-paginator-btn:last-child {
    @apply rounded-r-sm;
}

.fig-paginator-first,
.fig-paginator-prev,
.fig-paginator-next,
.fig-paginator-last {
    @apply px-2;
}
</style>
