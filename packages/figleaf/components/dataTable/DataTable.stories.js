import FigDataTable from './DataTable.vue';
import FigDataTableColumn from './DataTableColumn.vue';

export default {
    title: 'Components/DataTable2',

    component: FigDataTable,

    argTypes: {

    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigDataTable,
        FigDataTableColumn
    },
    template: `
    <div>
        <fig-data-table v-bind="$props" class="w-full" >
            <fig-data-table-column field="size" label="Size" class="text-red-600" style="font-size:20px" data-test="123">
                <template v-slot:td="slotProps">First cell row: {{ slotProps.size }}</template>
            </fig-data-table-column>

            <fig-data-table-column field="color" label="Color">
                <template v-slot:th><div style="color:red">Second label (color)</div></template>
            </fig-data-table-column>
        </fig-data-table>

        <div class="mt-6">
            <table border="1" cellpadding="2">
                <thead>
                    <tr><th colspan="2">colspan</th></tr>
                    <tr>
                        <th>One</th>
                        <th>Thw</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                </tbody>


            </table>
        </div>
        </div>
    `
});

export const DataTable = Template.bind({});
DataTable.args = {
    items: [
        { size: 'sm', color: 'red', brand: 'nike' },
        { size: 'md', color: 'blue', brand: 'adidas' },
        { size: 'lg', color: 'green', brand: 'puma' }
    ]
};


