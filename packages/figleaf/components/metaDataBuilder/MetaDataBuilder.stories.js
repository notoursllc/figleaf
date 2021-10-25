import FigMetaDataBuilder from './MetaDataBuilder.vue';
import { metaDataBuilderDensity } from './constants.js'

export default {
    title: 'Components/MetaDataBuilder',

    component: FigMetaDataBuilder,

    argTypes: {
        density: {
            control: {
                type: 'select',
                options: Object.keys(metaDataBuilderDensity)
            }
        },
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigMetaDataBuilder
    },
    data() {
        return {
            values: [
                { "property": "label 1", "value": "value 1" },
                { "property": "label 2", "value": "value 2" }
            ]
        }
    },
    methods: {
        onInput(val) {
            this.values = val;
        }
    },
    template: `
        <div>
            <fig-meta-data-builder v-bind="$props" v-model="values" />

            <div class="mt-8">
                value: {{ values }}
            </div>
        </div>
    `
});

export const MetaDataBuilder = Template.bind({});
MetaDataBuilder.args = {
    propertyPlaceholder: 'property',
    valuePlaceholder: 'value',
    isSortable: true
};

