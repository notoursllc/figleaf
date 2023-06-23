import { ref } from 'vue';
import {
    FigTableSimple,
    FigTh,
    FigTr,
    FigTd,
    FigTrNoResults
 } from '../../../index.js';

export default {
    title: 'Components/TableSimple',
    component: FigTableSimple,
    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTableSimple,
        FigTh,
        FigTr,
        FigTd,
        FigTrNoResults
    },
    setup() {
        const sortingColumn = ref(null);

        function onSort(val) {
            sortingColumn.value = val;
        }

        return {
            sortingColumn,
            onSort,
            args };
    },
    template: `
        <div>
            <fig-table-simple v-bind="args" @sort="onSort">
                <template v-slot:head>
                    <fig-th sort="col1">Column 1 (sortable)</fig-th>
                    <fig-th>Column 2</fig-th>
                    <fig-th sort="col3">Column 3 (sortable)</fig-th>
                    <fig-th>Column 4</fig-th>
                </template>

                <fig-tr>
                    <fig-td>Row 1, Col 1</fig-td>
                    <fig-td>Row 1, Col 2</fig-td>
                    <fig-td>Row 1, Col 3</fig-td>
                    <fig-td>Row 1, Col 4</fig-td>
                </fig-tr>
            </fig-table-simple>

            <div class="mt-4">
                Sorting column: {{ sortingColumn }}
            </div>
        </div>
    `
});

export const TableSimple = Template.bind({});
TableSimple.args = {
    defaultSortBy: 'col1'
};


//////////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigTableSimple,
        FigTh,
        FigTrNoResults
    },
    setup() {
        return {
            args
        };
    },
    template: `
        <fig-table-simple v-bind="args">
            <template v-slot:head>
                <fig-th>Column 1</fig-th>
                <fig-th>Column 2</fig-th>
                <fig-th>Column 3</fig-th>
                <fig-th>Column 4</fig-th>
            </template>

            <fig-tr-no-results colspan="4" />
        </fig-table-simple>
    `
});

export const NoResults = Template2.bind({});
NoResults.args = {
};
