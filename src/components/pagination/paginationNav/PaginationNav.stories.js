import { ref } from 'vue';
import { FigPaginationNav } from '../../../../index.js';

export default {
    title: 'Components/Pagination/PaginationNav',
    component: FigPaginationNav,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigPaginationNav
    },
    setup() {
        const selectedPage = ref(1);

        function onUpdate(pageNum) {
            console.log('onUpdate', pageNum);
        }

        return {
            selectedPage,
            onUpdate,
            args
        };
    },
    template: `
        <div>
            <fig-pagination-nav
                v-model="selectedPage"
                @update:modelValue="onUpdate"
                v-bind="args" />

            <div class="mt-10">
                <p>Selected page: {{ selectedPage }}</p>
            </div>
        </div>
    `
});

export const PaginationNav = Template.bind({});
PaginationNav.args = {
    totalRows: 1000
};

