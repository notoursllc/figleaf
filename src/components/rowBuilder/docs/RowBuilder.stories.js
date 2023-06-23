import { ref } from 'vue';
import { FigRowBuilder } from '../../../../index.js';

export default {
    title: 'Components/RowBuilder',
    component: FigRowBuilder,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigRowBuilder
    },
    setup() {
        const rowData = ref([]);

        function onAddRow() {
            rowData.value.push({
                val: rowData.value.length
            });
        }

        function onRemoveRow(index) {
            rowData.value.splice(index, 1);
        }

        return {
            rowData,
            onAddRow,
            onRemoveRow,
            args
        };
    },
    template: `
        <div>
            <fig-row-builder
                v-model="rowData"
                v-bind="args"
                @add="onAddRow"
                @remove="onRemoveRow">
                <template v-slot:default="slotScope">
                    {{ slotScope.rowBuilder }}
                </template>
                <template v-slot:buttonLabel>Add</template>
            </fig-row-builder>

            <div class="mt-10"><pre>{{ rowData }}</pre></div>
        </div>
    `
});

export const RowBuilder = Template.bind({});
RowBuilder.args = {
    sortable: true
};

