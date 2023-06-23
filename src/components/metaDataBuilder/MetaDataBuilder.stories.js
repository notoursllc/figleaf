import { ref } from 'vue';
import { FigMetaDataBuilder } from '../../../index.js';

export default {
    title: 'Components/MetaDataBuilder',
    component: FigMetaDataBuilder,
    argTypes: {
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigMetaDataBuilder
    },
    setup() {
        const rowData = ref([]);

        return {
            rowData,
            args
        };
    },
    template: `
        <div>
            <fig-meta-data-builder
                v-model="rowData"
                v-bind="args">
                <template v-slot:default="slotScope">
                    {{ slotScope.rowBuilder }}
                </template>
                <template v-slot:buttonLabel>Add</template>
            </fig-meta-data-builder>

            <div class="mt-10">
                Row data: <pre>{{ rowData }}</pre>
            </div>
        </div>
    `
});

export const MetaDataBuilder = Template.bind({});
MetaDataBuilder.args = {
    sortable: true
};

