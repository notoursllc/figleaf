import FigTableSimple from './TableSimple.vue';
import FigTh from './Th.vue';
import FigTr from './Tr.vue';
import FigTd from './Td.vue';

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
        FigTd
    },
    template: `
        <fig-table-simple v-bind="$props" class="w-full" >
            <template v-slot:head>
                <fig-tr>
                    <fig-th>Col One</fig-th>
                    <fig-th>Col Tow</fig-th>
                    <fig-th>Col Three</fig-th>
                </fig-tr>
            </template>

            <fig-tr>
                <fig-td>1</fig-td>
                <fig-td>2</fig-td>
                <fig-td>3</fig-td>
            </fig-tr>
        </fig-table>
    `
});

export const DataTable = Template.bind({});
DataTable.args = {
    selectable: true,
    items: [
        { size: 'sm', color: 'red', brand: 'nike' },
        { size: 'md', color: 'blue', brand: 'adidas' },
        { size: 'lg', color: 'green', brand: 'puma' }
    ]
};


