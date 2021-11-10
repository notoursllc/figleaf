import FigPaginationWrapper from './PaginationWrapper.vue';

export default {
    title: 'Components/paginator/PaginationWrapper',

    component: FigPaginationWrapper,

    argTypes: {
        currentPage: {
            control: {
                type: 'number'
            }
        },

        perPage: {
            control: {
                type: 'number'
            }
        },

        totalRecords: {
            control: {
                type: 'number'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaginationWrapper
    },
    data() {
        return {
            pagination: null
        }
    },
    methods: {
        onPerPageChange(val) {
            this.pagination = val;
        },

        onPageNumberChange(val) {
            this.pagination = val;
        }
    },
    template: `
        <div>
            <fig-pagination-wrapper v-bind="$props" @perPage="onPerPageChange" @pageNumber="onPageNumberChange">
                TABLE GOES HERE
            </fig-pagination-wrapper>

            <div class="mt-6">
                Pagination data: {{ pagination }}
            </div>
        </div>`
});

export const PaginationWrapper = Template.bind({});
PaginationWrapper.storyName = 'PaginationWrapper';
PaginationWrapper.args = {
    top: true,
    bottom: true,
    currentPage: 1,
    perPage: 100,
    totalRecords: 1000
};
