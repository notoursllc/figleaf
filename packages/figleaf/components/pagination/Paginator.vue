<script>
import FigIcon from '../icon/FigIcon';

export default {
    name: 'Paginator',

    components: {
        FigIcon
    },

    props: {
        value: {
            type: [Number, String],
            default: 1
        },

        perPage: {
            type: [Number, String],
            default: 100
        },

        totalRecords: {
            type: [Number, String],
            default: 0
        },

        buttonLimit: {
            type: [Number, String],
            default: 5
        }
    },

    computed: {
        totalPages() {
            const total = parseInt(this.totalRecords, 10);

            if(!total) {
                return 0;
            }

            return Math.ceil(
                total / parseInt(this.perPage, 10)
            );
        },

        currentPageNumber() {
            return parseInt(this.value, 10);
        },

        pageData() {
            const limit = parseInt(this.buttonLimit, 10) - 1;

            // padding is the number of page buttons that should appear on
            // either side of the 'current' page button. This is so the current
            // page button appears in the middle of the button set whenever possible
            const padding = Math.floor(limit / 2);

            let start = this.currentPageNumber - padding;
            if(start < 1) {
                start = 1;

            };
            let end = start + limit;
            if(end > this.totalPages) {
                end = this.totalPages;
                start = end - limit;
            }

            const pages = [];
            for(let i=end; i>=start && i>0; i--) {
                pages.unshift(i);
            }

            return {
                pages,
                showChevronLeft: start > 0,
                showChevronsLeft: start > 2,
                showChevronRight: this.totalPages > pages[pages.length - 1],
                showChevronsRight: (this.totalPages - end) > 1
            };
        }
    },

    methods: {
        goTo(pageNum) {
            this.$emit('input', pageNum);
        }
    }
};
</script>


<template>
    <nav class="fig-paginator">
        <ul class="flex list-none rounded-md">
            <li
                class="fig-paginator-first fig-paginator-btn"
                v-if="pageData.showChevronsLeft"
                @click="goTo(1)">
                <fig-icon
                    icon="chevrons-left"
                    :stroke-width="1.5"
                    :width="18"
                    :height="18" />
            </li>
            <li
                class="fig-paginator-prev fig-paginator-btn"
                v-if="pageData.showChevronLeft"
                @click="goTo(currentPageNumber - 1)">
                <fig-icon
                    icon="chevron-left"
                    :stroke-width="2"
                    :width="16"
                    :height="18" />
            </li>

            <!-- pages -->
            <li
                v-for="(page, index) in pageData.pages"
                :key="index"
                @click="goTo(page)"
                class="fig-paginator-page fig-paginator-btn"
                :class="{'active': page === currentPageNumber}">{{ $n(page) }}</li>

            <li
                class="fig-paginator-next fig-paginator-btn"
                v-if="pageData.showChevronRight"
                @click="goTo(currentPageNumber + 1)">
                <fig-icon
                    icon="chevron-right"
                    :stroke-width="2"
                    :width="16"
                    :height="18" />
            </li>
            <li
                class="fig-paginator-last fig-paginator-btn"
                v-if="pageData.showChevronsRight"
                @click="goTo(totalPages)">
                <fig-icon
                    icon="chevrons-right"
                    :stroke-width="1.5"
                    :width="18"
                    :height="18" />
            </li>
        </ul>
    </nav>
</template>


<style>
.fig-paginator {
    @apply block;
}

.fig-paginator-btn {
    @apply relative block px-3 py-2 border border-gray-300 bg-white text-blue-600 leading-tight text-sm cursor-pointer;
    margin-left: -1px;
    transition: background-color .3s ease;
}
.fig-paginator-btn.active {
    @apply bg-blue-500 text-white;
}
.fig-paginator-btn:hover {
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
