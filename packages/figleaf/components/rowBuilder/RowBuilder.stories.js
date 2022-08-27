import FigFormInput from '../form/text/FormText.vue'
import FigRowBuilder from './RowBuilder.vue';
import { rowBuilderDensity } from './constants.js'

export default {
    title: 'Components/RowBuilder',

    component: FigRowBuilder,

    argTypes: {
        density: {
            control: {
                type: 'select',
                options: Object.keys(rowBuilderDensity)
            }
        },
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigRowBuilder,
        FigFormInput
    },
    data() {
        return {
            values: [
                { "property": "label 1" },
                { "property": "label 2"}
            ]
        }
    },
    methods: {
        onInput(val) {
            this.values = val;
        },

        onAddRow() {
            this.values.push({
                property: `label ${this.values.length + 1}`
            })
        },

        onRemoveRow(index) {
            this.values.splice(index, 1);
        }
    },
    template: `
        <div>
            <fig-row-builder v-bind="$props" v-model="values" @add="onAddRow" @remove="onRemoveRow">
                <template v-slot:default="slotScope">
                    <fig-form-input v-model="slotScope.rowBuilder.property" />
                </template>
            </fig-row-builder>

            <div class="mt-8">
                value: {{ values }}
            </div>
        </div>
    `
});

export const RowBuilder = Template.bind({});
RowBuilder.args = {
    sortable: true
};

