
<script>
import PaginationBar from '../pagination-bar/PaginationBar.vue';

export default {
    components: {
        PaginationBar
    },

    props: {
        currentPage: {
            type: [Number, String],
            default: 1
        },

        perPage: {
            type: [Number, String],
            default: 100
        },

        totalRecords: {
            type: [Number, String]
        },

        top: {
            type: Boolean,
            default: false
        },

        bottom: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            pagination: {
                _page: 1,
                _pageSize: 100,
            }
        }
    },

    watch: {
        currentPage: {
            handler(newVal) {
                if(newVal) {
                    this.pagination._page = parseInt(newVal, 10);
                }
            },
            immediate: true
        },

        perPage: {
            handler(newVal) {
                if(newVal) {
                    this.pagination._pageSize = parseInt(newVal, 10);
                }
            },
            immediate: true
        },
    },

    methods: {
        emit(eventName) {
            this.$emit(eventName, {...this.pagination})
        },

        onPerPageChange(val) {
            this.pagination._pageSize = val;
            this.pagination._page = 1;
            this.emit('perPage')
        },

        onPageNumberChange(val) {
            this.pagination._page = val;
            this.emit('pageNumber')
        }
    }
}
</script>


<template>
    <div>
        <pagination-bar
            v-if="top"
            :current-page="pagination._page"
            :per-page="pagination._pageSize"
            :total-records="totalRecords"
            @perPage="onPerPageChange"
            @pageNumber="onPageNumberChange" />

        <div class="py-4">
            <slot></slot>
        </div>

        <pagination-bar
            v-if="bottom"
            :current-page="pagination._page"
            :per-page="pagination._pageSize"
            :total-records="totalRecords"
            @perPage="onPerPageChange"
            @pageNumber="onPageNumberChange" />
    </div>
</template>
