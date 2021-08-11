<script>
import FigPaginator from '../paginator/Paginator.vue';
import pagination_mixin from '../pagination_mixin.js';
import FigFormSelectNative from '../../form/selectNative/FormSelectNative.vue';

export default {
    name: 'PaginationBar',

    components: {
        FigFormSelectNative,
        FigPaginator
    },

    mixins: [
        pagination_mixin
    ],

    props: {
        currentPage: {
            type: [Number, String],
            default: 1
        },

        perPageOptions: {
            type: Array,
            default: function() {
                return [25, 50, 100, 250];
            }
        }
    },

    data() {
        return {
            selectedPerPage: null,
            selectedPageNumber: null
        };
    },

    computed: {
        totalNumberOfResultsLabel() {
            const total = parseInt(this.totalRecords, 10);

            return this.$tc(
                '{num} result | {num} results',
                total || 0,
                {num: total}
            );
        },

        displayingLabel() {
            const current = parseInt(this.currentPage, 10);
            const per = parseInt(this.perPage, 10);

            const start = (current - 1) * (per) + 1;
            let end = current * per;

            const totalRecords = parseInt(this.totalRecords, 10);
            if(totalRecords < end) {
                end = totalRecords;
            }

            return this.$t('Displaying {start} - {end}', {start, end});
        },

        selectOpts() {
            return this.perPageOptions.map((val) => {
                return {
                    label: this.$t('{num} / page', {num: val}),
                    value: val
                };
            });
        }
    },

    watch: {
        perPage: {
            handler(newVal) {
                this.selectedPerPage = newVal;
            },
            immediate: true
        },

        currentPage: {
            handler(newVal) {
                this.selectedPageNumber = newVal;
            },
            immediate: true
        }
    },

    methods: {
        emitPerPage(val) {
            this.$emit('perPage', val);
        },

        emitPageNumber(val) {
            this.$emit('pageNumber', val);
        }
    }
};
</script>


<template>
    <div class="fig-pagination-bar">
        <div v-if="totalRecords" class="flex-grow text-gray-500">
            {{ totalNumberOfResultsLabel }}<span class="px-2">&middot;</span>{{ displayingLabel }}
            <span class="px-2">&middot;</span>
            <fig-form-select-native
                v-model="perPage"
                @input="emitPerPage"
                :options="selectOpts"></fig-form-select-native>
        </div>

        <fig-paginator
            v-model="selectedPageNumber"
            :per-page="selectedPerPage"
            :total-records="totalRecords"
            :button-limit="buttonLimit"
            @input="emitPageNumber" />
    </div>
</template>


<style scoped>
.fig-pagination-bar {
    @apply block mb-3 text-sm;
}

@screen sm {
    .fig-pagination-bar {
        @apply flex items-center mb-3 text-sm;
    }
}
</style>
