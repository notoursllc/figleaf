import FigFormSelect from './FormSelect.vue';
import { formSelectSizes } from './constants';

export default {
    title: 'Components/Form/Select',

    component: FigFormSelect,

    argTypes: {
        size: {
            control: {
                type: 'select',
                options: Object.keys(formSelectSizes)
            }
        },

        clearable: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormSelect
    },
    data: function() {
        return {
            selected: null,
            options: [
                { label: 'one', value: 1 },
                { label: 'two', value: 2 },
                { label: 'three', value: 3 }
            ]
        };
    },
    template: `
        <div>
            <fig-form-select
                v-bind="$props"
                v-model="selected"
                :options="options" />
            <div>Selected: {{ selected }}</div>
        </div>
    `
});

export const FormSelect = Template.bind({});
FormSelect.args = {
    size: formSelectSizes.md
};
