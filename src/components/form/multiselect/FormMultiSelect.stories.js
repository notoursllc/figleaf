import { ref, reactive } from 'vue';
import { FigFormMultiSelect } from '../../../../index.js';
import { formSelectSizes } from './constants.js';

export default {
    title: 'Components/Form/MultiSelect',
    component: FigFormMultiSelect,
    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formSelectSizes)
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    components: {
        FigFormMultiSelect
    },
    setup() {
        const val = ref(null);

        const options = reactive([
            {
                label: 'Option 1',
                value: 'option1'
            },
            {
                label: 'Option 2',
                value: 'option2'
            },
            {
                label: 'Option 3',
                value: 'option3'
            }
        ]);

        return {
            val,
            options,
            args
        };
    },
    template: `
        <div>
            <fig-form-multi-select
                v-model="val"
                v-bind="args"
                :options="options" />

            <div class="mt-4">value: {{ val }}</div>
        </div>`
});

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    size: formSelectSizes.md,
    searchable: true,
    mode: 'tags',
    closeOnSelect: false,
    canClear: true
};
