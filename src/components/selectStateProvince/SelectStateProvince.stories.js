import { ref, onMounted } from 'vue';
import {
    FigSelectStateProvince,
    FigSelectCountry
} from '../../../index.js';
import { formInputSizes } from '../form/inputConstants.js';

export default {
    title: 'Components/SelectStateProvince',
    component: FigSelectStateProvince,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: Object.keys(formInputSizes)
        }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        FigSelectStateProvince,
        FigSelectCountry
    },
    setup() {
        const selected = ref(null);
        const selectedCountry = ref(null);

        onMounted(() => {
            setTimeout(() => {
                selected.value = 'CA';
                selectedCountry.value = 'US';
            }, 1000);
        });

        return {
            args,
            selected,
            selectedCountry
        };
    },
    template: `
        <div>
            <div class="mb-4">
                <div>Country:</div>
                <fig-select-country v-model="selectedCountry" />
            </div>

            <div class="mb-4">
                <div>State:</div>
                <fig-select-state-province
                    v-bind="args"
                    v-model="selected"
                    :country="selectedCountry" />
            </div>

            <div>Selected state: {{ selected }}</div>
            <div>Selected country: {{ selectedCountry }}</div>
        </div>
    `
});

export const SelectStateProvince = Template.bind({});
SelectStateProvince.args = {
    size: 'sm'
};
