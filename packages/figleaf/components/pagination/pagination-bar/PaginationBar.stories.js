import FigPaginationBar from './PaginationBar.vue';

export default {
    title: 'Components/paginator/PaginationBar',

    component: FigPaginationBar,

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
        },

        buttonLimit: {
            control: {
                type: 'number'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaginationBar
    },
    template: '<fig-pagination-bar v-bind="$props" />'
});

export const PaginationBar = Template.bind({});
PaginationBar.args = {
    currentPage: 1,
    perPage: 100,
    totalRecords: 1000,
    buttonLimit: 5
};
