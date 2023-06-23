import { ref } from 'vue';
import { FigFormCheckbox } from '../../../../index.js';

export default {
    title: 'Components/Form/Checkbox',
    component: FigFormCheckbox,
    argTypes: {
    }
};


const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormCheckbox
    },
    setup() {
        const categories = ref([
            { label: 'Category 1', value: '1', disabled: false },
            { label: 'Category 2', value: '2', disabled: false },
            { label: 'Category 3', value: '3', disabled: false },
            { label: 'Category 4', value: '4', disabled: true },
        ]);

        const selectedCagtegories = ref(categories.value.slice(1, 3));

        function onChange(e) {
            console.log('change', e.target.value)
        }

        function onUpdate(modelValue) {
            console.log('update:modelValue', modelValue)
        }

        return {
            categories,
            selectedCagtegories,
            onChange,
            onUpdate,
            args
        };
    },
    template: `
        <div>
            <div v-for="category in categories" :key="category.value">
                <fig-form-checkbox
                    v-bind="args"
                    :value="category"
                    v-model="selectedCagtegories"
                    :disabled="category.disabled"
                    @change="onChange"
                    @update:modelValue="onUpdate">
                    <label :for="category.key">{{ category.label }}</label>
                </fig-form-checkbox>
            </div>

            <div class="mt-4">
                selectedCagtegories: {{ selectedCagtegories }}
            </div>
        </div>
        `
});

export const Checkbox = Template.bind({});
Checkbox.args = {
};


///////


const Template2 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigFormCheckbox
    },
    setup() {
        const checked = ref(false);

        return {
            checked,
            args
        };
    },
    template: `
        <div>
            <fig-form-checkbox
                v-bind="args"
                binary
                v-model="checked" />

            <div class="mt-4">
                checked: {{ checked }}
            </div>
        </div>
        `
});

export const BinaryCheckbox = Template2.bind({});
BinaryCheckbox.args = {
};




