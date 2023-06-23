import { ref } from 'vue';
import { FigPaginationBar } from '../../../../index.js';

export default {
    title: 'Components/Pagination/PaginationBar',
    component: FigPaginationBar,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaginationBar
    },
    setup() {
        const paginationData = ref({});

        function onPagination(data) {
            paginationData.value = data;
        }

        function onChange(data) {
            console.log('onChange', data);
        }

        return {
            paginationData,
            onPagination,
            onChange,
            args
        };
    },
    template: `
        <div>
            <fig-pagination-bar
                v-bind="args"
                @pageSize="onPagination"
                @pageNumber="onPagination"
                @change="onPagination" />

            <div class="mt-10">
                <pre>{{ paginationData }}</pre>
            </div>
        </div>
    `
});

export const PaginationBar = Template.bind({});
PaginationBar.args = {
    totalRows: 1000,
    pageSize: 100,
    pageNumber: 1,
    perPageOptions: [2, 25, 50, 100]
};