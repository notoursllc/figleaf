import FigPaginator from './Paginator.vue';

export default {
    title: 'Components/paginator/Paginator',

    component: FigPaginator,

    argTypes: {
        page: {
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
        FigPaginator
    },
    data() {
        return {
            pageNo: 1
        };
    },
    methods: {
        updatePagination(pageNo) {
            this.pageNo = pageNo;
        }
    },
    template: '<fig-paginator v-bind="$props" @input="updatePagination" v-model="pageNo" />'
});

export const Paginator = Template.bind({});
Paginator.args = {
    value: 2,
    perPage: 100,
    totalRecords: 1000,
    buttonLimit: 5
};
